import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface Props {};

const PaymentExportPreviewPage: FC<Props> = () => {
    const params = useParams();
    
    return (
        <div>
            <iframe src={`/betalen/g/${params.paymentId}/export`} />
        </div>
    )
}

export default PaymentExportPreviewPage;