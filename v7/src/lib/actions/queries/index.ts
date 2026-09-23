import { client } from "@/lib/vendors/sanity/client";

export interface CmsRole {
  _id: string;
  label: string;
  groepsadministratieReference: {
    type: string;
    value: string;
  }[];
}

export const getCmsRolesQuery = () => {
  return client.fetch<CmsRole[]>('*[_type == "role"] | order(order asc)');
};
