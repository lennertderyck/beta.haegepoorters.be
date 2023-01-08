/* istanbul ignore file */
import { useCallback, useMemo, useRef } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UseBaseAxios } from './useAxios.types';
import useAxiosReducer from './useAxiosReducer';
import { Error as ErrorType } from './useAxios.types';
import useEffectOnce from '../useEffectOnce/useEffectOnce';

const useBaseAxios: UseBaseAxios = <Data,>(initialEndpoint: string, initialConfig?: AxiosRequestConfig) => {
    const [dataStates, dispatch] = useAxiosReducer<Data>();
    const isMounted = useRef(true);
    const controller = useRef<AbortController>(new AbortController());
    const signal = controller.current.signal;
    const axiosConfig = useMemo(() => ({ ...initialConfig, signal }), [initialConfig, signal]);
        
    const abort = useCallback(() => {
        if (isMounted.current) {
            controller.current.abort();
            dispatch({ type: 'REQUEST_ABORT' })
        }
    }, [dispatch]);
        
    const getData = useCallback(
        async (
            endpoint?: string, 
            config?: AxiosRequestConfig
        ) => {      
            
            dispatch({ type: 'REQUEST_INIT' });
            try {
                const res = (await axios(
                    endpoint || initialEndpoint,
                    { ...axiosConfig, ...config },
                )) as AxiosResponse<Data>;
                
                dispatch({ type: 'REQUEST_SUCCESS', payload: res.data });
                return res.data;
            } catch (e: ErrorType) {
                dispatch({ type: 'REQUEST_FAILED', payload: e });
                throw new Error(e);
            }
        }, 
        [initialEndpoint, dispatch, axiosConfig]
    );
    
    useEffectOnce(() => {
        return () => {
            isMounted.current = false;
            abort();
        }
    })
    
    return [
        getData,
        {
            ...dataStates,
            refetch: getData,
            cancel: abort,
        }
    ]
}

export default useBaseAxios;