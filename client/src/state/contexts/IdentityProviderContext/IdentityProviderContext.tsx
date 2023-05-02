import { create } from "lodash";
import { FC, PropsWithChildren, createContext, useContext, useSyncExternalStore } from "react";
import Keycloak from 'keycloak-js';
import useKeycloakStore from "../../stores/useKeycloakStore/useKeycloakStore";

const KEYCL_TOKEN_LIFESPAN = 300;

const config = {
    url: 'https://login.scoutsengidsenvlaanderen.be/auth',
    realm: 'scouts',
    clientId: 'groep-O1306G-Haegepoorters-Destelbergen',
    redirectUri: window.location.href
}

const keycloakInstance = new Keycloak(config)

const initialState = {
    instance: keycloakInstance,
    authenticated: false,
    authenticating: false,
        
    token: undefined,
    refreshToken: undefined,
            
    user: undefined,
    
    init: () => {
        throw Error('Hook used outside context')
    }
}

const context = createContext(initialState);

const IdentityProviderContext: FC<PropsWithChildren> = ({ children }) => {    
    const subscribe = (callback: any) => {
        keycloakInstance.onReady
        
        return () => {
            
        }
    }
    
    const getState = () => {
        return keycloakInstance;
    }
    
    const keycloakReactor = useSyncExternalStore<any>(subscribe, getState);
    
    return (
        <context.Provider value={ initialState }>
            { children}
        </context.Provider>
    )
}