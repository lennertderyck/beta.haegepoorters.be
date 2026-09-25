import { AdminQueryFactory } from "../factories";

export const getGroupInformationQuery = AdminQueryFactory<{
  adressen: {
    postcode: string;
    gemeente: string;
    straat: string;
    nummer: string;
    bus: string;
    postadres: boolean;
  }[];
}>("/groep/O1306G");
