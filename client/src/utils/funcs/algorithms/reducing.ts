import { UserFunction } from "../../../types/requests/adminPlatform";

interface GroupedUserFunctions {
    groep: any;
    functies: any[];
}

export const groupUserFunctionsByGroups = (grouped: GroupedUserFunctions[], currGroup: UserFunction) => {
    const gr = {
        groep: currGroup.groep,
        functions: []
    };
    
    
    return [];
}