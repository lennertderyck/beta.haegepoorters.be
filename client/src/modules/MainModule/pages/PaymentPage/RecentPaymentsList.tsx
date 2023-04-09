import { FC } from 'react';
import { Payment } from '../../../../types/payments';
import { Link } from 'react-router-dom';
import PaymentListCard from './PaymentListCard';
import classNames from 'classnames';

interface Props {
    payments: Payment[];
    activePayment?: Payment | undefined;
};

const RecentPaymentsList: FC<Props> = ({ payments, activePayment }) => {
    return (
        <>
            <h4 className="section-title mb-5">Recente betalingen</h4>
            <ul className="list">
                { payments.map((item) => (
                    <li key={ item.id } className={classNames('list__item px-4', item.id === activePayment?.id && 'bg-gray-100')}>
                        <Link to={ '/betalen/g/' + item.id}>
                            <PaymentListCard payment={ item } />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default RecentPaymentsList;