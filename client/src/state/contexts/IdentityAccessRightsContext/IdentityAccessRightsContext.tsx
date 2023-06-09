import { FC, PropsWithChildren, createContext, useMemo } from "react";
import { AccessRights } from "../../../types/auth";
import useKeycloakStore from "../../stores/useKeycloakStore/useKeycloakStore";
import { calculateAccessRights } from "../../../utils/funcs/auth/access";
import { groupClearanceCodes, staffClearanceAttributes } from "../../../utils/data/access";

const initialData: AccessRights = {
    active: false,
    groupMember: false,
    staff: false,
}

export const IdentityAccessRightsContext = createContext<AccessRights>(initialData);

const IdentityAccessRightsProvider: FC<PropsWithChildren> = ({ children }) => {
    const userRoles = useKeycloakStore((store) => store.user?.['functies']);
    
    const accessRights = useMemo(() => {
        return calculateAccessRights(userRoles || [], {
            allowedGroups: groupClearanceCodes,
            clearanceAttributes: staffClearanceAttributes,
        })
    }, [userRoles])
    
    return (
        <IdentityAccessRightsContext.Provider value={accessRights}>
            { children }
        </IdentityAccessRightsContext.Provider>
    )
}

export default IdentityAccessRightsProvider;