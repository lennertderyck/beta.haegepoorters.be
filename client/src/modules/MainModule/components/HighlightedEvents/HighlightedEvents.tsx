import { FC, useMemo } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { HaegeprekerekeContent } from '../../../../types/content';
import EventCard from './EventCard';
import EventCardLoader from './EventCardLoader';

interface Props {};

const HighlightedEvents: FC<Props> = () => {
    const [{ data, loading: eventsLoading }] = useStoryblok<HaegeprekerekeContent>('cdn/stories', {
        'starts_with': 'haegeprekerke/',
        'sort_by': 'first_published_at:desc',
        'page': '1',
        'per_page': '1',
    });
    
    const activities = useMemo(() => {
        const kap = data?.stories?.[0]?.content.kap;
        const wel = data?.stories?.[0]?.content.wel;
        const wol = data?.stories?.[0]?.content.wol;
        const jgv = data?.stories?.[0]?.content.jgv;
        const giv = data?.stories?.[0]?.content.giv;
        
        return {
            kap, wel, wol, jgv, giv
        }
    }, [data?.stories?.[0].content]);
    
    if (eventsLoading) return <EventCardLoader />
    else return (
        <div className="card-group">
            <EventCard group="kap" activity={ activities?.kap?.[0] } />
            <EventCard group="wel" activity={ activities?.wel?.[0] } />
            <EventCard group="wol" activity={ activities?.wol?.[0] } />
            <EventCard group="jgv" activity={ activities?.jgv?.[0] } />
            <EventCard group="giv" activity={ activities?.giv?.[0] } />
        </div>
    )
}

export default HighlightedEvents;