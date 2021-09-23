import { useReducer, useState } from 'react';
import { isMobile } from "react-device-detect";

import { apiReducer as reducer, initialApiState as initialState } from '../reducers';

const useShare = (initTitle, initText, initUrl = window.location.href) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ copyMethod, setMethod ] = useState()

    const handleShare = async ({ title = initTitle, text = initText, url = initUrl, method = 'api' }) => {
        try {
            dispatch({ type: 'loading' });
            if (isMobile && navigator.share && method === 'api') {
                const res = await navigator.share({
                    url,
                    text,
                    title
                })
                dispatch({ type: 'success', payload: await res })
                setMethod('api')
            } else {
                const res = navigator.clipboard.writeText(url);
                dispatch({ type: 'success', payload: await res })
                setMethod('clipboard')
            }
        } catch (error) {
            dispatch({ type: 'error', payload: error })
        }
    }

    return {
        ...state,
        method: copyMethod,
        share: handleShare
    }
}

export default useShare