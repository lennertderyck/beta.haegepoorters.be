import {
    QueryClientProvider
} from '@tanstack/react-query';
import { FC } from 'react';
import {
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import CookieClicker from './components/elements/CookieClicker/CookieClicker';
import MainNavigation from './modules/MainModule/components/MainNavigation/MainNavigation';
import './scss/index.scss';
import IdentityAccessRightsProvider from './state/contexts/IdentityAccessRightsContext/IdentityAccessRightsContext';
import useKeycloakStore from './state/stores/useKeycloakStore/useKeycloakStore';
import usePreferencesStore from './state/stores/usePreferencesStore/usePreferencesStore';
import { useEffectOnce } from './utils/hooks';
import QUERY_CLIENT from './utils/vendors/TanStack/ReactQuery/queryClient';
  
interface Props {};

const App: FC<Props> = () => {  
    const initIdentityProvider = useKeycloakStore(store => store.init);
    const showCookieClicker = usePreferencesStore(store => store.cookiePolicy === undefined);
    
    useEffectOnce(() => initIdentityProvider());
    
    return (
        <QueryClientProvider client={QUERY_CLIENT}>
            <IdentityAccessRightsProvider>
                <ScrollRestoration />
                <div className="flex h-full">
                    <MainNavigation />
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 flex flex-col">
                            <Outlet />
                        </div>
                    </div>
                </div>
                { showCookieClicker && <CookieClicker />}
            </IdentityAccessRightsProvider>
        </QueryClientProvider>
    )
}

export default App;