import {
    SUPPPORTED_GROUP_IDS,
    WEBMASTER_FUNCTION_CODE,
    WEBMASTER_USER_ID
} from "@/lib/constants/admin";
import { DBFieldAttribute } from "better-auth";
import { GenericOAuthConfig } from "better-auth/plugins";

const AUTH_URL_ORIGIN = process.env.NEXT_PUBLIC_AUTH_URL;
const AUTHN_URL_PATHNAME = "/api/auth";
const LOCAL_AUTH_PROVIDER_CLIENT_ID = process.env.LOCAL_AUTH_PROVIDER_CLIENT_ID;
const LOCAL_AUTH_PROVIDER_CLIENT_SECRET =
  process.env.LOCAL_AUTH_PROVIDER_CLIENT_SECRET;

if (!LOCAL_AUTH_PROVIDER_CLIENT_ID || !LOCAL_AUTH_PROVIDER_CLIENT_SECRET) {
  throw new Error(
    "Missing local auth provider client ID or client secret in environment variables"
  );
}

export const AUTH = {
  BASE_URL: AUTH_URL_ORIGIN,
  FALLBACK_PATH: "/"
};

export const OAUTH = {
  BASE_URL: AUTH.BASE_URL + AUTHN_URL_PATHNAME
};

export const OAUTH_PROVIDERS = [
  {
    info: {
      name: "Groepsadministratie",
      description: "Aangemeld met de Groepsadministratie"
    },
    config: {
      providerId: "keycloak",
      clientId: "groep-O1306G-Haegepoorters-Destelbergen",
      discoveryUrl:
        "https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/.well-known/openid-configuration",
      scopes: ["openid", "email", "profile", "groepsadmin-full-access"],
      accessTokenExpiresIn: 300,
      getUserInfo: async (accessToken) => {
        const bearerToken = `Bearer ${accessToken.accessToken}`;
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

        const isMember = personData.functies.some((functie: any) =>
          SUPPPORTED_GROUP_IDS.includes(functie.groep)
        );

        const isMemberActive = isMember.einde === undefined;

        const activeFunctions = personData.functies.filter(
          (functie: any) => functie.einde === undefined
        );
        const isActiveMember = activeFunctions.some((functie: any) =>
          SUPPPORTED_GROUP_IDS.includes(functie.groepId)
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
          isMember && "registered",
          isMemberActive && "active",
          isLeader && "leader",
          isWebmaster && "webmaster"
        ].filter(Boolean);

        console.log({
          isMember,
          isMemberActive,
          isLeader,
          isWebmaster,
          capabilities
        });

        return {
          sub: personData.id, // or the Keycloak `sub` from the id_token
          name: `${personData.vgagegevens.voornaam} ${personData.vgagegevens.achternaam}`,
          email: personData.email,
          emailVerified: true,
          image: undefined,
          capabilities,
          profile: personData.vgagegevens,
          ...personData
        };
      },

      mapProfileToUser: async (profile) => {
        return {
          loginProvider: "keycloak",
          capabilities: profile.capabilities || []
        };
      }
    }
  },
  {
    info: { name: "Lokaal", description: "Aangemeld als lokale beheerder" },
    config: {
      providerId: "supabase",
      clientId: LOCAL_AUTH_PROVIDER_CLIENT_ID!,
      clientSecret: LOCAL_AUTH_PROVIDER_CLIENT_SECRET!,
      discoveryUrl:
        "https://ddgevazvjzypknifulwg.supabase.co/auth/v1/.well-known/openid-configuration",
      scopes: ["openid", "email", "profile"],
      accessTokenExpiresIn: 300,
      pkce: true,
      authentication: "basic",
      mapProfileToUser: async () => ({
        loginProvider: "supabase",
        capabilities: ["member", "leader", "webmaster"]
      })
    }
  }
] satisfies Array<{
  info: { name: string; description: string };
  config: GenericOAuthConfig<string>;
}>;

export const OAUTH_ADDITIONAL_FIELDS = {
  loginProvider: { type: "string", required: false },
  capabilities: { type: "string[]", required: false }
} satisfies Record<string, DBFieldAttribute>;
