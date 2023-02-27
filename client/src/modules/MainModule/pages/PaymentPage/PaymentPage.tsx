import { FC, useMemo, useState } from 'react';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import { generatePaymentQR } from '../../../../utils/funcs/payments';
import { Button } from '../../../../components/basics';
import { paymentRecievers } from '../../../../utils/data/payments';
import AmountField from './AmountField';
import SupportedBanks from './SupportedBanks';
import CustomAccountField from './CustomAccountField';

interface Props {};

const PaymentPage: FC<Props> = () => {
    const [ paymentDetails, setPaymentDetails ] = useState<any>(null);
    
    const reset = () => {
        setPaymentDetails(null);
    }
    
    const selectedReciever = paymentRecievers.find((reciever) => reciever.id === paymentDetails?.reciever);
    const qrImageUrl = useMemo(() => {
        if (paymentDetails && (selectedReciever || paymentDetails.reciever === 'other')) {
            const amount = paymentDetails.blank ? 0 : paymentDetails.amount;
            const reciever = paymentDetails.reciever === 'other' ? paymentDetails.customReciever : selectedReciever?.name + ' Haegepoorters';
            const account = paymentDetails.reciever === 'other' ? paymentDetails.customAccount : selectedReciever?.account;
            
            return generatePaymentQR({
                descr: paymentDetails.description,
                reciever,
                account,
                amount,
            })
        } else return null;
    }, [paymentDetails, selectedReciever]);
    
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">Betaling aanmaken</h1>
            </div>
            <div className="page__content">
                <ControlledForm onSubmit={ setPaymentDetails } defaultValues={{}}>
                    <label className="mb-5">
                        <span>Ontvanger *</span>
                        <Input type="select" name="reciever">
                            { paymentRecievers.map((reciever) => (
                                <option value={ reciever.id } key={ reciever.id }>{ reciever.name }</option>
                            ))}
                            <option value="other">Andere rekening</option>
                        </Input>
                    </label>
                    <CustomAccountField />
                    <label className="mb-5">
                        <span>Mededeling</span>
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
                    <div className="flex gap-4">
                        <Button icon={ paymentDetails ? 'arrow-right-down' : 'check' } type="submit">{ paymentDetails ? 'Opnieuw genereren' : 'Genereer betaling' }</Button>
                        {/* <Button icon="refresh" type="reset" theme="simple" onClick={ reset }>Opnieuw beginnen</Button> */}
                    </div>
                    { qrImageUrl && (
                        <div className="mt-12 flex items-center gap-8">
                            <div> 
                                <img src={ qrImageUrl } width={ 110 } />
                            </div>
                            <div>
                                <h3 className="font-serif">Scan met je bank app</h3>
                                <p className="text-sm">Je kan deze qr-code scannen met de app<br/>van onderstaande banken</p>
                                <Button theme="simple" className="mt-4" icon="download" href={ qrImageUrl + '&download=true&qunit=Mm&quiet=3&eclevel=M' } download target="_self">Download QR code</Button>
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