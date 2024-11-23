import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import EventItemLoader from '../../../modules/MainModule/pages/EventsPage/EventItemLoader';
import { getActivitiesTimelinesQuery } from '../../../modules/MainModule/requests/events/queries';
import { EVENTS_VIEW_MAX, EVENTS_VIEW_MIN } from '../../../utils/data/events';
import groups from '../../../utils/data/groups';
import { Button } from '../../basics';

interface Props {};

const EventsTimelineRootPage: FC<Props> = () => {
  const params = useParams<any>();
  const selectedGroup = useMemo(() => params.group || 'kap', [ params.group ]);
  const eventsQuery = useQuery(getActivitiesTimelinesQuery({
    startDate: EVENTS_VIEW_MIN,
    endDate: EVENTS_VIEW_MAX,
  }));
  
  const eventsToRender = useMemo(() => eventsQuery.data?.timelineForGroups.find((group) => group.group.abbr === selectedGroup)?.upcomingActivities, [eventsQuery.data, selectedGroup]);
    
  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Haegeprekerke</h1>
        <p>Activiteiten van {dayjs(EVENTS_VIEW_MIN).format('D MMMM')} tot {dayjs(EVENTS_VIEW_MAX).format('D MMMM')}</p>
        <div className="flex flex-wrap gap-4 mt-8">
          { Object.entries(groups).map(([ abbr, group ]) => (
            <Button key={ abbr } theme="simple" to={ '../' + abbr }>
              <span className={classNames(selectedGroup === abbr && 'border-b-2 border-red-500 pb-1')}>{ group.name }</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="page__content">
        { eventsQuery.isError && (
          <div className="flex items-center justify-between p-6 rounded-lg bg-gray-50">
            <p>Er ging iets mis bij het laden</p>
            <Button theme="simple" icon="restart" onClick={() => eventsQuery.refetch()}>Opnieuw proberen</Button>
          </div>
        )}
        { eventsQuery.isLoading && (
          <EventItemLoader />
        )}
        {eventsQuery.isSuccess && <Outlet context={{ events: eventsToRender }} />}
      </div>
    </div>
  )
}

export default EventsTimelineRootPage;