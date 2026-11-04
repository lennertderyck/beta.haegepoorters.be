import "server-only";

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
