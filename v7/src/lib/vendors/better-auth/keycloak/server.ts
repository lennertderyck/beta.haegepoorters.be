import { genericOAuth } from "better-auth/plugins";
import { createBetterAuthServerInstance } from "../../../../../packages/auth/better-auth";

export const keycloakServerAuth = createBetterAuthServerInstance("keycloak", {
  session: {
    expiresIn: 60 * 30,
    updateAge: 60 * 5
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "keycloak",
          clientId: "groep-O1306G-Haegepoorters-Destelbergen",
          discoveryUrl:
            "https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/.well-known/openid-configuration",
          scopes: ["openid", "email", "profile", "groepsadmin-full-access"],
          accessTokenExpiresIn: 300
        }
      ]
    })
  ]
});
