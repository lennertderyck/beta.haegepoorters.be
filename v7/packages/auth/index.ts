import { keycloakServerAuth } from "@/lib/vendors/better-auth/keycloak/server";
import dayjs from "dayjs";
import { headers as nextHeaders } from "next/headers";

export const getSessionServer = async () => {
  const headers = await nextHeaders();

  return await keycloakServerAuth.api.getSession({
    headers,
  });
};

export const getAccessTokenServer = async () => {
  return await keycloakServerAuth.api.getAccessToken({
    body: { useAccountCookie: true },
    headers: await nextHeaders(),
  });
};

export const getIsAuthenticatedServer = async () => {
  const session = await getSessionServer();
  return !!session && dayjs(session?.session.expiresAt).isAfter(dayjs());
};
