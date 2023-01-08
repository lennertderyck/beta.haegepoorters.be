import { FC, useMemo } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { HaegeprekerekeContent } from '../../../../types/content';
import EventCard from './EventCard';
import EventCardLoader from './EventCardLoader';
import { sortGroupActivitiesByDate } from '../../../../utils/funcs/algorithms/sorting';
import dayjs from 'dayjs';
import { findFirstActivityToDoByDate } from '../../../../utils/funcs/algorithms/filtering';

interface Props {};

const HighlightedEvents: FC<Props> = () => {
    const [{ data, loading: eventsLoading, error }] = useStoryblok<HaegeprekerekeContent>('cdn/stories', {
        'starts_with': 'haegeprekerke/',
        'sort_by': 'first_published_at:desc',
        'page': '1',
        'per_page': '1',
    });
    
    console.log('HighlightedEvents', error)
    
    const activities = useMemo(() => {
        const kap = data?.stories?.[0]?.content.kap.sort(sortGroupActivitiesByDate).find(findFirstActivityToDoByDate);
        const wel = data?.stories?.[0]?.content.wel.sort(sortGroupActivitiesByDate).find(findFirstActivityToDoByDate);
        const wol = data?.stories?.[0]?.content.wol.sort(sortGroupActivitiesByDate).find(findFirstActivityToDoByDate);
        const jgv = data?.stories?.[0]?.content.jgv.sort(sortGroupActivitiesByDate).find(findFirstActivityToDoByDate);
        const giv = data?.stories?.[0]?.content.giv.sort(sortGroupActivitiesByDate).find(findFirstActivityToDoByDate);
        
        return {
            kap, wel, wol, jgv, giv
        }
    }, [data?.stories?.[0].content]);
        
    if (eventsLoading) return <EventCardLoader />
    else return (
        <div className="card-group">
            <EventCard group="kap" activity={ activities?.kap } />
            <EventCard group="wel" activity={ activities?.wel } />
            <EventCard group="wol" activity={ activities?.wol } />
            <EventCard group="jgv" activity={ activities?.jgv } />
            <EventCard group="giv" activity={ activities?.giv } />
        </div>
    )
}

export default HighlightedEvents;