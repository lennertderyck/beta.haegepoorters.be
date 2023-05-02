import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';

interface Props {};

const AccountIndexPage: FC<Props> = () => {
    const authenticated = useKeycloakStore(store => store.authenticated);
    
    if (authenticated) return <Navigate to="/ga/account" replace />
    else return <Navigate to="/ga/onboarding" replace />
}

export default AccountIndexPage;