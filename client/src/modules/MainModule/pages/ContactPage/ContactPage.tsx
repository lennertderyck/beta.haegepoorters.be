import { FC, useMemo } from 'react';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import { Button, ExpansionPane } from '../../../../components/basics';
import { useFormContext } from 'react-hook-form';

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

interface Props {};

const ContactPage: FC<Props> = () => {
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Contact</h1>
                <p>Vraag? Suggestie? Laat het ons weten!</p>
            </div>
            <div className="page__banner">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.772191531905!2d3.7631204157534572!3d51.05729407956365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c376c02393bccb%3A0x1e72273a2eee6c6a!2sScouts%20en%20Gidsen%20Haegepoorters%20Destelbergen!5e0!3m2!1snl!2sbe!4v1672183356043!5m2!1snl!2sbe"
                    allowFullScreen={ false } 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    className="w-full h-full bg-gray-100"
                />
            </div>
            <div className="page__content">
                <ControlledForm>
                    <label className="mb-5">
                        <span>Aanspreekpunt</span>
                        <Input name="reciever" type="select">
                            <option value="groepsleiding">groepsleiding</option>
                            <option value="vzw">VZW</option>
                            <option value="kapoenen">kapoenen</option>
                            <option value="welpen">welpen</option>
                            <option value="woudlopers">woudlopers</option>
                            <option value="jonggivers">jonggivers</option>
                            <option value="givers">givers</option>
                        </Input>
                    </label>
                    <label className="mb-5">
                        <span>Naam</span>
                        <Input name="name" />
                    </label>
                    <label className="mb-5">
                        <span>E-mail</span>
                        <Input type="email" name="sender" />
                    </label>
                    <label className="mb-5">
                        <span>Naam kind</span>
                        <Input name="child" />
                    </label>
                    <label className="mb-2">
                        <span>Onderwerp</span>
                        <Input name="subject" type="select">
                            <option selected disabled>Selecteer onderwerp</option>
                            <option value="groepsadmin">Groepsadministratie</option>
                            <option value="inschrijvingen">Inschrijvingen</option>
                            <option value="evenementen">Evenementen</option>
                            <option value="verhuur">Verhuur</option>
                            <option value="andere">Andere</option>
                        </Input>
                    </label>
                    <div className="mb-5"><InteractiveFaqInfo /></div>
                    <label>
                        <span>Bericht</span>
                        <Input name="message" type="textarea" />
                    </label>
                    <Button type="submit" className="mt-5">Versturen</Button>
                </ControlledForm>
            </div>
        </div>
    )
}

export default ContactPage;