import { FC } from 'react';
import Input from '../../../../components/basics/Input/Input';
import { useFormContext } from 'react-hook-form';
import { ExpansionPane } from '../../../../components/basics';

interface Props {};

const CustomAccountField: FC<Props> = () => {
    const { watch } = useFormContext();
    const reciever = watch('reciever');
    const isCustomerReciever = reciever === 'other';
    
    return (
        <ExpansionPane active={ isCustomerReciever }>
            <div className="-my-2">
                <label className="mb-5">
                    <span>Ander rekeningnummer *</span>
                    <Input name="customAccount" required={ isCustomerReciever } />
                </label>
                <label className="mb-5">
                    <span>Begunstigde</span>
                    <Input name="customReciever"/>
                </label>
            </div>
        </ExpansionPane>
    )
}

export default CustomAccountField;