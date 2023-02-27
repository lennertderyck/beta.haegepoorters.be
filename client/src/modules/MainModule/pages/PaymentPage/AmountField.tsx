import { FC } from 'react';
import Input from '../../../../components/basics/Input/Input';
import { useFormContext } from 'react-hook-form';
import { ExpansionPane } from '../../../../components/basics';

interface Props {};

const AmountField: FC<Props> = () => {
    const { watch } = useFormContext();
    const isBlank = watch('blank');
    
    return (
        <ExpansionPane active={ !isBlank }>
            <label className="mb-5 -my-2">
                <span>Bedrag *</span>
                <Input name="amount" type="number" defaultValue={ 0 } required={ !isBlank } min={0} step={0.01}/>
            </label>
        </ExpansionPane>
    )
}

export default AmountField;