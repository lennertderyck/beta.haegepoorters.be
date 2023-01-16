import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAxios, useEffectOnce } from '../../../../utils/hooks';
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
import FormContent from './FormContent';

interface Props {
    createNew?: boolean;
};

const EventsEditorEventDetailPage: FC<Props> = ({ createNew = false }) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();
    const params = useParams<any>();
    const group = groups[params.group as keyof typeof groups];
    const { data: event, loading } = useAxios<EditionActivity>(process.env['REACT_APP_BACKEND_URL'] + '/activities/' + params.event);
    const [ updateEvent, { loading: updatingEvent }] = useLazyAxios(process.env['REACT_APP_BACKEND_URL'] + '/activities/' + params.event, {
        method: 'PATCH'
    });
    const [ createEvent, { loading: creatingEvent }] = useLazyAxios(process.env['REACT_APP_BACKEND_URL'] + '/activities/', {
        method: 'POST',
        params: {
            group: group.airtableId,
            edition: params.edition,
        }
    });
    
    const handleEventSaving = async ({ saveAndCreate, ...data }: any) => {
        let createdOrUpdated = null;
        const transformedData = {
            ...data,
            start: dayjs(data.start).format('YYYY-MM-DD'),
            end: data.multiple ? dayjs(data.end).format('YYYY-MM-DD') : undefined,
        };
                
        if (createNew) {
            createdOrUpdated = await createEvent(transformedData);
        } else {
            createdOrUpdated = await updateEvent(transformedData);
        }
                
        navigate(saveAndCreate ? '../new?fromCreated=true&refferer=' + createdOrUpdated.id : '..', {
            relative: 'path'
        });
    };
    
    const defaultValues = useMemo<Partial<EditionActivity> | undefined>(() => {
        if (createNew) return {
            start: dayjs().format('YYYY-MM-DD'),
            multiple: false,
        }
        else if (event) return {
            title: event.title,
            multiple: event.multiple,
            start: event.start,
            end: event.end,
            description: event.description,
        }
        else return {}
    }, [createNew, event]);
        
    if (loading && !createNew) return <>Loading</>
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">{ createNew ? 'Activiteit toevoegen' : `"${ event?.title }" bewerken` }</h1>
                {/* <p>Activiteit { createNew ? 'toevoegen' : 'bewerken' }</p> */}
            </div>
            <div className="page__content">
                <ControlledForm 
                    ref={ formRef }
                    onSubmit={ handleEventSaving } 
                    className={classNames(
                        'flyover', 
                        (!createNew && loading) && 'flyover--active',
                        (updatingEvent || creatingEvent) && 'opacity-60 pointer-events-none')
                    }
                    defaultValues={defaultValues}
                >
                    <FormContent event={ event } createNew={ createNew } />
                </ControlledForm>
            </div>
        </div>
    )
}

export default EventsEditorEventDetailPage;