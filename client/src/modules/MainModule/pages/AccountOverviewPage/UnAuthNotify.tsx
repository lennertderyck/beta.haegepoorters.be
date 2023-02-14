import { FC } from 'react';
import { Button } from '../../../../components/basics';

interface Props {
    error: any;
    onLogin?: () => void;
};

const UnAuthNotify: FC<Props> = ({ onLogin, error }) => {
    return (
        <div>
            <h3 className="font-serif text-xl text-center lg:text-left">Howdy! Niet zo snel ...</h3>
            <p className="text-sm text-center lg:text-left text-gray-400">
                Meld je aan om je gegevens bij Scouts & Vlaanderen te bekijken.
            </p>
            {/* <Button theme="simple" icon="arrow-right-up" className="mt-4" href="https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/client/">Inloggen bij Groepsadministratie</Button> */}
            <Button theme="simple" icon="arrow-right-up" className="mt-4" onClick={() => onLogin?.()}>Inloggen bij Groepsadministratie</Button>
                
            { !!error && <p className="text-sm mt-4">Er ging iets fout bij het aanmelden, probeer opnieuw</p>}
        </div>
    )
}

export default UnAuthNotify;