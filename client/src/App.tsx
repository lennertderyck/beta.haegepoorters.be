import { FC } from 'react';
import {
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import './scss/index.scss';
import MainNavigation from './modules/MainModule/components/MainNavigation/MainNavigation';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { instance as keycloakInstance } from './utils/hooks/useKeycloak/instance';
import useCredentialStore from './utils/hooks/useKeycloak/useCredentialStore';
import { KeycloakInitOptions } from 'keycloak-js';

interface Props {};

const App: FC<Props> = () => {
    const storeTokens = useCredentialStore((state) => state.storeTokens);
    const storedTokens = useCredentialStore((state) => state.tokens);
    const keycloakInitOptions: KeycloakInitOptions = { 
        onLoad: undefined,
        token: storedTokens?.token,
        refreshToken: storedTokens?.refreshToken,
    };
    
    return (
        <ReactKeycloakProvider 
            authClient={ keycloakInstance } 
            autoRefreshToken={ false } 
            initOptions={ keycloakInitOptions }
            onTokens={(tokens) => storeTokens({ 
                refreshToken: tokens.refreshToken as string,
                token: tokens.token as string,
            })}
        >
            <ScrollRestoration />
            <div className="flex h-full">
                <MainNavigation />
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col">
                        <Outlet />
                    </div>
                </div>
            </div>
        </ReactKeycloakProvider>
    )
}

export default App;