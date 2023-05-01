import { FC } from 'react';
import {
    Outlet,
    ScrollRestoration,
} from "react-router-dom";
import './scss/index.scss';
import MainNavigation from './modules/MainModule/components/MainNavigation/MainNavigation';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import useKeycloakStore from './state/stores/useKeycloakStore/useKeycloakStore';
import { useEffectOnce } from './utils/hooks';
  
const queryClient = new QueryClient();

interface Props {};

const App: FC<Props> = () => {  
    const initIdentityProvider = useKeycloakStore(store => store.init);
    
    useEffectOnce(() => initIdentityProvider());
    
    return (
        <QueryClientProvider client={queryClient}>
            <ScrollRestoration />
            <div className="flex h-full">
                <MainNavigation />
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* <CookieClicker /> */}
        </QueryClientProvider>
    )
}

export default App;