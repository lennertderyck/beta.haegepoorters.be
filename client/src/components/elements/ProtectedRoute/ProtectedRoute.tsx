import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import { AdminPlatformSignInCard, Icon } from '../../basics';
import useKeycloakStore from '../../../state/stores/useKeycloakStore/useKeycloakStore';
import useAccessRights from '../../../utils/hooks/useAccessRights/useAccessRights';

const NoAccessCard = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-5">
                <Icon name="lock" className="" size="1.6rem" />
                <div>
                    <h3 className="font-serif text-xl text-center lg:text-left">Geen toegang</h3>
                    <p className="whitespace-nowrap text-sm text-center lg:text-left text-gray-400">Enkel leiding heeft toegang tot deze pagina</p>
                </div>
            </div>
            {/* <div className="bg-gray-100 text-sm font-serif uppercase">
                Staff only
            </div> */}
        </>
    )
}

interface ProtectedFirst {
    requiredRoles: string[];
    
    redirectRoles: undefined;
    to: undefined;
};

interface RedirectFirst {
    redirectRoles: string[];
    to: string;
    
    requiredRoles: undefined;
}

interface Props extends PropsWithChildren {
    staffOnly: true;
    view?: 'flyover' | 'blocked'
};

const ProtectedRoute: FC<Props> = ({ children, view, staffOnly }) => {
    const authenticated = useKeycloakStore((store) => store.authenticated);
    const loading = useKeycloakStore((store) => store.authenticating);
    const accessRights = useAccessRights();
    
    const flyoverActive = 
        (!authenticated || loading) && 
        process.env.NODE_ENV !== 'development' ||
        (
            staffOnly && !accessRights.staff
        )
    ;
    
    if (view === 'blocked') return <div className="paper w-fit p-6 rounded-lg mx-auto">
        <NoAccessCard />
    </div>
    
    return (
        <div
            className={classNames(
                'flyover flyover--fit-screen',
                flyoverActive && 'flyover--active',
            )}
        >
            <div className="flyover__main">
                { children }
            </div>
            <div className="flyover__bridge">
                { authenticated ? 
                    <NoAccessCard /> :
                    <AdminPlatformSignInCard loading={ loading } />
                }
            </div>
        </div>
    )
}

export default ProtectedRoute;