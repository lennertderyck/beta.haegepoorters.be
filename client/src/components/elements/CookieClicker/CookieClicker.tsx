import { FC, useState } from 'react';
import { Button, ExpansionPane, Icon } from '../../basics';
import classNames from 'classnames';

interface Props {};

const CookieClicker: FC<Props> = () => {
    const [ showDetails, setShowDetails ] = useState(false);
    
    return (
        <div className="fixed inset-0 z-40 p-12 flex items-end justify-end">
            <div className="bg-white shadow-lg max-w-[500px]">
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
                <hr className="border-gray-200 border-t-2" />
                <div className="p-6 flex gap-4 justify-between">
                    <Button icon="check">Geef ze me allemaal!</Button>
                    <Button icon="close" theme="simple">Enkel noodzakelijk</Button>
                </div>
            </div>
        </div>
    )
}

export default CookieClicker;