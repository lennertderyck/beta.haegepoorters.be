import { cookies } from "next/headers";
import { PersonMembershipResponse } from "../queries/person";

interface StoredMembershipLocalActionParameters extends PersonMembershipResponse {}

export const storeMembershipLocal = async (
  membership: StoredMembershipLocalActionParameters
) => {
  const body = JSON.stringify(membership);
  const cookie = await cookies();

  cookie.set("membership", body, { path: "/" });
};

export const getMembershipLocal =
  async (): Promise<StoredMembershipLocalActionParameters | null> => {
    const cookie = await cookies();
    const membership = cookie.get("membership");
    return membership ? JSON.parse(membership.value) : null;
  };
