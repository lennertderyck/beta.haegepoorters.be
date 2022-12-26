import useAsyncState from "../useAsyncState/useAsyncState";
import { Error } from "../useAsyncState/useAsyncState.types";
import useEffectOnce from "../useEffectOnce/useEffectOnce";
import Instance from "./client";
import { UseStoryBlok } from "./useStoryblok.types";

const useStoryblok: UseStoryBlok = <Data = any>(path: string, params?: any) => {
    const [ states, { initiate, fulfill, cancelWithError }] = useAsyncState<Data>({ loading: true });
    
    const request = async () => {
        try {
            initiate();
            const response = await Instance.get(path, params);
            fulfill(response.data?.stories as Data);
        } catch (error: Error) {
            cancelWithError(error);
        }
    };
    
    useEffectOnce(() => {
        request();
    })
    
    return [ 
        states, 
        request 
    ];
}

export default useStoryblok;