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

interface UpdateCustomFieldValueOptions {
    refreshUserData?: boolean;
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
    
    refreshUser: () => void;
    getProfileData: () => Promise<any>;
    
    getCustomFieldValue: (fieldId: string, group?: string) => any;
    updateCustomFieldValue: (fieldId: string, value: string, options?: UpdateCustomFieldValueOptions) => Promise<any>;
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
                const token = get().token;
                const cachedTokens = {
                    token: token,
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
            },
            
            refreshUser: () => {
                const authenticated = get().authenticated;
                if (authenticated) console.log('Already authenticated');
                else get().init();
            },
            
            getProfileData: () => {
                const token = get().token;
                return axios('https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/profiel', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
            },
            
            getCustomFieldValue: (fieldId, group = 'O1306G') => {
                const customFields = get().user?.groepseigenVelden?.[group];
                const values = customFields?.waarden;
                return values?.[fieldId];
            },
            
            updateCustomFieldValue: async (fieldId, value, options) => {
                // 28f54ef9-d7c8-4d2d-8051-ba6e8d16f2e1
                const userId = get().user.id;
                const token = get().token;
                
                const fieldObject = {
                    "groepseigenVelden": {
                        "O1306G": {
                            "waarden": {
                                [fieldId]: value
                            }
                        }
                    }
                }
                
                try {
                    const response = await axios.patch(
                        'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga/lid/' + userId, 
                        fieldObject, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                    
                    if(options?.refreshUserData) {
                        get().refreshUser();
                    }
                    
                    return response;
                } catch (error) {
                    console.log('Field could not be updated', fieldObject)
                }
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