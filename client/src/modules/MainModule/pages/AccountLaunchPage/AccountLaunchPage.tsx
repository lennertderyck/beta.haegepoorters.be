import { FC, useEffect } from 'react';
import { AccountOnBoardingCard, Button, Icon } from '../../../../components/basics';
import { OnboardingProcedures } from '../../../../types/accounts';
import usePreferencesStore from '../../../../state/stores/usePreferencesStore/usePreferencesStore';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../../../../utils/hooks';

interface Props {};

const AccountLaunchPage: FC<Props> = () => {
    const navigate = useNavigate();
    const setOnboardingOption = usePreferencesStore((state) => state.setAccountOnboarding);
    const onboardingPref = usePreferencesStore((state) => state.accountOnboarding);
    
    const confirmOption = (option: OnboardingProcedures) => {
        console.log(option)
        setOnboardingOption(option);
        redirectOnboarding(option);
    }
    
    const redirectOnboarding = (option: OnboardingProcedures) => {
        // console.log(option)
        if (option === 'platform_external') window.open('https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/', '_blank');
        else if (option === 'site_config') navigate('/ga/voorkeuren');
    }
    
    useEffectOnce(() => {
        if (onboardingPref !== null) {
            redirectOnboarding(onboardingPref);
        }
    })
    
    return (
        <div className="page">
            <div className="page__header">
                {/* <h1 className="page__title text-center xl:mb-2">Welkom terug</h1> */}
                <h1 className="page__title text-center xl:mb-2">Groepsadministratie</h1>
                <p className="text-center">Je gegevens bij Scouts en Gidsen Vlaanderen</p>
            </div>
            <div className="page__content">
                <AccountOnBoardingCard selectedOption={ onboardingPref } onConfirm={(option) => confirmOption(option)} />
            </div>
        </div>
    )
}

export default AccountLaunchPage;