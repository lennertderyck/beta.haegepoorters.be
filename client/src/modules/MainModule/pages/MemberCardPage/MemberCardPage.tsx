import { FC, useEffect, useMemo } from 'react';
import MemberCard from './MemberCard';
import { useSearchParams } from 'react-router-dom';
import { useEffectOnce } from '../../../../utils/hooks';
import usePreferencesStore from '../../../../state/stores/usePreferencesStore/usePreferencesStore';

interface Props {};

const MemberCardPage: FC<Props> = () => {
    const { storeDigitalMemberCard } = usePreferencesStore();
    const storedMemberData = usePreferencesStore((state) => state.digitalMemberCard);
    const [ searchParams ] = useSearchParams();
    const memberId = useMemo(() => {
        return searchParams.get('memberId') || storedMemberData.id
    }, [ searchParams, storedMemberData.id ]);
    const memberName = useMemo(() => {
        return searchParams.get('name') || storedMemberData.name
    }, [ searchParams, storedMemberData.name ]);
    
    useEffect(() => {
        if (memberId) {
            storeDigitalMemberCard(memberId, memberName);
        }
    }, [ memberId, memberName ])
    
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title text-center">Jouw digitale lidkaart</h1>
                <p className="text-center">Gebruik je lidnummer om aan te melden bij de Groepsadministratie</p>
            </div>
            <div className="page__content">
                <div className="mx-auto w-fit">
                    { memberId && <MemberCard memberId={ memberId } memberName={ memberName } />}
                </div>
            </div>
        </div>
    )
}

export default MemberCardPage;