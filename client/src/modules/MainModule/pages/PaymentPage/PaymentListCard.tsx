import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Payment } from '../../../../types/payments';
import { paymentRecievers } from '../../../../utils/data/payments';

interface Props {
    payment: Payment;
};

const PaymentListCard: FC<Props> = ({ payment }) => {
    const [integer, decimal] = payment.amount.toPrecision(4).split('.');
    
    const recieverName = useMemo(() => {
        return payment.reciever === 'other' ? 
            payment.customReciever : 
            paymentRecievers.find((reciever) => reciever.id === payment.reciever)?.name;
    }, [payment.reciever, paymentRecievers])
    
    const showDecimal = decimal != '0';

    return (
        <div
            className={classNames(
                'rounded-lg flex items-center',
            )}
        >
            <div className="flex-1">
                <h4 className="label">Betaling aan <strong>{ recieverName }</strong></h4>
                { !!payment.description && <p className="text-lg"><strong className="font-medium">{ payment.description }</strong></p>}
            </div>
            <div>
                { !payment.blank && <h4>
                    <span className="text-3xl"></span>
                        <span className="font-medium text-2xl">{integer}</span>
                        <span className="font-medium text-lg">
                            {showDecimal ? <>,{ decimal } </> : ' ' }
                            <span className="text-gray-400">EUR</span>
                        </span>
                </h4>}
            </div>
        </div>
    )
}

export default PaymentListCard;