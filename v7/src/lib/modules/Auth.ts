import { redirect } from "next/navigation";
import {
    getAccessTokenServer,
    getIsAuthenticatedServer,
    getSessionServer
} from "./Auth.utils";

interface AuthModule {
  signInAgain: (callbackUrl: string) => void;
  readonly isAuthenticated: Promise<boolean>;
  readonly provider: Promise<string | null>;
  readonly session: Promise<any>;
  readonly accessToken: Promise<string | null>;
}

type Session = Awaited<ReturnType<typeof getSessionServer>>;

const initializer = (initialSession?: Session) => {
  const getSession = async () => initialSession ?? getSessionServer();

  return {
    signInAgain: (callbackUrl: string) => {
      const params = new URLSearchParams({ callbackUrl });
      redirect(`/auth/signin?${params}`);
    },
    get isAuthenticated() {
      return getIsAuthenticatedServer();
    },
    get session() {
      return getSession();
    },
    get provider() {
      return getSession().then(
        (session) => session?.user?.loginProvider ?? null
      );
    },
    get accessToken() {
      return getAccessTokenServer();
    },
    get capabilities() {
      return getSession().then((session) => session?.user?.capabilities ?? []);
    }
  };
};

const Auth: AuthModule = initializer();

const createAuth = async () => {
  const session = await getSessionServer();

  return {
    signInAgain: (callbackUrl: string) => {
      const params = new URLSearchParams({ callbackUrl });
      redirect(`/auth/signin?${params}`);
    },
    isAuthenticated: await getIsAuthenticatedServer(),
    session,
    provider: session?.user?.loginProvider ?? null,
    accessToken: await getAccessTokenServer(),
    capabilities: session?.user?.capabilities ?? []
  };
};

export default Auth;
export { createAuth };
