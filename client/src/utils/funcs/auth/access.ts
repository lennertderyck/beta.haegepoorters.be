import { AccessRights, ClearanceAttributes } from "../../../types/auth";
import { UserFunction } from "../../../types/requests/adminPlatform"

const hasStaffRoles = (roles: UserFunction[], clearanceAttributes: ClearanceAttributes) => {
    return roles.some((role) => {
        if (role.code === undefined) {
            return clearanceAttributes.descriptors.includes(role.omschrijving);
        } else return clearanceAttributes.codes.includes(role.code)
    })
}

const isGroupMember = (roles: UserFunction[], allowedGroups: string[]) => {
    return roles.some((role) => allowedGroups.includes(role.groep))
}

const hasActiveRoles = (roles: UserFunction[]) => {
    if (roles.length === 0) return false;
    
    return roles.some((role) => role.einde === undefined);
}

interface AccessCalculatorInputProperties {
    allowedGroups: string[];
    clearanceAttributes: ClearanceAttributes;
}

export const calculateAccessRights = (roles: UserFunction[], factors: AccessCalculatorInputProperties): AccessRights => {
    const groupMember = isGroupMember(roles, factors.allowedGroups);
    
    if (!groupMember) return {
        active: false,
        groupMember: false,
        staff: false
    }
    
    const active = hasActiveRoles(roles);
    const staff = hasStaffRoles(roles, factors.clearanceAttributes);
    
    return {
        groupMember: true,
        active,
        staff,
    }
}