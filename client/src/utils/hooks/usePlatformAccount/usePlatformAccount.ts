import { useKeycloak } from '@react-keycloak/web';
import { UserFunction } from '../../../types/requests/adminPlatform';
import fakeProfileData from '../../data/fake/profiel.json'
import { groupUserFunctionsByGroups } from '../../funcs/algorithms/reducing';

const usePlatformAccount = () => {
    const { keycloak } = useKeycloak();
        
    return {
        platform: {
            user: fakeProfileData,
            functions: (fakeProfileData.functies as UserFunction[]).reduce<any>(groupUserFunctionsByGroups, []),
        },
        keycloak
    }
};

export default usePlatformAccount;