import { ADMIN_API_BASE_URL } from "@/lib/actions/factories";
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

export const getSessionServer = async () => {
  const headers = await nextHeaders();
  const signinContext = await getSigninContextServer();

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
    // return Promise.reject(new Error(`No signin context found.`));
  }
};

export const isAuthenticatedServer = async () => {
  return !!(await getSessionServer());
};

/**
 * Only needed for social login.
 */
export const getAccessTokenServer = async () => {
  const signinContext = await getSigninContextServer();

  if (!signinContext || signinContext === "local") return undefined;
  else {
    const { accessToken } = await keycloakServerAuth.api.getAccessToken({
      body: { useAccountCookie: true },
      headers: await nextHeaders()
    });
    return accessToken;
  }
};

export const getCapabilitiesServer = async () => {
  const signinContext = await getSigninContextServer();

  if (signinContext === "local") {
    return {
      member: true,
      leader: true,
      webmaster: true
    };
  } else if (signinContext === "keycloak") {
    const accessToken = await getAccessTokenServer();
    const personResponse = await fetch(ADMIN_API_BASE_URL + "/lid/profiel", {
      headers: {
        Authorization: accessToken ?? ""
      }
    });

    console.log({ personResponse });

    return {
      member: true,
      leader: false,
      webmaster: false
    };
  }
};
