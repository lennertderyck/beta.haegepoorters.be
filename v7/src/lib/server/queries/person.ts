import "server-only";

import { compileGroepsadministratieMemberStatusFromProfile } from "@/lib/vendors/sgv";
import dayjs from "dayjs";
import { cache } from "react";
import { AdminQueryFactory } from "../factories";

type GroepsadministratieDateFormat = string;
type GroepsadministratieDateTimeFormat = string;

export interface GroepsadministratieFunction {
  groep: string;
  functie: string;
  begin: GroepsadministratieDateTimeFormat;
  einde: GroepsadministratieDateTimeFormat;
  code: string;
  omschrijving: string;
}

export interface GroepsadministratieMemberProfile {
  persoonsgegevens: {
    geslacht: string;
    gsm: string;
    rekeningnummer: string;
    rijksregisternummer: string;
  };
  vgagegevens: {
    voornaam: string;
    achternaam: string;
    geboortedatum: GroepsadministratieDateFormat;
    beperking: boolean;
    individueleSteekkaartDatumAangepast: GroepsadministratieDateFormat;
    verhoogdekinderbijslag: boolean;
    verminderdlidgeld: boolean;
  };
  verbondsgegevens: {
    lidnummer: string;
    klantnummer: string;
    lidgeldBetaald: boolean;
    lidkaartAfgedrukt: boolean;
  };
  gebruikersnaam: string;
  email: string;
  functies: GroepsadministratieFunction[];
}

export const getProfileQuery = cache(
  AdminQueryFactory<GroepsadministratieMemberProfile>(
    "/lid/profiel",
    {} as Record<string, string>
  )
);

export interface PersonMembershipResponse {
  memberIdentification: string | null;
  memberName: string | null;
  memberFunction: string;
  firstJoined: Date | null;
  activeUntil: Date | null;
}

export const getPersonMembershipFromProfileQuery =
  async (): Promise<PersonMembershipResponse> => {
    const profileQueryResponse = await getProfileQuery();

    if (!profileQueryResponse?.ok) {
      return Promise.reject(new Error("Failed to fetch profile"));
    } else {
      const profileData = await profileQueryResponse.json();

      const memberStatus = profileData
        ? compileGroepsadministratieMemberStatusFromProfile(profileData)
        : null;

      const firstJoined = memberStatus ? memberStatus.firstJoined : null;
      const activeUntil = dayjs(memberStatus?.lastActiveDate).toDate();

      const memberIdentification = profileData
        ? profileData.verbondsgegevens.lidnummer
        : null;

      const memberName = profileData
        ? `${profileData.vgagegevens.voornaam} ${profileData.vgagegevens.achternaam}`
        : null;

      const memberFunction =
        memberStatus?.activeFunctions[0]?.omschrijving ?? "";

      return {
        memberIdentification,
        memberName,
        memberFunction,
        firstJoined,
        activeUntil
      };
    }
  };
