import { FC, useEffect } from 'react';
import { Button, Loader } from '../../../../components/basics';
import Input from '../../../../components/basics/Input/Input';
import DescriptionEditor from './DescriptionEditor';
import DateEditor from './DateEditor';
import { EditionActivity } from '../../../../types/content';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PreviewCard from './PreviewCard';
import { useEffectOnce } from '../../../../utils/hooks';
import { useFormContext } from 'react-hook-form';

interface Props {
    event: EditionActivity | undefined;
    createNew: boolean;
};

const FormContent: FC<Props> = ({ event, createNew }) => {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const formControls = useFormContext();
    
    const handleResetAndCancel = () => {
        navigate('..', {
            relative: 'path'
        });
    }
    
    useEffect(() => {
        if (createNew) {
            console.log('RESET')
            formControls.clearErrors();
            formControls.reset({
                title: '',
                multiple: false,
                start: null,
                end: null,
                description: '',
                saveAndCreate: !!searchParams.get('fromCreated') ? true : false,
            });
        }
    }, [createNew, searchParams.get('refferer')]); // reset form if reffered event id is changed
    
    return (
        <>
            <div className="flyover__bridge">
                <div className="mx-auto w-fit"><Loader /></div>
                <p className="text-center mt-3">Content inladen</p>
            </div>
            <div className="flyover__main grid grid-cols-12 lg:gap-24">
                <div className="col-span-12 lg:col-span-7">
                    <label className="mb-4">
                        <span>Titel</span>
                        <Input name="title" required />
                    </label>
                    <label className="mb-4 !flex gap-2 items-center">
                        <Input type="checkbox" name="multiple" />
                        <span>Meerdere dagen?</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <DateEditor />
                    </div>
                    <DescriptionEditor defaultValue={ event?.description } /> 
                    <div className="mt-4 flex flex-col lg:flex-row items-center justify-between gap-6">    
                        <div className="flex flex-col lg:flex-row items-center gap-3">
                            <div>
                                <Button type="submit" icon="check" iconPlacement="start">Opslaan</Button>
                            </div>
                            <div>
                                <label className="!flex gap-2 items-center">
                                    <Input type="checkbox" name="saveAndCreate" />
                                    <span>Opslaan & nieuw maken</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center divide-x-2 divide-gray-300">
                            <div className="pr-3">
                                <Button type="reset" theme="simple" onClick={ handleResetAndCancel }>Annuleren</Button>
                            </div>
                            <div className="pl-3">
                                <Button theme="simple" icon="delete-bin-6" disabled onClick={ handleResetAndCancel }>Verwijderen</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-5 hidden lg:block">
                    <div className="mb-6">
                        <PreviewCard defaultValues={event || {}} />
                    </div>
                </div>
            </div>
        </>
    )   
}

export default FormContent;