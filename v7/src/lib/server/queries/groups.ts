import "server-only";

import { SANITY_CLIENT } from "../../vendors/sanity/client";

export interface CmsGroup {
  _id: string;
  name: string;
  order: number;
  abbr: string;
}

export const getGroups = async () => {
  return SANITY_CLIENT.fetch<CmsGroup[]>(
    '*[_type == "group"] | order(order asc)'
  );
};

export const getGroupByAbbr = async (abbr: string) => {
  return SANITY_CLIENT.fetch<CmsGroup>(
    '*[_type == "group" && abbr == $abbr][0]',
    { abbr }
  );
};
