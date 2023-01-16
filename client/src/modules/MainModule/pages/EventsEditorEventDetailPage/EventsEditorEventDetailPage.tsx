import { FC, useMemo } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../../utils/hooks';
import { EditionActivity } from '../../../../types/content';
import ControlledForm from '../../../../components/basics/ControlledForm/ControlledForm';
import Input from '../../../../components/basics/Input/Input';
import { useFormContext } from 'react-hook-form';
import { Button, ExpansionPane, Loader, MarkdownEditor } from '../../../../components/basics';
import TextArea from '../../../../components/basics/TextArea/TextArea';
import DateEditor from './DateEditor';
import DescriptionEditor from './DescriptionEditor';
import PreviewCard from './PreviewCard';
import dayjs from 'dayjs';
import useLazyAxios from '../../../../utils/hooks/useAxios/useLazyAxios';
import classNames from 'classnames';
import { Group } from '../../../../types/general';
import groups from '../../../../utils/data/groups';

interface Props {
    createNew?: boolean;
};

const EventsEditorEventDetailPage: FC<Props> = ({ createNew = false }) => {
    const navigate = useNavigate();
    const params = useParams<any>();
    const group = groups[params.group as keyof typeof groups];
    const { data: event, loading } = useAxios<EditionActivity>('http://localhost:4000/activities/' + params.event);
    const [ updateEvent, { loading: updatingEvent }] = useLazyAxios('http://localhost:4000/activities/' + params.event, {
        method: 'PATCH'
    });
    const [ createEvent, { loading: creatingEvent }] = useLazyAxios('http://localhost:4000/activities/', {
        method: 'POST',
        params: {
            group: group.airtableId,
            edition: params.edition,
        }
    });
    
    const handleResetAndCancel = () => {
        navigate('..', {
            relative: 'path'
        });
    }
        
    const handleEventSaving = async (data: any) => {
        console.log(data);
        const transformedData = {
            ...data,
            start: dayjs(data.start).format('YYYY-MM-DD'),
            end: data.multiple ? dayjs(data.end).format('YYYY-MM-DD') : undefined,
        };
                
        if (createNew) {
            await createEvent(transformedData);
        } else {
            await updateEvent(transformedData);
        }
        
        navigate('..', {
            relative: 'path'
        });
    }
    
    const defaultValues = useMemo<Partial<EditionActivity> | undefined>(() => {
        if (createNew) return {
            start: dayjs().format('YYYY-MM-DD'),
            multiple: false,
        }
        else return event;
    }, [createNew, event])
    
    if (loading && !createNew) return <>Loading</>
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">{ createNew ? 'Activiteit toevoegen' : `"${ event?.title }" bewerken` }</h1>
                {/* <p>Activiteit { createNew ? 'toevoegen' : 'bewerken' }</p> */}
            </div>
            <div className="page__content">
                <ControlledForm 
                    onSubmit={ handleEventSaving } 
                    className={classNames(
                        'flyover', 
                        (!createNew && loading) && 'flyover--active',
                        (updatingEvent || creatingEvent) && 'opacity-60 pointer-events-none')
                    }
                    defaultValues={defaultValues}
                >
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
                                <div className="flex items-center gap-3">
                                    <div>
                                        <Button type="submit" icon="check" iconPlacement="start">Opslaan</Button>
                                    </div>
                                    <div>
                                        <Button type="submit" theme="simple" name="new" disabled>Opslaan & nieuw</Button>
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
                </ControlledForm>
            </div>
        </div>
    )
}

export default EventsEditorEventDetailPage;