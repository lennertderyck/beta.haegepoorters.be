import { client } from "../../vendors/sanity/client";

export const getGroups = async () => {
  return client.fetch<
    {
      _id: string;
      name: string;
      order: number;
      abbr: string;
    }[]
  >('*[_type == "group"] | order(order asc)');
};

export const getGroupByAbbr = async (abbr: string) => {
  return client.fetch<{
    _id: string;
    name: string;
    order: number;
    abbr: string;
  }>('*[_type == "group" && abbr == $abbr][0]', { abbr });
};
