import { useCallback } from "react";
import useEffectOnce from "../useEffectOnce/useEffectOnce";
import { UseStoryBlok } from "./useStoryblok.types";
import useLazyAxios from "../useAxios/useLazyAxios";

const useStoryblok: UseStoryBlok = <Data = any>(path: string, params?: any) => {
    const [ getData, { data, loading, error }] = useLazyAxios<Data>('https://api.storyblok.com/v2/');
        
    const request = useCallback(async () => {
        getData(undefined, 'https://api.storyblok.com/v2/' + path, {
            params: {
                ...params,
                token: process.env['REACT_APP_STORYBLOK_API_KEY']
            }
        });
    }, [ path, params ]);
    
    useEffectOnce(() => {
        request();
    })
    
    return [ 
        { data, loading, error }, 
        request 
    ];
}

export default useStoryblok;