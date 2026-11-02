import "server-only";

import { SANITY_CLIENT } from "@/lib/vendors/sanity/client";

export interface CmsRole {
  _id: string;
  label: string;
  groepsadministratieReference: {
    type: string;
    value: string;
  }[];
  order: number;
}

export const getCmsRolesQuery = () => {
  return SANITY_CLIENT.fetch<CmsRole[]>(
    '*[_type == "role"] | order(order asc)'
  );
};
