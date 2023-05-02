import { FC, useEffect } from 'react';
import { AccountOnBoardingCard } from '../../../../components/basics';
import { OnboardingProcedures } from '../../../../types/accounts';
import usePreferencesStore from '../../../../state/stores/usePreferencesStore/usePreferencesStore';
import useKeycloakStore from '../../../../state/stores/useKeycloakStore/useKeycloakStore';
import { useNavigate } from 'react-router-dom';

interface Props {};

const OnboardingPage: FC<Props> = () => {
    const navigate = useNavigate();
    const setOnboardingOption = usePreferencesStore((state) => state.setAccountOnboarding);
    const identityProviderLogin = useKeycloakStore(store => store.instance.login);
    const identityProviderAuthenticated = useKeycloakStore(store => store.authenticated);
    const platformProfile = useKeycloakStore(store => store.user);
    
    const confirmOption = (option: OnboardingProcedures) => {
        setOnboardingOption(option);
        handleOptionSelect(option);
    }
    
    const handleOptionSelect = (option: OnboardingProcedures) => {
        if (option === 'platform_external') identityProviderLogin();
        else if (option === 'site_config') {};
    }
    
    useEffect(() => {
        if (identityProviderAuthenticated) {
            navigate('/ga/account');
        }
    }, [identityProviderAuthenticated])
    
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title text-center xl:mb-2">Welkom terug{ !!platformProfile?.vgagegevens && <>, { platformProfile?.vgagegevens?.voornaam }</>}</h1>
                <p className="text-center">Beheer je gegevens bij Scouts en Gidsen Vlaanderen</p>
            </div>
            <div className="page__content">
                <AccountOnBoardingCard onConfirm={(option) => confirmOption(option)} />
            </div>
        </div>
    )
}

export default OnboardingPage;