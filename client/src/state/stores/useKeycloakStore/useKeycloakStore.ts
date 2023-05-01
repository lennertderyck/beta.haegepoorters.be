import create from "zustand";
import {persist} from 'zustand/middleware';
import Keycloak from 'keycloak-js';

const KEYCL_TOKEN_LIFESPAN = 300;

const config = {
    url: 'https://login.scoutsengidsenvlaanderen.be/auth',
    realm: 'scouts',
    clientId: 'groep-O1306G-Haegepoorters-Destelbergen',
    redirectUri: window.location.href
}

const initOptions = {
    token: localStorage.getItem('gaToken') || undefined,
    refreshToken: localStorage.getItem('gaRefreshToken') || undefined
}

interface KeycloakStore {
    instance: Keycloak;
    authenticated: boolean;
    
    token?: string;
    refreshToken?: string;
    
    init: () => void;
}

const partializePicker = (state: KeycloakStore, allowedKeys: string[]) => {
    return Object.fromEntries(Object.entries(state).filter(([key]) => allowedKeys.includes(key))) as any;
  };

const useKeycloakStore = create(
    persist<KeycloakStore>(
        ((set, get) => ({
            instance: new Keycloak(config),
            authenticated: false,
        
            token: undefined,
            refreshToken: undefined,
        
            init: () => {
                const instance = get().instance;
                instance.init(initOptions)
                    .then(async (auth) => {
                        if (auth) {
                            await instance.updateToken(KEYCL_TOKEN_LIFESPAN);
                            set({
                                token: instance.token,
                                refreshToken: instance?.refreshToken,
                                authenticated: true,
                            })
                        }
                    })
            }
        })),
        {
            name: 'keycloakStore',
            getStorage: () => window.localStorage,
            partialize: state => partializePicker(state, ['token', 'refreshToken']),
        },
    )
)

export default useKeycloakStore;