import create from "zustand";
import {persist} from 'zustand/middleware';
import Keycloak from 'keycloak-js';
import axios from "axios";

const KEYCL_TOKEN_LIFESPAN = 300;

const config = {
    url: 'https://login.scoutsengidsenvlaanderen.be/auth',
    realm: 'scouts',
    clientId: 'groep-O1306G-Haegepoorters-Destelbergen',
    redirectUri: window.location.href
}

interface KeycloakStore {
    instance: Keycloak;
    authenticated: boolean;
    authenticating: boolean;
    
    token?: string;
    refreshToken?: string;
    
    user?: any;
    
    init: () => void;
    login: () => void;
}

type StringKeys<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type StringProps<T> = Pick<T, StringKeys<T>>; 
type AllowedKeys = keyof StringProps<KeycloakStore>;

const partializePicker = (state: KeycloakStore, allowedKeys: AllowedKeys[]) => {
    return Object.fromEntries(Object.entries(state).filter(([key]) => (allowedKeys as string[]).includes(key))) as any;
};

const useKeycloakStore = create(
    persist<KeycloakStore>(
        ((set, get) => ({
            instance: new Keycloak(config),
            authenticated: false,
            authenticating: false,
        
            token: undefined,
            refreshToken: undefined,
            
            user: undefined,
        
            init: () => {
                const instance = get().instance;
                const cachedTokens = {
                    token: get().token,
                    refreshToken: get().refreshToken,
                }
                instance.init({
                    ...cachedTokens
                })
                    .then(async (auth) => {
                        if (auth) {
                            await instance.updateToken(KEYCL_TOKEN_LIFESPAN);
                            const userInfoResponse = await axios('https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/profiel', {
                                headers: {
                                    'Authorization': 'Bearer ' + instance.token
                                }
                            });
                            set({
                                token: instance.token,
                                refreshToken: instance?.refreshToken,
                                authenticated: true,
                                user: userInfoResponse.data,
                            })
                        }
                    })
                    
                instance.onReady = () => {}
                instance.onAuthSuccess = () => set({
                    authenticating: false,
                })
                instance.onAuthError = () => set({
                    authenticating: false,
                })
            },
            
            login: () => {
                set({
                    authenticating: true,
                })
                const instance = get().instance;
                instance.login();
                /** When the login procedure is finished, keycloak events will catch and provide the end of the process */
            }
        })),
        {
            name: 'keycloakStore',
            getStorage: () => window.localStorage,
            partialize: state => partializePicker(state, ['token', 'refreshToken', 'user']),
        },
    )
)

export default useKeycloakStore;