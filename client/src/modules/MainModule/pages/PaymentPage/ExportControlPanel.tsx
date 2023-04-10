import { FC, useEffect, useMemo, useState } from 'react';
import { Button, ExpansionPane, Icon } from '../../../../components/basics';
import Input from '../../../../components/basics/Input/Input';
import PaymentListCard from './PaymentListCard';
import { Payment } from '../../../../types/payments';
import { useDocumentTitle } from '../../../../utils/hooks';

interface Props {
    payment: Payment | undefined;
    selectedReciever: any;
};

const ExportControlPanel: FC<Props> = ({ payment, selectedReciever }) => {
    const [ showPrefs, setShowPrefs ] = useState(false)
    
    const [, setTitle] = useDocumentTitle();
    
    const setSuffixedDocumentTitle = (title: string) => setTitle(title + '.pdf');
    
    const proposedTitle = useMemo<string>(() => {
        if (!!payment) return (`betaling_${ payment.amount }eur_${ selectedReciever?.name }`).replaceAll(' ', '_').toLowerCase();
        else return `betaling`;
    }, [payment, selectedReciever]);
    
    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSuffixedDocumentTitle(event.target.value);
    }
    
    useEffect(() => {
        if (!!payment) {
            setSuffixedDocumentTitle(proposedTitle + '.pdf');
        }
    }, [payment])

    return (
        <div className="print:hidden paper fixed bottom-12 right-12 min-w-[400px]">
            <div className="p-6 bg-gray-100 flex items-center justify-between gap-6">
                <div className="flex-1">
                    { payment && (
                        <PaymentListCard 
                            payment={ payment }
                        />
                    )}
                </div>
                <button onClick={() => setShowPrefs(s => !s)}>
                    <Icon name="file-settings" size="1.6rem" className="text-red-500" />
                </button>
            </div>
            <div className="p-6">
                <ExpansionPane active={ showPrefs }>
                    <div className="form mb-5 -mt-3">
                        <label className="block">
                            <span className="label">Bestandsnaam</span>
                            <Input name="documentTitle" defaultValue={ proposedTitle } onChange={ handleTitleChange } />
                        </label>
                    </div>
                </ExpansionPane>
                <div className="flex items-center divide-x-2 divide-gray-300">
                    <div className="pr-3">
                        <Button icon="printer" onClick={ window.print }>Afdrukken</Button>
                    </div>
                    <div className="pl-3">
                        <Button theme="simple" icon="pencil" to={`/betalen/g/${ payment?.id }`}>Betaling aanpassen</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportControlPanel;