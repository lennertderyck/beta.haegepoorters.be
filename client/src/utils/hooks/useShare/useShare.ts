import { useState } from "react";
import useAsyncState from "../useAsyncState/useAsyncState";
import { UseShare } from "./useShare.types";

const useShare: UseShare = () => {
    const [ state, { initiate, fulfill, cancelWithError }] = useAsyncState();
    const [ hasPermission, setPermission ] = useState(window.location.protocol === 'http:');
    const isAvailable = !!navigator.share && hasPermission;
    
    const share = async () => {
        try {
            initiate();
            await navigator.share();
            fulfill();
        } catch (error) {
            console.log(error);
            cancelWithError(error);
        }
    }
    
    return [
        share,
        {
            isAvailable,
            ...state
        }
    ]
}

export default useShare;