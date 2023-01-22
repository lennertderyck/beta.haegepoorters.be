import { FC, useMemo } from 'react';
import { useAxios } from '../../../../utils/hooks';
import { Event } from '../../../../types/content';
import EventCard from './EventCard';
import EventCardLoader from './EventCardLoader';
import { sortGroupEventsByDate } from '../../../../utils/funcs/algorithms/sorting';
import { findFirstEventToDoByDate } from '../../../../utils/funcs/algorithms/filtering';
import dayjs from 'dayjs';

interface Props {};

const HighlightedEvents: FC<Props> = () => {
    const { data: events, loading: eventsLoading } = useAxios<Event[]>(process.env['REACT_APP_BACKEND_URL'] + '/timeline?edition=rectXxRJDT3524FYe');
        
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
    
        
    if (eventsLoading) return <EventCardLoader />
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