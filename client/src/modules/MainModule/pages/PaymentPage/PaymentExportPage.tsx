import { FC, useEffect, useMemo } from 'react';
import usePaymentsStore from '../../../../state/stores/usePaymentsStore/usePaymentsStore';
import { useParams, useSearchParams } from 'react-router-dom';
import usePaymentQrGenerator from '../../../../utils/hooks/usePaymentQrGenerator/usePaymentQrGenerator';
import { paymentRecievers } from '../../../../utils/data/payments';
import SupportedBanks from './SupportedBanks';
import { useDocumentTitle } from '../../../../utils/hooks';
import ExportControlPanel from './ExportControlPanel';

interface Props {};

const PaymentExportPage: FC<Props> = () => {
    const params = useParams<any>();
    const [searchParams] = useSearchParams();
    const payment = usePaymentsStore((store) => params['paymentId'] ? store.findById(params['paymentId']) : undefined);
    const autoPrintEnabled = searchParams.get('print') === 'auto';
    
    const [, setTitle] = useDocumentTitle();
    const setSuffixedDocumentTitle = (title: string) => setTitle(title + '.pdf');
    
    const selectedReciever = paymentRecievers.find((reciever) => reciever.id === payment?.reciever);
    const _qrImageUrl = usePaymentQrGenerator({ payment, selectedReciever });
    
    const proposedTitle = useMemo<string>(() => {
        if (!!payment) return (`betaling_${ payment.amount }eur_${ selectedReciever?.name }`).replaceAll(' ', '_').toLowerCase();
        else return `betaling`;
    }, [payment, selectedReciever])
    
    useEffect(() => {
        if (!!payment) {
            setSuffixedDocumentTitle(proposedTitle + '.pdf');
        }
    }, [payment])
    
    useEffect(() => {
        if (autoPrintEnabled) {
            window.print();
        }
    }, [autoPrintEnabled])
    
    const isIframe = window.self !== window.top;
    
    console.log('isIframe', isIframe)
    
    return (
        <>
            <div className="page flex flex-col h-screen">
                <div className="page__title text-center !mb-24">Betalen met je smartphone?</div>
                <div className="flex-1 flex flex-col items-center">
                    <div className="mb-12 text-center">
                        <div className="content content--inline">
                            <h3 className="mb-2">Stap 1</h3>
                            <p className="font-semibold print:leading-4">Open je banking-app</p>
                        </div>
                    </div>
                    <div className="mb-12 text-center">
                        <div className="content content--inline">
                            <h3 className="mb-2">Stap 2</h3>
                            <p className="font-semibold print:leading-4">Scan de QR-code</p>
                        </div>
                        <div className="mt-8">
                            { _qrImageUrl && <img src={ _qrImageUrl } width={150} /> }
                        </div>
                    </div>
                    <div className="mb-12 text-center">
                        <div className="content content--inline">
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
                <div className="select-none  w-fit mx-auto">
                    <h4 className="label !tracking-widest mb-5 text-center">Ondersteunde bank-apps</h4>
                    <SupportedBanks align="center" />
                    <div className="content content--inline mt-4 !text-gray-400 text-center">
                        <p>Payconiq wordt niet ondersteund</p>
                    </div>
                </div>
            </div>
            { !isIframe && <ExportControlPanel payment={ payment } selectedReciever={ selectedReciever } />}
        </>
    )
}

export default PaymentExportPage;