import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCardLoader from '../../../modules/MainModule/components/HighlightedEvents/EventCardLoader';
import { getUpcomingActivitiesQuery } from '../../../modules/MainModule/requests/events/queries';
import { Button, Date, ExpansionPane } from '../../basics';

interface Props {};

const UpcomingActivitiesPreview: FC<Props> = () => {
  const navigate = useNavigate();
  const [focusedActivity, setFocusedActivity] = useState<null | string>(null);
  const query = useQuery(getUpcomingActivitiesQuery);
  
  const handleActivityClick = (groupId: string, eventId: string) => {
    if (focusedActivity === groupId) navigate(`/haegeprekerke/${groupId}/activities/${eventId}`);
    else setFocusedActivity(groupId);
  }
    
  const timelines = query.data?.timelineForGroups.filter(timeline => !!timeline.upcomingActivity);
  
  if (query.isLoading) return <EventCardLoader />
  return (
    <div>
      {timelines?.map((timeline) => {
        const group = timeline.group;
        const event = timeline.upcomingActivity;
        
        return (
          <div 
            key={group._id} 
            className="flex flex-row py-4 px-6 gap-6 border-b-2 cursor-pointer bg-gray-50" 
            onClick={() => handleActivityClick(group.abbr, dayjs(event.startDate).format('YYYY-MM-DD'))}
          >
            <div>
              <span className="font-bold text-3xl text-gray-400"><Date format="DD">{ event.startDate }</Date></span>
              <div className="text-center font-serif uppercase text-gray-400 leading-[.5rem]"><Date format="MMM">{ event.startDate }</Date></div>
            </div>
            <div>
              <h5 className="label">{ group.name }</h5>
              <h4 className="font-semibold text-xl">{ event.title }</h4>
              {!!event.body && (
                <ExpansionPane active={focusedActivity === group.abbr}>
                  <p className="mt-2">{ event.body }</p>
                </ExpansionPane>
              )}
              <ExpansionPane active={focusedActivity === group.abbr}>
                <Button theme="simple" className="mt-2" to={`/haegeprekerke/${group.abbr}`} icon="arrow-right">Meer lezen</Button>
              </ExpansionPane>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UpcomingActivitiesPreview;