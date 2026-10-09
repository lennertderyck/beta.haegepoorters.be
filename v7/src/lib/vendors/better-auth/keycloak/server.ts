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
        },
        {
          providerId: "supabase",
          clientId: "163feb22-2d79-4f55-9a6b-cac1c738db0d",
          clientSecret: "ht8g5ABoEL5U9hviHkytcyszUpE7i3x3T_9sOg",
          discoveryUrl:
            "https://ddgevazvjzypknifulwg.supabase.co/auth/v1/.well-known/openid-configuration",
          scopes: ["openid", "email", "profile"],
          accessTokenExpiresIn: 300,
          pkce: true
        }
      ]
    })
  ]
});
