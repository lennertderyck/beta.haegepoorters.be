"use server";

import { getCmsRolesQuery } from "@/lib/actions/queries";
import {
    GroepsadministratieMember,
    getActiveLeadersFromAdminQuery,
    updateLeadersFilterMutation
} from "@/lib/actions/queries/leaders";
import { getActiveStaff } from "@/lib/actions/queries/staff";
import { client } from "@/lib/vendors/sanity/client";

export const updateAction = async (state: null | Error | true) => {
  const response = await updateLeadersFilterMutation();
  console.log({ response });

  return state;
};

export const statelessActionAction = async (state: null | Error | any) => {
  try {
    const response = await getActiveLeadersFromAdminQuery();
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(String(error));
  }
};

/**
 * leader is the origal entry in the groepsadministratie.
 * staff is the corresponding staff entry in the CMS.
 */
const getStaffImportActionFromAspects = (aspects: {
  hasLeader: boolean;
  hasStaff: boolean;
}): "register" | "update" | "none" => {
  if (aspects.hasLeader && !aspects.hasStaff) {
    return "register";
  }
  if (aspects.hasLeader && aspects.hasStaff) {
    return "update";
  }
  return "none";
};

export interface StaffImportItem {
  groepsadministratieReference: string;
  leader: GroepsadministratieMember | null;
  staff: any | null;
  action: ReturnType<typeof getStaffImportActionFromAspects>;
  defaultImportRoles: Awaited<ReturnType<typeof getCmsRolesQuery>>;
  profile: {
    firstName: string;
    lastName: string;
  };
}

export const getStaffImportListQuery = async () => {
  const activeLeadersResponse = await getActiveLeadersFromAdminQuery();
  const activeLeaders = (await activeLeadersResponse.json()).leden || [];
  const staff = await getActiveStaff();
  const rolesResponse = await getCmsRolesQuery();

  /**
   * Gets all unique groepsadministratie references from both active leaders and staff (cms),
   * merges them into a single list of unique references.
   */
  const uniqueGroepsadministratieReferences = Array.from(
    new Set([
      ...activeLeaders.map(
        (leader) =>
          leader.waarden["be.vvksm.groepsadmin.model.column.LidNummerColumn"]
      ),
      ...staff
        .map((member) => member.groepsadministratieReference)
        .filter(
          (
            groepsadministratieReference
          ): groepsadministratieReference is string =>
            !!groepsadministratieReference
        )
    ])
  );

  /**
   * Maps each unique groepsadministratie reference to a StaffImportItem,
   * determining the import type based on the presence of matching leader and staff entries.
   */
  return uniqueGroepsadministratieReferences.map<StaffImportItem>(
    (reference) => {
      /** Some leaders can appear multiple times in the active leaders list if they have certain functions */
      const matchingLeaders = activeLeaders.filter(
        (leader) =>
          leader?.waarden[
            "be.vvksm.groepsadmin.model.column.LidNummerColumn"
          ] === reference
      );
      const matchingStaff = staff.find(
        (member) => member.groepsadministratieReference === reference
      );

      const leaderRoles =
        matchingLeaders.length === 0
          ? undefined
          : matchingLeaders?.map(
              (leader) =>
                leader.waarden[
                  "be.vvksm.groepsadmin.model.column.VVKSMFunktiesColumn"
                ]
            );

      const leader = matchingLeaders.length === 0 ? null : matchingLeaders[0];

      const firstName =
        leader?.waarden?.["be.vvksm.groepsadmin.model.column.VoornaamColumn"] ||
        matchingStaff?.firstName ||
        "NO_FIRSTNAME_AVAILABLE";
      const lastName =
        leader?.waarden?.[
          "be.vvksm.groepsadmin.model.column.AchternaamColumn"
        ] ||
        matchingStaff?.lastName ||
        "NO_LASTNAME_AVAILABLE";

      return {
        groepsadministratieReference: reference,
        leader,
        staff: matchingStaff,
        profile: {
          firstName,
          lastName
        },
        action: getStaffImportActionFromAspects({
          hasLeader: matchingLeaders?.length > 0,
          hasStaff: Boolean(matchingStaff)
        }),
        defaultImportRoles: rolesResponse.filter((role) =>
          role.groepsadministratieReference?.some((ref) =>
            leaderRoles?.includes(ref.value)
          )
        )
      };
    }
  );
};

export interface StaffMutationBody {
  id: string | null;
  firstName: string;
  lastName: string;
  groepsadministratieReference: string;
  roles: string[];
}

export interface ImportStaffMutation {
  importData: StaffMutationBody[];
}

export const importStaffMutation = async (mutations: ImportStaffMutation) => {
  const tx = client.transaction();

  mutations.importData.forEach(({ id, roles, ...mutation }) => {
    const isUpdating = !!id;

    if (roles.length === 0 && isUpdating) {
      tx.delete(id);
    } else {
      const rolesWithReferences = roles.map((roleId) => {
        return {
          _key: Math.random().toString(36).slice(2, 12),
          _ref: roleId,
          _type: "reference"
        };
      });

      if (isUpdating)
        tx.patch(id, {
          set: {
            ...mutation,
            roles: rolesWithReferences
          }
        });
      else {
        tx.create({
          _type: "staff",
          ...mutation,
          roles: rolesWithReferences
        });
      }
    }
  });

  return await tx.commit();
};

export const clearAllStaffMutation = async () => {
  return await client.delete({ query: '*[_type == "staff"]' });
};
