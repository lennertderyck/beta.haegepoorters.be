import { FC, useEffect } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { useOutletContext, useParams } from 'react-router-dom';
import { Edition, Event } from '../../../../types/content';
import { sortGroupEventsByDate } from '../../../../utils/funcs/algorithms/sorting';
import EventItem from '../EventsPage/EventItem';
import EventItemLoader from '../EventsPage/EventItemLoader';

interface Props {};

const EventsEditorEditonPage: FC<Props> = () => {
    const { selectedEditon } = useOutletContext<{ selectedEditon: Edition }>();
    const params = useParams<any>();
    const { data: activities, refetch, loading } = useAxios<Event[]>(process.env['REACT_APP_BACKEND_URL'] + '/activities', {
        params: {
            edition: params.edition,
            group: params.group
        }
    });
    
    useEffect(() => {
        refetch();
    }, [params.edition])
        
    return (
        <>
            { !selectedEditon?.editable && (
                <div className="p-6 rounded-lg bg-gray-100 text-sm mb-12">
                    Je kan deze editie (nog) niet bewerken
                </div>
            )}
            { activities?.length === 0 && <p className="text-stone-400">Geen activiteiten gevonden</p>}
            { loading ? (
                <EventItemLoader />
            ): (
                <ul className="list mt-6 ml-2">
                    { activities?.sort(sortGroupEventsByDate).map((activity) => (
                        <li className="group" key={ activity.id }>
                            <EventItem event={ activity } mode={ selectedEditon.editable ? 'editor' : 'editorPreview' } />
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default EventsEditorEditonPage;