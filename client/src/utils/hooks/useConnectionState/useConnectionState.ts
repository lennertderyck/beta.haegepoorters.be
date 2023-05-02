import { useSyncExternalStore } from 'react';

const getSnapshot = () => navigator.onLine;

const subscribe = (callback: any) => {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

const useConnectionState = () => {
    return useSyncExternalStore<boolean>(subscribe, getSnapshot);
}

export default useConnectionState;