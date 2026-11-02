"use server";

import {
    GroepsadministratieMember,
    getActiveLeadersFromAdminQuery,
} from "@/lib/actions/queries/leaders";
import { getCmsRolesQuery } from "@/lib/actions/queries/roles";
import { getAllActiveStaff } from "@/lib/actions/queries/staff";
import { defineAction } from "@/lib/auth/action";
import { requireCapability } from "@/lib/auth/guards";
import { SANITY_CLIENT } from "@/lib/vendors/sanity/client";
import { z } from "zod";

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
  await requireCapability("webmaster");

  const activeLeadersResponse = await getActiveLeadersFromAdminQuery();
  const activeLeaders = (await activeLeadersResponse.json()).leden || [];
  const staff = await getAllActiveStaff();
  const rolesResponse = await getCmsRolesQuery();

  /**
   * Gets all unique groepsadministratie references from both active leaders and staff (cms),
   * merges them into a single list of unique references.
   */
  const uniqueGroepsadministratieReferences = Array.from(
    new Set([
      ...activeLeaders.map(
        (leader) =>
          leader.waarden["be.vvksm.groepsadmin.model.column.LidNummerColumn"],
      ),
      ...staff
        .map((member) => member.groepsadministratieReference)
        .filter(
          (
            groepsadministratieReference,
          ): groepsadministratieReference is string =>
            !!groepsadministratieReference,
        ),
    ]),
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
          ] === reference,
      );
      const matchingStaff = staff.find(
        (member) => member.groepsadministratieReference === reference,
      );

      const leaderRoles =
        matchingLeaders.length === 0
          ? undefined
          : matchingLeaders?.map(
              (leader) =>
                leader.waarden[
                  "be.vvksm.groepsadmin.model.column.VVKSMFunktiesColumn"
                ],
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
          lastName,
        },
        action: getStaffImportActionFromAspects({
          hasLeader: matchingLeaders?.length > 0,
          hasStaff: Boolean(matchingStaff),
        }),
        defaultImportRoles: rolesResponse.filter((role) =>
          role.groepsadministratieReference?.some((ref) =>
            leaderRoles?.includes(ref.value),
          ),
        ),
      };
    },
  );
};

const staffMutationBodySchema = z.object({
  id: z.string().min(1).nullable(),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  groepsadministratieReference: z.string().min(1).max(50),
  roles: z.array(z.string().min(1)),
});

const importStaffMutationSchema = z.object({
  importData: z.array(staffMutationBodySchema),
});

export type StaffMutationBody = z.infer<typeof staffMutationBodySchema>;
export type ImportStaffMutation = z.infer<typeof importStaffMutationSchema>;

/** Throws when one of the ids isn't a document of the given type */
const assertDocumentsOfType = async (type: string, ids: string[]) => {
  const uniqueIds = Array.from(new Set(ids));
  if (uniqueIds.length === 0) return;

  const count = await SANITY_CLIENT.fetch<number>(
    "count(*[_type == $type && _id in $ids])",
    { type, ids: uniqueIds },
  );
  if (count !== uniqueIds.length) {
    throw new Error(`Not all ids are ${type} documents`);
  }
};

export const importStaffMutation = defineAction(
  { capabilities: ["webmaster"], input: importStaffMutationSchema },
  async (mutations) => {
    await assertDocumentsOfType(
      "staff",
      mutations.importData.flatMap(({ id }) => (id ? [id] : [])),
    );
    await assertDocumentsOfType(
      "role",
      mutations.importData.flatMap(({ roles }) => roles),
    );

    const tx = SANITY_CLIENT.transaction();

    mutations.importData.forEach(({ id, roles, ...mutation }) => {
      const isUpdating = !!id;

      if (roles.length === 0 && isUpdating) {
        tx.delete(id);
      } else {
        const rolesWithReferences = roles.map((roleId) => {
          return {
            _key: Math.random().toString(36).slice(2, 12),
            _ref: roleId,
            _type: "reference",
          };
        });

        if (isUpdating)
          tx.patch(id, {
            set: {
              ...mutation,
              roles: rolesWithReferences,
            },
          });
        else {
          tx.create({
            _type: "staff",
            ...mutation,
            roles: rolesWithReferences,
          });
        }
      }
    });

    return await tx.commit();
  },
);

export const clearAllStaffMutation = defineAction(
  { capabilities: ["webmaster"], input: z.void() },
  async () => {
    await SANITY_CLIENT.delete({ query: '*[_type == "staff"]' });
  },
);
