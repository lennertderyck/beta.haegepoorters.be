/* istanbul ignore file */
import { AxiosRequestConfig } from 'axios';
import { UseAxios } from './useAxios.types';
import useBaseAxios from './useBaseAxios';
import { useEffect } from 'react';
import useEffectOnce from '../useEffectOnce/useEffectOnce';

const useAxios: UseAxios = <Data,>(endpoint: string, config?: AxiosRequestConfig) => {
    const [getData, { cancel, refetch, ...dataStates}] = useBaseAxios<Data>(endpoint, config);
    
    useEffectOnce(() => {
        getData();
    })
    
    return {
        ...dataStates,
        refetch,
        cancel,
    }
}

export default useAxios;