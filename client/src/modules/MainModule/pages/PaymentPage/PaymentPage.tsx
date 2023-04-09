import { FC, useEffect, useState } from 'react';
import PaymentGenerateForm from './PaymentGenerateForm';
import { GeneratedPayment } from '../../../../types/payments';
import usePaymentsStore from '../../../../state/stores/usePaymentsStore/usePaymentsStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import RecentPaymentsList from './RecentPaymentsList';
import PaymentPreview from './PaymentPreview';

interface Props {};

const PaymentPage: FC<Props> = () => {
    const [ showPopover, setShowPopover ] = useState(false);
    const params = useParams<any>();
    const navigate = useNavigate();
    const updateOrCreate = usePaymentsStore((store) => (details: GeneratedPayment) => params['paymentId'] ? store.update(params['paymentId'], details) : store.create(details));
    const payment = usePaymentsStore((store) => params['paymentId'] ? store.findById(params['paymentId']) : undefined);
    const recentPayments = usePaymentsStore((store) => store.payments.slice(0, 3));
    const controls = useForm({ defaultValues: payment as any});
        
    const handleOnSubmit = (data: GeneratedPayment) => {
        setShowPopover(true);
        const generatedPayment = updateOrCreate(data);
        if (generatedPayment && !payment) {
            navigate('g/' + generatedPayment?.id);
        } else if (payment) {
            handleChange(data);
        }
    }
    
    const handleChange = (data: GeneratedPayment) => {
        updateOrCreate(data);
    }
    
    const handleCreateNew = () => {
        navigate('/betalen');
        controls.reset({}, { keepDefaultValues: false });
    }
    
    useEffect(() => {
        controls.reset(payment);
    }, [payment]);
        
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">Betaling { payment ? 'bewerken' : 'aanmaken' }</h1>
            </div>
            <div className="page__content">
                <div className="grid grid-cols-12 lg:gap-x-24">
                    <div className="col-span-12 lg:col-span-6">
                        <h4 className="section-title mb-5">Betaling gegevens</h4>
                        <PaymentGenerateForm 
                            remote={ controls }
                            isGenerated={ !!payment }
                            onSubmit={ handleOnSubmit } 
                            onChange={ handleChange }
                            onCreateNew={ handleCreateNew } 
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <div>
                            <PaymentPreview payment={ payment } showPopover={ showPopover } onClose={() => setShowPopover(false)} />
                            <div className="mt-10">
                                <RecentPaymentsList payments={ recentPayments } activePayment={ payment } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage;