import { useKeycloak } from '@react-keycloak/web';
import { UserFunction } from '../../../types/requests/adminPlatform';
import fakeProfileData from '../../../mocks/fake/profiel'
import { groupUserFunctionsByGroups } from '../../funcs/algorithms/reducing';
import { instance } from '../useKeycloak/instance';

const usePlatformAccount = (): any => {
    const { keycloak } = useKeycloak();
    
    const login = process.env.NODE_ENV === 'production' ? keycloak.login : instance.login;
    const authenticated = process.env.NODE_ENV === 'production' ? keycloak.authenticated : true;
        
    return {
        platform: {
            user: fakeProfileData,
            functions: (fakeProfileData.functies as UserFunction[]).reduce<any>(groupUserFunctionsByGroups, []),
        },
        keycloak: {
            ...keycloak,
            authenticated,
            login,
        }
    }
};

export default usePlatformAccount;