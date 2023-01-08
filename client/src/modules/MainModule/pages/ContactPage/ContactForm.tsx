import { FC } from 'react';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import InteractiveFaqInfo from './InteractiveFaqInfo';
import { Button, ExpansionPane, Icon, Loader } from '../../../../components/basics';
import { useAsyncState } from '../../../../utils/hooks';
import useLazyAxios from '../../../../utils/hooks/useAxios/useLazyAxios';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Props {};

const ContactForm: FC<Props> = () => {
    const params = useParams<any>();

    // const [ request, { data, loading, error }] = useLazyAxios('https://fwd.haegepoorters.be/', {
    //     method: 'POST',
    // })
    
    const [{ data, loading, error }, { initiate, fulfill, cancelWithError }] = useAsyncState();    
    const handleFormComplete = (data: any) => {
        if (data.subject === 'x') window.alert('Kies een onderwerp');
        // request<any>(data, 'https://fwd.haegepoorters.be/');
        sendFormData(data);
    }
    
    const sendFormData = async (formData: any) => {
        initiate();
        try {
            const response = await fetch('https://fwd.haegepoorters.be/', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();
            fulfill(data);
        } catch (error) {
            cancelWithError(error);
        }
    }

    if (error) return (
        <>
            <Icon name="mail-close" className="mx-auto mb-2" size="1.6rem" />
            <h4 className="text-center font-serif text-2xl">Oeps</h4>
            <p className="text-center">Er ging iets fout bij het verzenden</p>
            <Button theme="simple" icon="arrow-go-back" className="mx-auto mt-4">Opnieuw proberen</Button>
        </>
    )
    if (loading) return (
        <>
            <div className="mb-2 mx-auto w-fit">
                <Loader />
            </div>
            <h4 className="text-center font-serif text-2xl">Bericht verzenden...</h4>
            <p className="text-center">Sluit dit venster niet</p>
        </>
    );
    else if (data) return (
        <>
            <Icon name="mail-send" className="mx-auto mb-2" size="1.6rem" />
            <h4 className="text-center font-serif text-2xl">Bericht verzonden</h4>
            <p className="text-center">We hebben je berichtje goed ontvangen!</p>
            <Button theme="simple" icon="arrow-right" className="mx-auto mt-4">Nog een bericht versturen</Button>
        </>
    );
    else return (
        <>
            <ExpansionPane active={ true }>
                <ControlledForm defaultValues={{ subject: 'x', reciever: params['reciever'] || 'groepsleiding' }} onSubmit={ handleFormComplete }>
                    <label className="mb-5">
                        <span>Aanspreekpunt</span>
                        <Input name="reciever" type="select" required>
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
                        <Input name="name" required />
                    </label>
                    <label className="mb-5">
                        <span>E-mail</span>
                        <Input type="email" name="sender" required />
                    </label>
                    <label className="mb-5">
                        <span>Naam kind</span>
                        <Input name="child" />
                    </label>
                    <label className="mb-2">
                        <span>Onderwerp</span>
                        <Input name="subject" type="select" required>
                            <option defaultChecked disabled value="x">Selecteer onderwerp</option>
                            <option value="groepsadmin">Groepsadministratie</option>
                            <option value="inschrijvingen">Inschrijvingen</option>
                            <option value="evenementen">Evenementen</option>
                            <option value="verhuur">Verhuur</option>
                            <option value="andere">Andere</option>
                        </Input>
                    </label>
                    <div className="mb-5">
                        <InteractiveFaqInfo />
                    </div>
                    <label>
                        <span>Bericht</span>
                        <Input name="message" type="textarea" />
                    </label>
                    <Button type="submit" className="mt-5">Versturen</Button>
                </ControlledForm>
            </ExpansionPane>
        </>
    )
}

export default ContactForm;