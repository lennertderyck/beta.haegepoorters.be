import { SANITY_CLIENT } from "@/lib/vendors/sanity/client";
import { SanityImageSource } from "@sanity/image-url";
import { CmsGroup } from "./groups";
import { CmsRole } from "./roles";

export interface CmsStaff {
  _id: string;
  firstName: string;
  lastName: string;
  secondaryName: string | undefined;
  phoneNumber: string | undefined;
  groepsadministratieReference?: string;
  cover: SanityImageSource | null;
}

export const getAllActiveStaff = async () => {
  const response = SANITY_CLIENT.fetch<CmsStaff[]>(
    '*[_type == "staff" && (roles != [] || defined(roles))]'
  );

  return response;
};

export const getActiveStaffCountQuery = () => {
  return SANITY_CLIENT.fetch<number>(
    'count(*[_type == "staff" && count(roles) > 0])'
  );
};

export const getHeaderLeadersCountQuery = () => {
  return SANITY_CLIENT.fetch<number>(
    'count(*[_type == "staff" && references("69056033-90e8-41a3-ac37-f8064d6e0118")])'
  );
};

export interface CmsStaffPerAgeGroup extends CmsGroup {
  staff: (CmsStaff & {
    roles: CmsRole[];

    /** @deprecated */
    coverUrl: string | null;
  })[];
}

export const getStaffPerAgeGroup = () => {
  return SANITY_CLIENT.fetch<CmsStaffPerAgeGroup[]>(
    `
      *[_type == "group"] | order(order asc) {
      ...,
      "staff": *[_type == "staff" && ^._id in roles[]->link._ref]{
        ...,
        "coverUrl": cover.asset->url,
         "roles": roles[]->{ ... }
      }
    }
  `
  );
};
