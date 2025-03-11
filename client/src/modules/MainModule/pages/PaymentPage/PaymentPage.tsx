import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import usePaymentsStore from '../../../../state/stores/usePaymentsStore/usePaymentsStore';
import { GeneratedPayment } from '../../../../types/payments';
import PaymentGenerateForm from './PaymentGenerateForm';
import PaymentPreview from './PaymentPreview';
import RecentPaymentsList from './RecentPaymentsList';

interface Props {};

const PaymentPage: FC<Props> = () => {
    const params = useParams<any>();
    const navigate = useNavigate();
    
    const [ showPopover, setShowPopover ] = useState(false);
    
    const createPayment = usePaymentsStore((store) => store.create);
    const updatePayment = usePaymentsStore((store) => store.update);
    
    const payments = usePaymentsStore((store) => store.payments);
    const payment = payments.find((p) => p.id === params.paymentId);
    const recentPayments = usePaymentsStore((store) => store.payments.slice(0, 3));
    
    const formControls = useForm({ defaultValues: payment as any});
    
    const updateOrCreate = (data: GeneratedPayment) => {
        if (params.paymentId) return updatePayment(params.paymentId, data);
        else return createPayment(data);
    }
        
    const handleOnSubmit = (data: GeneratedPayment) => {
        setShowPopover(true);
        const generatedPayment = updateOrCreate(data);
        if (generatedPayment && !payment) {
            navigate('g/' + generatedPayment?.id);
        } else if (payment) {
            updateOrCreate(data);
        }
    }
    
    const handleCreateNew = () => {
        navigate('/betalen');
        setShowPopover(false);
        formControls.reset({}, { keepDefaultValues: false });
    }
    
    useEffect(() => {
        formControls.reset(payment);
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
                            remote={ formControls }
                            isGenerated={ !!payment }
                            onSubmit={ handleOnSubmit } 
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