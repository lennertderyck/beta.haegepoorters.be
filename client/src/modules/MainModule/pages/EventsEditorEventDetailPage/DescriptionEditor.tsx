import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import TextArea from '../../../../components/basics/TextArea/TextArea';

interface Props {
    defaultValue: any;
};

const DescriptionEditor: FC<Props> = ({ defaultValue }) => {
    const formContext = useFormContext();
    
    const description = formContext.watch('description', defaultValue);
    
    return (
        <>
            <label>
                <span>Omschrijving</span>
                <TextArea name="description" defaultValue={ defaultValue } />
            </label>
        </>
    )
}

export default DescriptionEditor;