import { useEffect } from "react";
import useAxios from "../useAxios/useAxios";
import useBaseAxios from "../useAxios/useBaseAxios";
import usePlatformAccount from "../usePlatformAccount/usePlatformAccount";
import useKeycloakStore from "../../../state/stores/useKeycloakStore/useKeycloakStore";

const usePlatformRequest = <T = any>(endpoint: any, lazy: boolean = false) => {
    const authenticated = useKeycloakStore(store => store.authenticated);
    const token = useKeycloakStore(store => store.token);
    const [ request, requestState ] = useBaseAxios<T>(endpoint, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    
    
    useEffect(() => {
        if (authenticated) {
            request();
        }
    }, [authenticated])
    
    return {
        ...requestState
    }
}

export default usePlatformRequest;