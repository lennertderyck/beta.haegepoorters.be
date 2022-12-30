import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { ExpansionPane } from '../../../../components/basics';

interface Props {};

const InteractiveFaqInfo: FC<{}> = () => {
    const control = useFormContext();
    const subject = control.watch('subject');
    
    const info = {
        'groepsadmin': 'Een vraag over de Groepsadministratie? Google zeker ook naar de help-pagina van Scouts & Gidsen Vlaanderen!',
        'inschrijvingen': 'Inschrijvingen vinden jaarlijks plaats tegen eind april / begin mei. Als er nog plaatsen over zijn in een tak kan je mogelijks ook inschrijven tijdens het jaar. Broers/zussen en kinderen van oud-leiding krijgen voorrang tijdens de inschrijvingen.',
        'evenementen': 'Bij evenementen zoals onze spaghettiavond of BBQ plaatsen we communicatie en een inschrijvingsformulier op onze website. Hou onze website dus in de gaten wanneer het zover is ;).',
        'verhuur': 'We verhuren onze lokalen niet. Je kan echter wel materiaal huren bij ons.',
    }
    
    const foundSubject = useMemo(() => {
        return info[subject as keyof typeof info]
    }, [subject]);
    
    return (
        <ExpansionPane active={ !!foundSubject}>
            <div className="p-4 bg-stone-100 text-sm">
                { foundSubject }
            </div>
        </ExpansionPane>
    )
}

export default InteractiveFaqInfo;