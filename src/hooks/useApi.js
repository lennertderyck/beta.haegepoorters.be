import { useReducer, useEffect } from 'react';
import { apiReducer, initialApiState } from '../reducers';

const useApi = (endPoint, isLazy = true) => {
    const [ state, dispatch ] = useReducer(apiReducer, initialApiState);
    
    const handleRequest = async ({ method, body, url } = { method: 'GET', body: {}, url: endPoint }) => {
        if (!url) throw new Error('No url defined');
        try {
            dispatch({ type: 'loading' });
            const res = await fetch(url, {
                method,
                body: method === 'GET' ? null : JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const apiData = await res.json();
            dispatch({ type: 'success', payload: await apiData });
        } catch (err) {
            dispatch({ type: 'error', payload: err })
        }
    }
    
    useEffect(() => {
        if (!isLazy) handleRequest();
    }, [])
    
    return {
        ...state,
        submit: handleRequest
    }
}

export default useApi;