import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../../../../components/basics/Input/Input';
import { ExpansionPane } from '../../../../components/basics';

interface DateEditorProps {
    defaultValues?: any;
}

const DateEditor: FC<DateEditorProps> = ({ defaultValues }) => {
    const formContext = useFormContext();
    
    const multiple = formContext.watch('multiple', defaultValues?.multiple);
    
    return (
        <>
            <label className="col-span-1">
                <span>Startdatum</span>
                <Input type="date" name="start" required defaultValue={ defaultValues?.start } />
            </label>
            <ExpansionPane active={ multiple }>
                <label className="col-span-1 -my-2">
                    <span>Einddatum</span>
                    <Input type="date" name="end" required={ multiple as boolean } defaultValue={ defaultValues?.end } />
                </label>
            </ExpansionPane>
        </>
    )
}

export default DateEditor;