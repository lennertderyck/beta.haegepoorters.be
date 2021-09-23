import { useReducer, useEffect } from 'react';
import { apiReducer as reducer, initialApiState as initialState } from '../reducers';

const useShare = (initTitle, initText, initUrl = window.location.href) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const handleShare = (title = initTitle, text = initText, url = initUrl) => {
        try {
            dispatch({ type: 'loading' });
            const res = await navigator.share({
                url,
                text,
                title
            })
            dispatch({ type: 'success', payload: await res })
        } catch (error) {
            dispatch({ type: 'error', payload: error })
        }
    }

    return {
        ...state,
        share: handleShare
    }
}

export default useShare