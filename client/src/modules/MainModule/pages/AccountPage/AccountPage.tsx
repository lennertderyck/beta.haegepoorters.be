import { FC } from 'react';
import { Button } from '../../../../components/basics';

interface Props {};

const AccountPage: FC<Props> = () => {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Groepsadministratie</h1>
                <p>Je gegevens bij Scouts en Gidsen Vlaanderen</p>
            </div>
            <div className="page__content">
                <div className="py-6 border-b-2">
                    <div className="content">
                        <h4>Kom later eens terug ...</h4>
                        <p className="!mt-1">We zijn volop bezig met het vernieuwen van onze website. Hierdoor kan je even niet aanmelden.</p>
                        <p className="!-mt-1">Aanmelden kan ook via de site van Scouts & Gidsen Vlaanderen.</p>
                    </div>
                    <Button href="https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/frontend/dashboard" icon="arrow-right" className="mt-4">Naar de Groepsadmin</Button>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;