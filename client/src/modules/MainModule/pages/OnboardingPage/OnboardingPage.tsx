import { FC, useEffect } from 'react';
import { AccountOnBoardingCard, Button, Icon } from '../../../../components/basics';
import { OnboardingProcedures } from '../../../../types/accounts';
import usePreferencesStore from '../../../../state/stores/usePreferencesStore/usePreferencesStore';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../../../../utils/hooks';

interface Props {};

const OnboardingPage: FC<Props> = () => {
    const navigate = useNavigate();
    const setOnboardingOption = usePreferencesStore((state) => state.setAccountOnboarding);
    const onboardingPref = usePreferencesStore((state) => state.accountOnboarding);
    
    const confirmOption = (option: OnboardingProcedures) => {
        setOnboardingOption(option);
    }
    
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title text-center xl:mb-2">Welkom terug, Lennert</h1>
                <p className="text-center">Je gegevens bij Scouts en Gidsen Vlaanderen</p>
            </div>
            <div className="page__content">
                <AccountOnBoardingCard onConfirm={(option) => confirmOption(option)} />
            </div>
        </div>
    )
}

export default OnboardingPage;