import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Button } from '../../../../components/basics';
import { Payment } from '../../../../types/payments';
import { paymentRecievers } from '../../../../utils/data/payments';
import { generatePaymentQR } from '../../../../utils/funcs/payments';
import useDeviceProperties from '../../../../utils/hooks/useDeviceProperties/useDeviceProperties';
import QRCodePreview from './QRCodePreview';
import SupportedBanks from './SupportedBanks';

const QR_RENDER_TIMEOUT = 1500 // ms

interface Props {
    payment: Payment | undefined;
    showPopover: boolean;
    onClose: () => void;
};

const PaymentPreview: FC<Props> = ({ payment, showPopover, onClose }) => {
    const { isTouch } = useDeviceProperties();
    const [ isBouncing, setIsBouncing ] = useState(false);
    
    const selectedReciever = paymentRecievers.find((reciever) => reciever.id === payment?.reciever);
    // const _qrImageUrl = usePaymentQrGenerator({ payment, selectedReciever });
    
    const qrImageUrl = useMemo(() => {
        if (payment && (selectedReciever || payment.reciever === 'other')) {
            const amount = payment.blank ? 0 : payment.amount;
            const reciever = payment.reciever === 'other' ? payment.customReciever : selectedReciever?.name + ' Haegepoorters';
            const account = payment.reciever === 'other' ? payment.customAccount : selectedReciever?.account;
            
            return generatePaymentQR({
                descr: payment.description,
                reciever,
                account,
                amount,
            })
        } else return null;
    }, [payment, selectedReciever]);
        
    const [debouncedQrImageUrl] = useDebounce(qrImageUrl, QR_RENDER_TIMEOUT);
    
    useEffect(() => {
        setIsBouncing(true);
        const timeout = setTimeout(() => setIsBouncing(false), QR_RENDER_TIMEOUT);
        
        return () => clearTimeout(timeout);
    }, [payment])
    
    useEffect(() => {
        setIsBouncing(false);
    }, [debouncedQrImageUrl])
    
    return (
        <div className={classNames(
            'bg-white',
            isTouch && 'fixed inset-0 z-10 p-8 flex flex-col justify-center',
            isTouch && (showPopover ? 'translate-y-[0%]' : 'translate-y-full')
        )}>
            <div className="flex-1 flex flex-col justify-center">
                { debouncedQrImageUrl && (
                    <>
                        <div className={classNames('mb-8')}>
                            <QRCodePreview imageUrl={ debouncedQrImageUrl } bouncing={ isBouncing } payment={ payment } />
                        </div>
                    </>
                )}
                <div className="select-none bg-stone-50 rounded-lg p-6">
                    <h4 className="label !tracking-widest mb-4 text-center lg:text-left">Ondersteunde bank-apps</h4>
                    <SupportedBanks align="start" />
                </div>
            </div>
            { isTouch && (
                <Button 
                    onClick={ onClose }
                    className="mx-auto mt-4"
                    theme="simple"
                    icon="arrow-right-down"
                >Betaling bewerken</Button>
            )}
        </div>
    )
}

export default PaymentPreview;