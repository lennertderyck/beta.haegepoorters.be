import { CmsRole } from "../actions/queries/roles";
import { CmsStaff } from "../actions/queries/staff";

interface StaffRoleComparatorElement extends CmsStaff {
  roles: CmsRole[];
}

/**
 * Sorts by the role order of a staff member.
 * The function assumes that a lower role order indicates a higher priority role (e.g., order 1 is higher priority than order 2).
 */
export const staffRoleComparator = (
  a: StaffRoleComparatorElement,
  b: StaffRoleComparatorElement
) => {
  const lowestRoleA =
    a.roles.length > 0
      ? Math.min(...a.roles.map((role) => role.order))
      : Infinity;

  const lowestRoleB =
    b.roles.length > 0
      ? Math.min(...b.roles.map((role) => role.order))
      : Infinity;

  return lowestRoleA - lowestRoleB;
};
