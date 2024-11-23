import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { ActivityReponse } from '../../../modules/MainModule/requests/events/queries';
import EventListItem from '../../elements/EventListItem/EventListItem';

interface Props {};

const EventsTimelineGroupPage: FC<Props> = () => {
  const params = useParams<any>();
  const selectedActivityDate = useMemo(() => params.activityId || null, [ params.activityId ]);
  const outletContext = useOutletContext<{ events: ActivityReponse[] | undefined}>();
  const events = (outletContext?.events || []).sort((a, b) => dayjs(a.startDate).isBefore(dayjs(b.startDate)) ? -1 : 1);
  
  const bindActivityScrollToValidator = (event: ActivityReponse) => (ref: HTMLDivElement) => {
    const isSelected = dayjs(selectedActivityDate).isSame(event.startDate, 'date');
    if (isSelected && ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
        
  return (
    <div>
      { events.length === 0 && (
        <p className="text-gray-400">Geen activiteiten om weer te geven</p>
      )}
      {events.map((event) => {
        const isPassed = dayjs(dayjs()).isAfter(dayjs(event.startDate), 'day');
        
        return (
          <div
            key={ event._id }
            className={classNames(
              isPassed && 'opacity-60',
            )}
            ref={bindActivityScrollToValidator(event)}
          ><EventListItem event={ event }/></div>
        )
      })}
    </div>
  )
}

export default EventsTimelineGroupPage;