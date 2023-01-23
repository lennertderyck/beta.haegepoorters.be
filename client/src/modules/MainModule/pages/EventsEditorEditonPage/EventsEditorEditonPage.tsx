import { FC, useEffect } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { useParams } from 'react-router-dom';
import { Event } from '../../../../types/content';
import { sortGroupEventsByDate } from '../../../../utils/funcs/algorithms/sorting';
import EventItem from '../EventsPage/EventItem';
import EventItemLoader from '../EventsPage/EventItemLoader';

interface Props {};

const EventsEditorEditonPage: FC<Props> = () => {
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
            { activities?.length === 0 && <p className="text-stone-400">Geen activiteiten gevonden</p>}
            { loading ? (
                <EventItemLoader />
            ): (
                <ul className="list mt-6 ml-2">
                    { activities?.sort(sortGroupEventsByDate).map((activity) => (
                        <li className="group" key={ activity.id }>
                            <EventItem event={ activity } mode="editor" />
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default EventsEditorEditonPage;