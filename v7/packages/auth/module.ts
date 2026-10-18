import { redirect } from "next/navigation";
import {
    getAccessTokenServer,
    getIsAuthenticatedServer,
    getSessionServer
} from ".";

interface AuthInitializer {
  signInAgain: (callbackUrl: string) => void;
  readonly isAuthenticated: Promise<boolean>;
  readonly provider: Promise<string | null>;
  readonly session: Promise<any>;
  readonly accessToken: Promise<string | null>;
}

const ind = (
  session?: Awaited<ReturnType<typeof getSessionServer>>
): AuthInitializer => {
  return {
    signInAgain: (callbackUrl: string) => {
      const params = new URLSearchParams({
        callbackUrl
      });

      redirect("/auth/signin" + "?" + params.toString());
    },
    get isAuthenticated() {
      return getIsAuthenticatedServer();
    },
    get provider() {
      return (
        Promise.resolve(session?.user?.loginProvider || null) ||
        getSessionServer().then(
          (session) => session?.user?.loginProvider || null
        )
      );
    },
    get session() {
      return Promise.resolve(session) || getSessionServer();
    },
    get accessToken() {
      return getAccessTokenServer().then((token) => token.accessToken || null);
    }
  };
};

const CreateAuthModule = async () => "use server";
Object.assign(
  async (): Promise<AuthInitializer> => ind(await getSessionServer()),
  ind()
);

export default CreateAuthModule;
