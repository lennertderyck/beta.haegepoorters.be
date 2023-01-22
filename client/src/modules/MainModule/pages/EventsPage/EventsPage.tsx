import { FC, useMemo } from 'react';
import { Button, Date } from '../../../../components/basics';
import groups from '../../../../utils/data/groups';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../../../utils/hooks';
import { Event } from '../../../../types/content';
import EventItem from './EventItem';
import EventItemLoader from './EventItemLoader';
import dayjs from 'dayjs';
import { sortGroupEventsByDate } from '../../../../utils/funcs/algorithms/sorting';

interface Props {};

const EventsPage: FC<Props> = () => {
    const params = useParams<any>();
    const selectedGroup = useMemo(() => params.group || 'kap', [ params.group ])
    const { data: events, loading: eventsLoading, error: eventsLoadingError, refetch: refetchEvents } = useAxios<Event[]>(process.env['REACT_APP_BACKEND_URL'] + '/timeline?edition=rectXxRJDT3524FYe');
    
    const groupedEvents = useMemo(() => {
        const kap = events?.filter((event) => event.group_shortcodes.includes('kap')).sort(sortGroupEventsByDate);
        const wel = events?.filter((event) => event.group_shortcodes.includes('wel')).sort(sortGroupEventsByDate);
        const wol = events?.filter((event) => event.group_shortcodes.includes('wol')).sort(sortGroupEventsByDate);
        const jgv = events?.filter((event) => event.group_shortcodes.includes('jgv')).sort(sortGroupEventsByDate);
        const giv = events?.filter((event) => event.group_shortcodes.includes('giv')).sort(sortGroupEventsByDate);
        
        return {
            kap, wel, wol, jgv, giv
        };
    }, [events]);
        
    const eventsToRender = useMemo(() => groupedEvents?.[selectedGroup as keyof typeof groupedEvents], [groupedEvents, selectedGroup]);
    const eventsAvailable = useMemo(() => eventsToRender?.length !== 0, [eventsToRender]);
        
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Haegeprekerke</h1>
                
                <div className="flex flex-wrap gap-4">
                    { Object.entries(groups).map(([ abbr, group ]) => (
                        <Button key={ abbr } theme="simple" to={ '../' + abbr }>
                            <span className={classNames(selectedGroup === abbr && 'border-b-2 border-red-500 pb-1')}>{ group.name }</span>
                        </Button>
                    ))}
                </div>
            </div>
            
            <div className="page__content">
                { !eventsLoading && !eventsAvailable && (
                    <p className="text-gray-400">
                        Geen activiteiten om weer te geven
                    </p>
                )}
                { eventsLoadingError && (
                    <div className="flex items-center justify-between p-6 rounded-lg bg-gray-50">
                        <p>
                            Er ging iets mis bij het laden
                        </p>
                        <Button theme="simple" icon="restart" onClick={() => refetchEvents()}>Opnieuw proberen</Button>
                    </div>
                )}
                { eventsLoading ? <EventItemLoader /> : (
                    <ul className="ml-2">
                        { eventsToRender?.map((event) => {
                            const isPassed = dayjs(dayjs()).isAfter(dayjs(event.start), 'day');
                            
                            return (
                                <li 
                                    key={ event.id }
                                    className={classNames(
                                        'group', 
                                        isPassed && 'opacity-60',
                                    )}
                                >
                                    <EventItem key={ event.id } event={ event }/>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default EventsPage;