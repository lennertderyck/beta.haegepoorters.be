import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { OAUTH_PROVIDERS } from "../../../auth.config";
import {
    getAccessTokenServer,
    getAccountsServer,
    getIsAuthenticatedServer,
    getSessionServer
} from "./Auth.utils";

type ConfiguredAuthProviders =
  (typeof OAUTH_PROVIDERS)[number]["config"]["providerId"];

export type AuthLoginProvider = ConfiguredAuthProviders | "other" | null;

interface AuthModule {
  signInAgain: (callbackUrl: string) => void;
  signOut: (callbackUrl: string) => void;
  readonly isAuthenticated: Promise<boolean>;
  readonly provider: Promise<AuthLoginProvider | null>;
  readonly session: Promise<any>;
  readonly accessToken: Promise<string | null>;
}

/**
 * Resolves a login provider string to a typed AuthLoginProvider value, returning "supabase", "keycloak", "other", or null if undefined or null.
 */
const resolveLoginProviderType = (
  loginProviderAsString: string | null | undefined
): AuthLoginProvider | null => {
  switch (loginProviderAsString) {
    case "supabase":
    case "keycloak":
      return loginProviderAsString;
    case undefined:
    case null:
      return null;
    default:
      return "other";
  }
};

export type Session = Awaited<ReturnType<typeof getSessionServer>>;

const initializer = (initialSession?: Session) => {
  const getSession = async () => initialSession ?? getSessionServer();

  return {
    signInAgain: (callbackUrl: string) => {
      const params = new URLSearchParams({ callbackUrl });
      redirect(`/auth/signin?${params}`);
    },
    signOut: (callbackUrl: string) => {
      const params = new URLSearchParams({ callbackUrl });
      redirect(`/auth/signout?${params}`);
    },
    get isAuthenticated() {
      return getIsAuthenticatedServer();
    },
    get session() {
      return getSession();
    },
    get provider() {
      return getSession().then((session) =>
        resolveLoginProviderType(session?.user?.loginProvider)
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
    isAuthenticated:
      !!session && dayjs(session.session.expiresAt).isAfter(dayjs()),
    session,
    provider: resolveLoginProviderType(session?.user?.loginProvider) ?? null,
    /** Lazy: only hits the provider when a caller actually reads it */
    get accessToken() {
      return getAccessTokenServer();
    },
    /** Lazy: the Groepsadministratie person id, stored as the keycloak account id */
    get memberId() {
      return getAccountsServer().then(
        (accounts) =>
          accounts.find((account) => account.providerId === "keycloak")
            ?.accountId ?? null
      );
    },
    capabilities: session?.user?.capabilities ?? []
  };
};

export default Auth;
export { createAuth };
