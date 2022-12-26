import { FC, useMemo } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { HaegeprekerekeContent } from '../../../../types/content';

interface Props {};

const HighlightedEvents: FC<Props> = () => {
    const [{ data }] = useStoryblok<HaegeprekerekeContent>('cdn/stories', {
        'starts_with': 'haegeprekerke/',
        'sort_by': 'first_published_at:desc',
        'page': '1',
        'per_page': '1',
    });
    
    const activities = useMemo(() => {
        const kap = data?.[0]?.content.kap;
        const wel = data?.[0]?.content.wel;
        const wol = data?.[0]?.content.wol;
        const jgv = data?.[0]?.content.jgv;
        const giv = data?.[0]?.content.giv;
        
        return {
            kap, wel, wol, jgv, giv
        }
    }, [data?.[0].content]);
    
    
    return (
        <div className="card-group">
            Activiteiten
        </div>
    )
}

export default HighlightedEvents;