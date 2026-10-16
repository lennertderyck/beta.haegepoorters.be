import {
    SUPPPORTED_GROUP_IDS,
    WEBMASTER_FUNCTION_CODE,
    WEBMASTER_USER_ID
} from "@/lib/constants/admin";
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";

const AUTH_URL_ORIGIN = process.env.NEXT_PUBLIC_AUTH_URL;
const AUTHN_URL_PATHNAME = "/api/auth";
const SIGNIN_CONTEXT_FIELDNAME = "signinContext";
const LOCAL_AUTH_PROVIDER_CLIENT_ID = process.env.LOCAL_AUTH_PROVIDER_CLIENT_ID;
const LOCAL_AUTH_PROVIDER_CLIENT_SECRET =
  process.env.LOCAL_AUTH_PROVIDER_CLIENT_SECRET;

if (!LOCAL_AUTH_PROVIDER_CLIENT_ID || !LOCAL_AUTH_PROVIDER_CLIENT_SECRET) {
  throw new Error(
    "Missing local auth provider client ID or client secret in environment variables"
  );
}

export const keycloakServerAuth = betterAuth({
  baseURL: AUTH_URL_ORIGIN + AUTHN_URL_PATHNAME + "/" + "keycloak",
  secret: process.env.AUTH_SECRET!,
  session: {
    expiresIn: 60 * 30,
    updateAge: 60 * 5
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: "keycloak",
          clientId: "groep-O1306G-Haegepoorters-Destelbergen",
          discoveryUrl:
            "https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/.well-known/openid-configuration",
          scopes: ["openid", "email", "profile", "groepsadmin-full-access"],
          accessTokenExpiresIn: 300,
          getUserInfo: async (accessToken) => {
            const bearerToken = `Bearer ${accessToken.accessToken}`;
            console.log({ bearerToken });
            const personResponse = await fetch(
              "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/profiel",
              {
                headers: {
                  accept: "application/json",
                  Authorization: bearerToken
                }
              }
            );
            const groupLeaderresponse = await fetch(
              "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/groep/leiding",
              {
                headers: {
                  accept: "application/json",
                  Authorization: bearerToken
                }
              }
            );

            const personData = await personResponse.json();
            const groupLeaderData = await groupLeaderresponse.json();

            const activeFunctions = personData.functies.filter(
              (functie: any) => functie.einde === undefined
            );
            const isMemberOfSupportedGroup = activeFunctions.some(
              (functie: any) => SUPPPORTED_GROUP_IDS.includes(functie.groepId)
            );
            const isLeader = groupLeaderData.groepen.some((groep: any) =>
              SUPPPORTED_GROUP_IDS.includes(groep.id)
            );
            const isWebmaster =
              WEBMASTER_USER_ID.includes(personData.id) ||
              activeFunctions.some((functie: any) =>
                WEBMASTER_FUNCTION_CODE.includes(functie.functieCode)
              );

            const capabilities = [
              isMemberOfSupportedGroup && "member",
              isLeader && "leader",
              isWebmaster && "webmaster"
            ].filter(Boolean);

            return {
              sub: personData.id, // or the Keycloak `sub` from the id_token
              name: `${personData.vgagegevens.voornaam} ${personData.vgagegevens.achternaam}`,
              email: personData.email,
              emailVerified: true,
              image: undefined,
              capabilities,
              ...personData
            };
          },

          mapProfileToUser: async (profile) => {
            console.log({ profile });
            return {
              loginProvider: "keycloak",
              capabilities: []
            };
          }
        },
        {
          providerId: "supabase",
          clientId: LOCAL_AUTH_PROVIDER_CLIENT_ID!,
          clientSecret: LOCAL_AUTH_PROVIDER_CLIENT_SECRET!,
          discoveryUrl:
            "https://ddgevazvjzypknifulwg.supabase.co/auth/v1/.well-known/openid-configuration",
          scopes: ["openid", "email", "profile"],
          accessTokenExpiresIn: 300,
          pkce: true,
          authentication: "basic",
          mapProfileToUser: async (profile) => ({
            loginProvider: "supabase",
            capabilities: ["member", "leader", "webmaster"]
          })
        }
      ]
    })
  ],
  user: {
    additionalFields: {
      loginProvider: { type: "string", required: false },
      capabilities: { type: "string[]", required: false }
    }
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // if (ctx.context.newSession)
      // console.log("New session created:", ctx.context);
      // ctx.setCookie(COOKIES.SESSIN_METHOD, "keycloak", {
      //   path: "/",
      //   httpOnly: true,
      //   sameSite: "Strict",
      //   expires:
      //     ctx.context.newSession?.session.expiresAt ||
      //     ctx.context.session?.session.expiresAt
      // });
    })
  }
});

// export const keycloakServerAuth_old = createBetterAuthServerInstance(
//   "keycloak",
//   {
//     session: {
//       expiresIn: 60 * 30,
//       updateAge: 60 * 5
//     },
//     plugins: [
//       genericOAuth({
//         config: [
//           {
//             providerId: "keycloak",
//             clientId: "groep-O1306G-Haegepoorters-Destelbergen",
//             discoveryUrl:
//               "https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/.well-known/openid-configuration",
//             scopes: ["openid", "email", "profile", "groepsadmin-full-access"],
//             accessTokenExpiresIn: 300
//           },
//           {
//             providerId: "supabase",
//             clientId: process.env.LOCAL_AUTH_PROVIDER_CLIENT_ID!,
//             clientSecret: process.env.LOCAL_AUTH_PROVIDER_CLIENT_SECRET,
//             discoveryUrl:
//               "https://ddgevazvjzypknifulwg.supabase.co/auth/v1/.well-known/openid-configuration",
//             scopes: ["openid", "email", "profile"],
//             accessTokenExpiresIn: 300,
//             pkce: true,
//             authentication: "basic"
//           }
//         ]
//       })
//     ]
//   }
// );
