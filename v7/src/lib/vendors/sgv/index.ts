import { SUPPPORTED_GROUP_IDS } from "@/lib/constants/admin";
import { GroepsadministratieMemberProfile } from "@/lib/server/queries/person";
import dayjs from "dayjs";

const GROEPSADMIN_API_URL =
  "https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga";
  
const requestGroepsadmin = async <T>(path: string, accessToken: string) => {
  const response = await fetch(GROEPSADMIN_API_URL + path, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`groepsadmin ${path} responded ${response.status}`);
  }

  return (await response.json()) as T;
};

/**
 * Groepsadmin sometimes fails the first request right after a Keycloak
 * login, so a failed request is retried once. Returns `null` when it still fails
 */
export const fetchGroepsadmin = <T = any>(path: string, accessToken: string) =>
  requestGroepsadmin<T>(path, accessToken)
    .catch(() => requestGroepsadmin<T>(path, accessToken))
    .catch((error): null => {
      console.error("[auth]", error);
      return null;
    });

export const compileGroepsadministratieMemberStatusFromProfile = (
  profile: GroepsadministratieMemberProfile
) => {
  const supportedFunctions = profile.functies.filter((functie: any) =>
    SUPPPORTED_GROUP_IDS.includes(functie.groep)
  );

  const isMember = supportedFunctions.length > 0;

  const isActive = supportedFunctions.some((functie: any) => !functie.einde);

  const activeFunctions = supportedFunctions.filter(
    (functie) => functie.einde === undefined
  );

  const firstJoined = profile.functies.length
    ? new Date(
        Math.min(...supportedFunctions.map((d) => new Date(d.begin).getTime()))
      )
    : null;

  const lastActiveDate = isActive
    ? new Date(
        Math.max(...activeFunctions.map((d) => new Date(d.begin).getTime()))
      )
    : dayjs().add(1, "year").month(7).endOf("month").toDate();

  return {
    isMember,
    isActive,
    activeFunctions,
    firstJoined,
    lastActiveDate
  };
};
