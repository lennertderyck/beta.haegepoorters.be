import COOKIES from "@/lib/constants/cookies";
import { keycloakServerAuth } from "@/lib/vendors/better-auth/keycloak/server";
import { localServerAuth } from "@/lib/vendors/better-auth/local/server";
import { cookies, headers as nextHeaders } from "next/headers";

export const getSigninContextServer = async () => {
  const signInMethodCookie = (await cookies()).get(COOKIES.SESSIN_METHOD);

  if (!signInMethodCookie) return undefined;
  else if (!signInMethodCookie.value) return null;
  return signInMethodCookie.value;
};

export const getSessionForSigninContextServer = async (
  signinContext: string | null
) => {
  const headers = await nextHeaders();

  switch (signinContext) {
    case "keycloak":
      return await keycloakServerAuth.api.getSession({
        headers
      });
    case "local":
      return await localServerAuth.api.getSession({
        headers
      });
    default:
      return null;
  }
};
