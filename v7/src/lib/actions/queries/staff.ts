import { client } from "@/lib/vendors/sanity/client";

const getActiveStaff = async () => {
  const response = client.fetch<
    {
      _id: string;
      firstName: string;
      lastName: string;
      groepsadministratieReference?: string;
    }[]
  >('*[_type == "staff" && (roles != [] || defined(roles))]');

  return response;
};

export { getActiveStaff };
