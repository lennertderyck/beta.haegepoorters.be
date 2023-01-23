import { FC, useMemo } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { Event } from '../../../../types/content';
import EventCard from './EventCard';
import EventCardLoader from './EventCardLoader';
import { sortGroupEventsByDate } from '../../../../utils/funcs/algorithms/sorting';
import { findFirstEventToDoByDate } from '../../../../utils/funcs/algorithms/filtering';
import dayjs from 'dayjs';
import { Button, Icon } from '../../../../components/basics';

interface Props {};

const HighlightedEvents: FC<Props> = () => {
    const { data: events, loading: eventsLoading, error: eventsLoadingError, refetch: refetchEvents } = useAxios<Event[]>(process.env['REACT_APP_BACKEND_URL'] + '/timeline?edition=rectXxRJDT3524FYe');
        
    const groupedEvents = useMemo(() => {
        const kap = events?.filter((event) => event.group_shortcodes.includes('kap')).sort(sortGroupEventsByDate).find(findFirstEventToDoByDate);
        const wel = events?.filter((event) => event.group_shortcodes.includes('wel')).sort(sortGroupEventsByDate).find(findFirstEventToDoByDate);
        const wol = events?.filter((event) => event.group_shortcodes.includes('wol')).sort(sortGroupEventsByDate).find(findFirstEventToDoByDate);
        const jgv = events?.filter((event) => event.group_shortcodes.includes('jgv')).sort(sortGroupEventsByDate).find(findFirstEventToDoByDate);
        const giv = events?.filter((event) => event.group_shortcodes.includes('giv')).sort(sortGroupEventsByDate).find(findFirstEventToDoByDate);
        
        return {
            kap, wel, wol, jgv, giv
        }
    }, [events])
    
    if (eventsLoadingError) return (
        <div className="flyover flyover--active">
            <div className="flyover__bridge">
                <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-5">
                    <Icon name="flashlight" className="" size="1.6rem" />
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:border-r-2 border-gray-300 lg:pr-6 lg:mr-6">
                            <h3 className="font-serif text-xl text-center lg:text-left">Hier ging iets fout</h3>
                            <p className="whitespace-nowrap text-sm text-center lg:text-left text-gray-400">We konden dit niet laden</p>
                        </div>
                        <Button theme="simple" icon="restart" className="mt-5 lg:mt-0" onClick={() => refetchEvents()}>Opnieuw proberen</Button>
                    </div>
                </div>
            </div>
            <div className="flyover__main">
                <EventCardLoader />
            </div>
        </div>
    )
    else if (eventsLoading) return <EventCardLoader />
    else return (
        <div className="card-group">
            <EventCard group="kap" event={ groupedEvents.kap } />
            <EventCard group="wel" event={ groupedEvents.wel } />
            <EventCard group="wol" event={ groupedEvents.wol } />
            <EventCard group="jgv" event={ groupedEvents.jgv } />
            <EventCard group="giv" event={ groupedEvents.giv } />
        </div>
    )
}

export default HighlightedEvents;