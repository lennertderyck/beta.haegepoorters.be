import "server-only";

import dayjs from "dayjs";
import { headers as nextHeaders } from "next/headers";
import { cache } from "react";
import { keycloakServerAuth } from "../vendors/better-auth/keycloak/server";

/** Cached per request, layouts and pages can call it without extra work */
export const getSessionServer = cache(async () => {
  try {
    const headers = await nextHeaders();
    return await keycloakServerAuth.api.getSession({
      headers,
    });
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
});

/** Cached per request, may refresh the token at the provider */
export const getAccessTokenServer = cache(async () => {
  try {
    const { accessToken } = await keycloakServerAuth.api.getAccessToken({
      body: { useAccountCookie: true },
      headers: await nextHeaders(),
    });
    return accessToken;
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
});

export const getIsAuthenticatedServer = async () => {
  try {
    const session = await getSessionServer();
    return !!session && dayjs(session?.session.expiresAt).isAfter(dayjs());
  } catch (error) {
    console.error("Failed to get isAuthenticated:", error);
    return false;
  }
};
