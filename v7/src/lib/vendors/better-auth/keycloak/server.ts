import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import {
  OAUTH_ADDITIONAL_FIELDS,
  OAUTH_PROVIDERS,
} from "../../../../../auth.config";

const AUTH_URL_ORIGIN = process.env.NEXT_PUBLIC_AUTH_URL;
const AUTHN_URL_PATHNAME = "/api/auth";
const SIGNIN_CONTEXT_FIELDNAME = "signinContext";
const LOCAL_AUTH_PROVIDER_CLIENT_ID = process.env.LOCAL_AUTH_PROVIDER_CLIENT_ID;
const LOCAL_AUTH_PROVIDER_CLIENT_SECRET =
  process.env.LOCAL_AUTH_PROVIDER_CLIENT_SECRET;

if (!LOCAL_AUTH_PROVIDER_CLIENT_ID || !LOCAL_AUTH_PROVIDER_CLIENT_SECRET) {
  throw new Error(
    "Missing local auth provider client ID or client secret in environment variables",
  );
}

export const keycloakServerAuth = betterAuth({
  baseURL: AUTH_URL_ORIGIN + AUTHN_URL_PATHNAME + "/" + "keycloak",
  secret: process.env.AUTH_SECRET!,
  session: {
    expiresIn: 60 * 30,
    updateAge: 60 * 5,
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [...OAUTH_PROVIDERS.map((provider) => provider.config)],
    }),
  ],
  user: {
    additionalFields: OAUTH_ADDITIONAL_FIELDS,
  },
});
