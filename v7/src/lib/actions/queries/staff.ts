import { client } from "@/lib/vendors/sanity/client";

export const getAllActiveStaff = async () => {
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

export const getActiveStaffCountQuery = () => {
  return client.fetch<number>('count(*[_type == "staff" && count(roles) > 0])');
};

export const getHeaderLeadersCountQuery = () => {
  return client.fetch<number>(
    'count(*[_type == "staff" && references("69056033-90e8-41a3-ac37-f8064d6e0118")])'
  );
};

export const getStaffPerGroup = () => {
  return client.fetch<any[]>(
    `
      *[_type == "group"] | order(order asc) {
      ...,
      "staff": *[_type == "staff" && ^._id in roles[]->link._ref]{
        ...,
        "coverUrl": cover.asset->url,
        "roles": roles[]->[link._ref == ^.^._id]{
          ...
        }
      }
    }
  `
  );
};
