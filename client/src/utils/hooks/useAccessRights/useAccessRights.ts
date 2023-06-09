import { useContext } from "react";
import { IdentityAccessRightsContext } from "../../../state/contexts/IdentityAccessRightsContext/IdentityAccessRightsContext";

const useAccessRights = () => {
    return useContext(IdentityAccessRightsContext);
}

export default useAccessRights;