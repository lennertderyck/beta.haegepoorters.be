import { FC, useMemo } from 'react';
import { Payment } from '../../../../types/payments';
import { paymentRecievers } from '../../../../utils/data/payments';
import classNames from 'classnames';

interface Props {
    payment: Payment;
    isCurrent?: boolean;
};

const PaymentListCard: FC<Props> = ({ payment }) => {
    const absolute = Math.trunc(payment.amount);
    const comma = payment.amount.toPrecision(3).split('.')[1];
    
    const recieverName = useMemo(() => {
        return payment.reciever === 'other' ? 
            payment.customReciever : 
            paymentRecievers.find((reciever) => reciever.id === payment.reciever)?.name;
    }, [payment.reciever, paymentRecievers])
    
    return (
        <div
            className={classNames(
                'rounded-lg flex items-center',
            )}
        >
            <div className="flex-1">
                <h4 className="label">Betaling aan <strong>{ recieverName }</strong></h4>
                { !!payment.description && <p className="text-lg mb-1"><strong className="font-medium">{ payment.description }</strong></p>}
            </div>
            <div>
                { !payment.blank && <h4><span className="text-3xl"></span><span className="font-medium text-2xl">{ absolute }</span><span className="font-medium text-lg">,{ comma } <span className="text-gray-400">EUR</span></span></h4>}
            </div>
        </div>
    )
}

export default PaymentListCard;