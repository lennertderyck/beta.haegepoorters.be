import { FC, useMemo, useState } from 'react';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import { generatePaymentQR } from '../../../../utils/funcs/payments';
import { Button } from '../../../../components/basics';
import { paymentRecievers } from '../../../../utils/data/payments';
import AmountField from './AmountField';
import SupportedBanks from './SupportedBanks';

interface Props {};

const PaymentPage: FC<Props> = () => {
    const [ paymentDetails, setPaymentDetails ] = useState<any>(null);
    
    const selectedReciever = paymentRecievers.find((reciever) => reciever.id === paymentDetails?.reciever);
    const qrImageUrl = useMemo(() => {
        if (paymentDetails && selectedReciever) {
            const amount =  paymentDetails.blank ? 0 : paymentDetails.amount;
            return generatePaymentQR({
                account: selectedReciever.account,
                descr: paymentDetails.description,
                reciever: selectedReciever.name + ' Haegepoorters',
                amount,
            })
        } else return null;
    }, [paymentDetails, selectedReciever]);
    
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">Betaling genereren</h1>
            </div>
            <div className="page__content">
                <ControlledForm onSubmit={ setPaymentDetails } defaultValues={{}}>
                    <label className="mb-5">
                        <span>Ontvanger</span>
                        <Input type="select" name="reciever">
                            { paymentRecievers.map((reciever) => (
                                <option value={ reciever.id } key={ reciever.id }>{ reciever.name }</option>
                            ))}
                        </Input>
                    </label>
                    <label className="mb-5">
                        <span>Omschrijving</span>
                        <Input name="description" />
                    </label>
                    <label className="mb-5 !flex items-baseline gap-2">
                        <Input type="checkbox" name="blank" />
                        <div>
                            <p>Betaler vult bedrag zelf in</p>
                            <p className="text-sm text-gray-400 mt-2">Het bedrag van de betaling wordt op €0 ingesteld.<br />De betaler past het bedrag na het scannen zelf aan in de app.</p>
                        </div>
                    </label>
                    <AmountField />
                    <Button icon="refresh" type="submit">{ paymentDetails ? 'Opnieuw genereren' : 'Genereer betaling' }</Button>
                    { qrImageUrl && (
                        <div className="mt-12 flex items-center gap-8">
                            <div> 
                                <img src={ qrImageUrl } width={ 110 } />
                            </div>
                            <div>
                                <h3 className="font-serif">Scan met je bank app</h3>
                                <p className="text-sm">Je kan deze qr-code scannen met de app<br/>van onderstaande banken</p>
                                <Button theme="simple" className="mt-4" icon="download" href={ qrImageUrl + '&download=true&quiet=3' } download target="_blank">Download QR code</Button>
                            </div>
                        </div>
                    )}
                    <div className="mt-12 select-none bg-stone-50 rounded-lg p-6">
                        <h4 className="label !tracking-widest mb-4">Ondersteunde bank-apps</h4>
                        <SupportedBanks />
                    </div>
                </ControlledForm>
            </div>
        </div>
    )
}

export default PaymentPage;