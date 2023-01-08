/* istanbul ignore file */
import { AxiosRequestConfig } from "axios";
import { UseLazyAxios } from "./useAxios.types";
import useBaseAxios from "./useBaseAxios";

const useLazyAxios: UseLazyAxios = <Data,>(initialEndpoint: string, initialConfig?: AxiosRequestConfig) => {
    const [ initBaseRequest, state ] = useBaseAxios<Data>(initialEndpoint, initialConfig);
    console.log('STATE', state);
    
    const initRequest = (lazyData?: any, endpoint = initialEndpoint, config = initialConfig) => {
        return initBaseRequest(endpoint, {
            ...config,
            data: lazyData,
        });
    }
    
    return [ initRequest, state ];
};

export default useLazyAxios;