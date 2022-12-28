import create from 'zustand';
import { persist } from 'zustand/middleware'
import produce from 'immer'

interface Properties {
    allowShowPhonenumbers: boolean;
    showPhonenumbers: () => void;
    
    digitalMemberCard: {
        id: string | null,
        name: string | null,
    },
    storeDigitalMemberCard: (id: string, name?: string | null) => void;
    
    [key: string]: any;
}

const usePreferencesStore = create(
    persist<Properties>(
        (set) => ({
            allowShowPhonenumbers: false,
            digitalMemberCard: {
                id: null,
                name: null
            },
            
            storeDigitalMemberCard: (id: string, name?: string | null) => set(
                produce((state) => { state.digitalMemberCard = {
                    id,
                    name
                }})
            ),
            
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