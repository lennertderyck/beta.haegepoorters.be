import { FC, useMemo } from 'react';
import { Button, Date } from '../../../../components/basics';
import groups from '../../../../utils/data/groups';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useStoryblok } from '../../../../utils/hooks';
import { HaegeprekerekeContent } from '../../../../types/content';
import EventItem from './EventItem';
import EventItemLoader from './EventItemLoader';
import { StoryBlokResponse } from '../../../../utils/hooks/useStoryblok/useStoryblok.types';
import dayjs from 'dayjs';

interface Props {};

const EventsPage: FC<Props> = () => {
    const params = useParams<any>();
    const selectedGroup = useMemo(() => params.group || 'kap', [ params.group ])
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
    
    const activitiesToRender = useMemo(() => activities?.[selectedGroup as keyof typeof activities], [activities, selectedGroup]);
    const activitiesAvailable = useMemo(() => !eventsLoading && activitiesToRender?.length !== 0, [eventsLoading, activitiesToRender])
    
    return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">Haegeprekerke</h1>
                {/* <p>Onze weekelijkse activiteiten</p> */}
                
                <div className="flex flex-wrap gap-4">
                    { Object.entries(groups).map(([ abbr, group ]) => (
                        <Button key={ abbr } theme="simple" to={ '../' + abbr }>
                            <span className={classNames(selectedGroup === abbr && 'border-b-2 border-red-500 pb-1')}>{ group.name }</span>
                        </Button>
                    ))}
                </div>
            </div>
            
            <div className="page__content">
                { !activitiesAvailable && (
                    <p className="text-gray-400">
                        Geen activiteiten om weer te geven
                    </p>
                )}
                { eventsLoading ? <EventItemLoader /> : (
                    <ul className="ml-2">
                        { activitiesToRender?.map((activity) => {
                            const isPassed = dayjs(dayjs()).isAfter(dayjs(activity.period.start), 'day');
                            
                            return (
                                <li 
                                    className={classNames(
                                        'group', 
                                        isPassed && 'opacity-60',
                                    )}
                                >
                                    <EventItem key={ activity._uid } activity={ activity } />
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