import COOKIES from "@/lib/constants/cookies";
import { keycloakServerAuth } from "@/lib/vendors/better-auth/keycloak/server";
import { cookies, headers as nextHeaders } from "next/headers";

export const getSigninContextServer = async () => {
  const signInMethodCookie = (await cookies()).get(COOKIES.SESSIN_METHOD);

  if (!signInMethodCookie) return undefined;
  else if (!signInMethodCookie.value) return null;
  return signInMethodCookie.value;
};

export const getSessionForSigninContextServer = async () => {
  const headers = await nextHeaders();

  return await keycloakServerAuth.api.getSession({
    headers
  });
};
