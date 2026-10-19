import dayjs from "dayjs";
import { getAccessTokenServer, getSessionServer } from ".";
import { BetterAuthSession } from "./better-auth";

export type SigninContext = string | null;

export interface AuthMemoryContext {
  isAuthenticated: boolean;
  /** @deprecated Use `provider` instead */
  signinContext: SigninContext;
  session: BetterAuthSession | null;
  accessToken: string | null;
  capabilities: string[];
  provider: string | null;
}

interface AuthMemoryInitialzerOptions {}

type AuthMemoryContextValue = AuthMemoryContext[keyof AuthMemoryContext];

interface AuthMemoryFactory extends AuthMemoryContext {
  initalize: (options?: AuthMemoryInitialzerOptions) => Promise<any>;
  map: Map<keyof AuthMemoryContext, AuthMemoryContextValue>;
}

const createMemoryMap = () => {
  return new Map<keyof AuthMemoryContext, AuthMemoryContextValue>([
    ["signinContext", null],
    ["session", null],
    ["isAuthenticated", false],
    ["accessToken", null],
    ["capabilities", []],
  ]);
};

const AuthMemory = async (
  initializer: AuthMemoryInitialzerOptions,
): Promise<AuthMemoryFactory> => {
  const map: ReturnType<typeof createMemoryMap> = createMemoryMap();
  let initialized = false;

  const initalize = async (
    options: AuthMemoryInitialzerOptions = initializer,
  ) => {
    try {
      if (initialized) {
        return Promise.resolve(map);
      } else initialized = true;

      map.set("signinContext", "_DEPRECATED_");

      const session = await getSessionServer();
      const isAuthenticated =
        !!session && dayjs(session?.session.expiresAt).isAfter(dayjs());

      map.set("provider", session?.user?.loginProvider || null);
      map.set("session", session);
      map.set("isAuthenticated", isAuthenticated);

      if (isAuthenticated) {
        const { accessToken } = await getAccessTokenServer();
        map.set("accessToken", accessToken);
        map.set("capabilities", session.user.capabilities || []);
      }

      return Promise.resolve(map);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    initalize,
    map,
    get signinContext() {
      return map.get("signinContext") as SigninContext;
    },
    get session() {
      return map.get("session") as BetterAuthSession | null;
    },
    get isAuthenticated() {
      const session = map.get("session") as BetterAuthSession | null;

      return !!session
        ? dayjs(session?.session.expiresAt).isAfter(dayjs())
        : false;
    },
    get accessToken() {
      return map.get("accessToken") as string | null;
    },
    get capabilities() {
      return map.get("capabilities") as string[];
    },
    get provider() {
      return map.get("provider") as string | null;
    },
  };
};

export default AuthMemory;
