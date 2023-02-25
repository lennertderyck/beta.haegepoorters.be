import { useEffect } from "react";
import useAxios from "../useAxios/useAxios";
import useBaseAxios from "../useAxios/useBaseAxios";
import usePlatformAccount from "../usePlatformAccount/usePlatformAccount";

const usePlatformRequest = <T = any>(endpoint: any, lazy: boolean = false) => {
    const { keycloak } = usePlatformAccount();
    const [ request, requestState ] = useBaseAxios<T>(endpoint, {
        headers: {
            'Authorization': 'Bearer ' + keycloak.token
        }
    });
    
    console.log(keycloak);
    
    useEffect(() => {
        if (keycloak.authenticated) {
            request();
        }
    }, [keycloak.authenticated])
    
    return {
        ...requestState
    }
}

export default usePlatformRequest;