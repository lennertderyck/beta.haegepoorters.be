import create from 'zustand';
import { persist } from 'zustand/middleware'
import produce from 'immer'
import { OnboardingProcedures } from '../../../types/accounts';
import { CookiePolicy } from '../../../types/general';

interface Properties {
    allowShowPhonenumbers: boolean;
    showPhonenumbers: () => void;
    
    digitalMemberCard: {
        id: string | null,
        name: string | null,
    },
    storeDigitalMemberCard: (id: string, name?: string | null) => void;
    
    accountOnboarding: OnboardingProcedures | null;
    setAccountOnboarding: (option: string) => void;
    
    cookiePolicy: CookiePolicy | undefined;
    setCookiePolicy: (policy: CookiePolicy) => void;
    
    [key: string]: any;
}

const usePreferencesStore = create(
    persist<Properties>(
        (set) => ({
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
            
            allowShowPhonenumbers: false,
            showPhonenumbers: () => set(
                produce((state) => { state.allowShowPhonenumbers = true })
            ),
            
            accountOnboarding: null,
            setAccountOnboarding: (option: string) => set(
                produce((state) => { state.accountOnboarding = option })
            ),
            
            cookiePolicy: undefined,
            setCookiePolicy: (policy) => set({
                cookiePolicy: policy,
            })
        }),
        {
            name: 'sitePrefs',
            getStorage: () => localStorage,
        }
    )
);

export default usePreferencesStore;