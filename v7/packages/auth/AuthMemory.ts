import dayjs from "dayjs";
import { getSessionForSigninContextServer, getSigninContextServer } from ".";
import { BetterAuthSession } from "./better-auth";

export type SigninContext = string | null;

export interface AuthMemoryContext {
  isAuthenticated: boolean;
  signinContext: SigninContext;
  session: BetterAuthSession | null;
  accessToken: string | null;
  capabilities: string[];
}

interface AuthMemoryInitialzerOptions {
  getAccessToken: (signinContext: SigninContext) => Promise<string | null>;
  getCapabilities: (
    signinContext: SigninContext,
    accessToken: string
  ) => Promise<string[]>;
}

type AuthMemoryContextValue = AuthMemoryContext[keyof AuthMemoryContext];

interface AuthMemoryFactory extends AuthMemoryContext {
  initalize: (options: AuthMemoryInitialzerOptions) => Promise<void>;
  map: Map<keyof AuthMemoryContext, AuthMemoryContextValue>;
}

const createMemoryMap = () => {
  return new Map<keyof AuthMemoryContext, AuthMemoryContextValue>([
    ["signinContext", null],
    ["session", null],
    ["isAuthenticated", false],
    ["accessToken", null],
    ["capabilities", []]
  ]);
};

const AuthMemory = async (): Promise<AuthMemoryFactory> => {
  const map: ReturnType<typeof createMemoryMap> = createMemoryMap();

  let initialized = false;

  const initalize = async (options: AuthMemoryInitialzerOptions) => {
    if (initialized)
      console.log("AuthMemory already initialized. Skipping initialization.");
    else initialized = true;

    const signinContext = (await getSigninContextServer()) || null;

    map.set("signinContext", signinContext);

    const session = await getSessionForSigninContextServer(signinContext);
    const isAuthenticated =
      !!session && dayjs(session?.session.expiresAt).isAfter(dayjs());

    map.set("session", session);
    map.set("isAuthenticated", isAuthenticated);

    if (isAuthenticated) {
      const accessToken = signinContext
        ? await options.getAccessToken(signinContext)
        : null;
      map.set("accessToken", accessToken);

      const capabilities = await options.getCapabilities(
        signinContext,
        accessToken || ""
      );
      map.set("capabilities", capabilities);
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
    }
  };
};

export default AuthMemory;
