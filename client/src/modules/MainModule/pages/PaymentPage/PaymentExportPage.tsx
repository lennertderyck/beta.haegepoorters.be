import { FC } from 'react';
import usePaymentsStore from '../../../../state/stores/usePaymentsStore/usePaymentsStore';
import { useParams } from 'react-router-dom';
import usePaymentQrGenerator from '../../../../utils/hooks/usePaymentQrGenerator/usePaymentQrGenerator';
import { paymentRecievers } from '../../../../utils/data/payments';
import SupportedBanks from './SupportedBanks';
import { Button } from '../../../../components/basics';
import PaymentListCard from './PaymentListCard';

interface Props {};

const PaymentExportPage: FC<Props> = () => {
    const params = useParams<any>();
    const payment = usePaymentsStore((store) => params['paymentId'] ? store.findById(params['paymentId']) : undefined);
    
    console.log(payment);
    
    const selectedReciever = paymentRecievers.find((reciever) => reciever.id === payment?.reciever);
    const _qrImageUrl = usePaymentQrGenerator({ payment, selectedReciever });
    
    return (
        <>
            <div className="page flex flex-col h-screen">
                <div className="page__title text-center !mb-24">Betalen met je smartphone?</div>
                <div className="flex-1 flex flex-col items-center content">
                    <div className="mb-12 text-center">
                        <h3 className="mb-2">Stap 1</h3>
                        <p className="font-semibold print:leading-4">Open je banking-app</p>
                        <div className="mt-8">
                            <SupportedBanks />
                        </div>
                    </div>
                    <div className="mb-12 text-center">
                        <h3 className="mb-2">Stap 2</h3>
                        <p className="font-semibold print:leading-4">Scan de QR-code</p>
                        <div className="mt-8">
                            { _qrImageUrl && <img src={ _qrImageUrl } width={150} /> }
                        </div>
                    </div>
                    <div className="mb-12 text-center">
                        <h3 className="mb-2">Stap 2</h3>
                        { payment?.blank ?
                        <>
                            <p className="font-semibold print:leading-4">Vul het juiste bedrag in en bevestig</p>
                        </> :
                        <>
                            <p className="font-semibold print:leading-4">Controleer de gegevens en bevestig</p>
                            <p>Indien nodig pas je bedrag aan</p>
                        </>
                        }
                    </div>
                </div>
            </div>
            <div className="print:hidden paper p-6 fixed bottom-12 right-12 min-w-[400px]">
                <div className="mb-6 list">
                    <div className="list__item">
                        { payment && (
                            <PaymentListCard 
                                payment={ payment }
                            />
                        )}
                    </div>
                    {/* <h3>{ payment?.description }</h3>
                    <p className="text-lg">
                        <span className="font-semibold">{ selectedReciever?.name }</span> 
                        { !payment?.blank && <>
                            &nbsp;&nbsp;–&nbsp;&nbsp;
                            <span className="font-semibold">{ payment?.amount } euro</span>
                        </>}
                    </p> */}
                </div>
                <div className="flex items-center divide-x-2 divide-gray-300">
                    <div className="pr-3">
                        <Button icon="printer" onClick={ window.print }>Afdrukken</Button>
                    </div>
                    <div className="pl-3">
                        <Button theme="simple" icon="pencil" to={`/betalen/g/${ payment?.id }`}>aanpassen</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentExportPage;