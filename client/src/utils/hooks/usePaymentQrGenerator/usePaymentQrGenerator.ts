import { useMemo } from "react";
import { generatePaymentQR } from "../../funcs/payments";
import { Payment } from "../../../types/payments";
import { paymentRecievers } from "../../data/payments";

interface Options {
    payment: Payment | undefined;
    selectedReciever: any;
}

type PaymentQRGeneratorHook = (options: Options) => string | null;

const usePaymentQrGenerator: PaymentQRGeneratorHook = ({ payment, selectedReciever }) => {
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
    
    return qrImageUrl;
}

export default usePaymentQrGenerator;