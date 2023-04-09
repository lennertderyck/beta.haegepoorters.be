import { FC } from 'react';
import ControlledForm, { ControlledFormProps } from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import { paymentRecievers } from '../../../../utils/data/payments';
import CustomAccountField from './CustomAccountField';
import AmountField from './AmountField';
import { Button } from '../../../../components/basics';

interface Props extends ControlledFormProps {
    isGenerated?: boolean;
    onCreateNew?: () => void;
};

const PaymentGenerateForm: FC<Props> = ({ isGenerated, onCreateNew, ...otherProps}) => {    
    return (
        <ControlledForm { ...otherProps }>
            <label className="mb-5">
                <span>Ontvanger *</span>
                <Input type="select" name="reciever">
                    {/* <optgroup label="Takken"> */}
                        { paymentRecievers.map((reciever) => (
                            <option value={ reciever.id } key={ reciever.id }>{ reciever.name }</option>
                        ))}
                    {/* </optgroup> */}
                    <option value="other">Andere rekening</option>
                </Input>
            </label>
            <CustomAccountField />
            <label className="mb-5">
                <span>Mededeling</span>
                <Input name="description" />
            </label>
            <label className="mb-5 !flex items-baseline gap-2">
                <div className="flex-1">
                    <Input type="checkbox" name="blank" />
                </div>
                <div>
                    <p>Betaler vult bedrag zelf in</p>
                    <p className="text-sm text-gray-400 mt-2">Het bedrag van de betaling wordt op €0 ingesteld. <br className="hidden md:inline" />De betaler past het bedrag na het scannen zelf aan in de app.</p>
                </div>
            </label>
            <AmountField />
            <div className="flex flex-col lg:flex-row items-center gap-4">
                <Button icon={ isGenerated ? 'arrow-right-down' : 'check' } type="submit">{ isGenerated ? 'Opnieuw genereren' : 'Genereer betaling' }</Button>
                { isGenerated && <Button theme="simple" type="button" icon="add" onClick={ onCreateNew }>Nieuwe betaling</Button>}
            </div>
        </ControlledForm>
    )
}

export default PaymentGenerateForm;