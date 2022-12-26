import create from 'zustand';
import { persist } from 'zustand/middleware'
import produce from 'immer'

interface Properties {
    allowShowPhonenumbers: boolean;
    showPhonenumbers: () => void;
    
    [key: string]: any;
}

const usePreferencesStore = create(
    persist<Properties>(
        (set) => ({
            allowShowPhonenumbers: false,
            
            showPhonenumbers: () => set(
                produce((state) => { state.allowShowPhonenumbers = true })
            ),
        }),
        {
            name: 'sitePrefs',
            getStorage: () => localStorage,
        }
    )
);

export default usePreferencesStore;