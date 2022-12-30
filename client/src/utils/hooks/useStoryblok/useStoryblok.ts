import { useCallback, useEffect } from "react";
import useAsyncState from "../useAsyncState/useAsyncState";
import { Error } from "../useAsyncState/useAsyncState.types";
import useEffectOnce from "../useEffectOnce/useEffectOnce";
import Instance from "./client";
import { StoryBlokResponse, UseStoryBlok } from "./useStoryblok.types";

const useStoryblok: UseStoryBlok = <Data = any>(path: string, params?: any) => {
    const [ states, { initiate, fulfill, cancelWithError }] = useAsyncState<{
        stories: StoryBlokResponse<Data>[],
        story: StoryBlokResponse<Data>
    }>({ loading: true });
    
    console.log(states);
    
    const request = useCallback(async () => {
        try {
            initiate();
            const response = await Instance.get(path, params);
            fulfill({
                stories: response.data?.stories as StoryBlokResponse<Data>[],
                story: response.data?.story as StoryBlokResponse<Data>
            });
        } catch (error: Error) {
            cancelWithError(error);
        }
    }, [ path, params ]);
    
    useEffectOnce(() => {
        request();
    })
    
    return [ 
        states, 
        request 
    ];
}

export default useStoryblok;