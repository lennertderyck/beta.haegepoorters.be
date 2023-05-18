import { useEffect, useReducer } from "react";
import useAxios from "../useAxios/useAxios";
import useBaseAxios from "../useAxios/useBaseAxios";
import useKeycloakStore from "../../../state/stores/useKeycloakStore/useKeycloakStore";
import { useQuery } from "react-query";

const usePlatformRequest = <T = any>(endpoint: any, lazy: boolean = false) => {
    const authenticated = useKeycloakStore(store => store.authenticated);
    const token = useKeycloakStore(store => store.token);
    const requestState = useQuery({
        queryKey: '',
        queryFn: async () => {
            const response = fetch('https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/profiel', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            
            return (await response).json() as Promise<T>
        } 
    })
    
    return {
        ...requestState
    }
}

export default usePlatformRequest;