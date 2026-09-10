import { genericOAuth } from "better-auth/plugins";
import { createBetterAuthServerInstance } from "../../../../../packages/auth";

export const keycloakServerAuth = createBetterAuthServerInstance("keycloak", {
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "keycloak",
          clientId: "groep-O1306G-Haegepoorters-Destelbergen",
          discoveryUrl:
            "https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/.well-known/openid-configuration",
          scopes: ["openid", "email", "profile"]
        },
        
      ]
    })
  ]
});

/**
 * webmaster@haegepoorters.be
 */
