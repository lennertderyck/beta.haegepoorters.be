import { GroepsadministratieMemberProfile } from "@/lib/actions/queries/person";
import { SUPPPORTED_GROUP_IDS } from "@/lib/constants/admin";
import dayjs from "dayjs";

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
