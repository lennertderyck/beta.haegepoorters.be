import { FC } from 'react';
import { Date } from '../../../../components/basics';
import { Activity, Event } from '../../../../types/content';
import dayjs from 'dayjs';
import classNames from 'classnames';
import useContentResolver from '../../../../utils/hooks/useContentResolver/useContentResolver';

interface Props {
    event: Event;
};

export const activityIsPassed = (date: string) => dayjs(dayjs()).isAfter(dayjs(date), 'day');

const EventItem: FC<Props> = ({ event }) => {
    const isPassed = activityIsPassed(event.start);
    
    return (
        <div className={classNames(
            'relative border-l-2 border-red-500 border-opacity-40 pl-8 pb-8 group-last:pb-0',
            isPassed && 'opacity-60'
        )}>
            <span className="absolute left-0 translate-x-[-.45rem] bg-red-500 block w-3 h-3 rounded-full" />
            <div className="-translate-y-1.5">
                <h5 className="text-red-500 font-serif text-xl">
                    <Date format="DD MMMM">{ event.start }</Date>
                    { event.multiple && <> tot <Date format="DD MMMM">{ event.end }</Date></>}
                </h5>
                <h4 className="mb-3 font-medium text-lg">{ event.title }</h4>
                <div className="content">
                    <p>{ event.description }</p>
                </div>
            </div>
        </div>
    )
}

export default EventItem;