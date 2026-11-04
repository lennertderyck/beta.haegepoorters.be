import "server-only";

import { SANITY_CLIENT } from "../../vendors/sanity/client";

export const getGroups = async () => {
  return SANITY_CLIENT.fetch<
    {
      _id: string;
      name: string;
      order: number;
      abbr: string;
    }[]
  >('*[_type == "group"] | order(order asc)');
};

export interface CmsGroup {
  _id: string;
  name: string;
  order: number;
  abbr: string;
}

export const getGroupByAbbr = async (abbr: string) => {
  return SANITY_CLIENT.fetch<CmsGroup>(
    '*[_type == "group" && abbr == $abbr][0]',
    { abbr }
  );
};
