import { useState } from "react";
import { Error, States, UseAsyncState } from "./useAsyncState.types";

const useAsyncState: UseAsyncState = <Data = any>(statesOnRender?: Partial<States<Data>>) => {
    const defaultStates: States<Data> = {
        data: undefined,
        loading: false,
        error: undefined,
        
        ...statesOnRender
    };
    
    const [ data, setData ] = useState<Data | undefined>(defaultStates.data);
    const [ loading, setLoading ] = useState<boolean>(defaultStates.loading);
    const [ error, setError ] = useState<Error | undefined>(defaultStates.error);
    
    const initiate = () => {
        setLoading(true);
    }
    
    const fulfill = (responseData: Data) => {
        setLoading(false);
        setData(responseData);
    }
    
    const cancel = () => {
        setLoading(false);
    }
    
    const cancelWithError = (error: Error) => {
        setLoading(false);
        setError(error);
    }
    
    const reset = () => {
        setData(undefined);
        setLoading(false);
        setError(undefined);
    }
    
    return [
        { data, loading, error },
        {
            initiate,
            fulfill,
            cancel,
            cancelWithError,
            reset
        }
    ]
}

export default useAsyncState;