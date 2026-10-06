import { headers as nextHeaders } from "next/headers";
import CreateAuthMemory from "../../packages/auth/AuthMemory";
import {
  SUPPPORTED_GROUP_IDS,
  WEBMASTER_FUNCTION_CODE,
  WEBMASTER_USER_ID
} from "./constants/admin";
import { keycloakServerAuth } from "./vendors/better-auth/keycloak/server";

export const authMemory = await CreateAuthMemory({
  getAccessToken: async (signinContext) => {
    if (signinContext === "keycloak") {
      return (
        await keycloakServerAuth.api.getAccessToken({
          body: { useAccountCookie: true },
          headers: await nextHeaders()
        })
      ).accessToken;
    } else return null;
  },
  getCapabilities: async (signinContext, accessToken) => {
    try {
      if (signinContext === "local") return ["member", "leader", "webmaster"];
      else if (signinContext === "keycloak") {
        const bearerToken = `Bearer ${accessToken}`;
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
        const isMemberOfSupportedGroup = activeFunctions.some((functie: any) =>
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

        return [
          isMemberOfSupportedGroup && "member",
          isLeader && "leader",
          isWebmaster && "webmaster"
        ].filter(Boolean);
      } else return [];
    } catch (error) {
      return [];
    }
  }
});
