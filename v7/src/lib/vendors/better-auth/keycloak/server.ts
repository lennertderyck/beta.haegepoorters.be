import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";
import {
    OAUTH,
    OAUTH_ADDITIONAL_FIELDS,
    OAUTH_PROVIDERS
} from "../../../../../auth.config";

if (!OAUTH.CLIENT.ID || !OAUTH.CLIENT.SECRET) {
  throw new Error(
    "Missing local auth provider client ID or client secret in environment variables"
  );
}

export const keycloakServerAuth = betterAuth({
  baseURL: OAUTH.BASE_URL + "/" + "keycloak",
  secret: process.env.AUTH_SECRET!,
  session: {
    expiresIn: 60 * 30,
    updateAge: 60 * 5
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [...OAUTH_PROVIDERS.map((provider) => provider.config)]
    })
  ],
  user: {
    additionalFields: OAUTH_ADDITIONAL_FIELDS
  }
});
