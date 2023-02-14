import create from "zustand";
import { persist } from 'zustand/middleware';
import { AuthTokens } from "../../../types/auth";
import { KeycloakProfile } from "keycloak-js";

interface UseCredentialStore {
    tokens: AuthTokens | null;
    keycloakProfile: KeycloakProfile | null;
    storeTokens: (freshTokens: AuthTokens) => void;
    clearTokens: () => void;
    storeProfile: (profile: KeycloakProfile) => void;
}

const useCredentialStore = create(
    persist<UseCredentialStore>(
        (set) => ({
            tokens: null,
            keycloakProfile: null,
            
            storeTokens: (freshTokens: AuthTokens) => set({
                tokens: freshTokens
            }),
            
            clearTokens: () => set({
                tokens: null
            }),
            
            storeProfile: (profile) => set((state) => ({
                ...state,
                keycloakProfile: profile
            }))
        }), 
        { 
            name: 'credentialStore' 
        }
    )
);

export default useCredentialStore;