import { FC, useState } from 'react';
import { Button, ExpansionPane, Icon } from '../../basics';
import classNames from 'classnames';
import usePreferencesStore from '../../../state/stores/usePreferencesStore/usePreferencesStore';
import Dialog from '../../basics/Dialog/Dialog';

interface Props {};

const CookieClicker: FC<Props> = () => {
    const setPolicy = usePreferencesStore(store => store.setCookiePolicy);
    const [ showDetails, setShowDetails ] = useState(false);
    
    return (
        <Dialog overlay>
            <div className="flex justify-between gap-6 p-6">
                <div className="content content--inline">
                    <h4>Koekjes? Lekker!</h4>
                    <p>We gebruiken cookies voor de goede werking van onze site.</p>
                </div>
                <button onClick={() => setShowDetails(s => !s)}>
                    <Icon name="arrow-down-s" size="2rem" className={classNames(showDetails && '-rotate-180', 'duration-300')} />
                </button>
            </div>
            <ExpansionPane active={ showDetails }>
                <div className="px-6 pb-4 -mt-4 content">
                    <p>Cookies stellen ons in staat om onze site gebruiksvriendelijk te maken, en te verbeteren.</p>
                    <p>Zo kunnen we bepaalde gegevens lokaal op jouw computer bewaren zodat je bepaalde acties niet telkens opnieuw hoeft te doen, en we meten of onze site goed werk.</p>
                    <p>Persoonlijke gegevens worden nooit zonder jouw toestemming verstuurd.</p>
                    <Button icon="arrow-right" theme="simple" className="mt-2" to="/privacy">Meer over privacy</Button>
                </div>
            </ExpansionPane>
            {/* <hr className="border-gray-200 border-t-2" /> */}
            <div className="px-6 pb-6 flex justify-end gap-4 flex-wrap">
                <Button icon="close" onClick={() => setPolicy('all')}>Sluiten</Button>
                {/* <Button icon="check" onClick={() => setPolicy('all')}>Geef ze me allemaal!</Button>
                <Button icon="close" theme="simple" onClick={() => setPolicy('restricted')}>Enkel noodzakelijk</Button> */}
            </div>
        </Dialog>
    )
}

export default CookieClicker;