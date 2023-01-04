import { FC } from 'react';
import { Date } from '../../../../components/basics';
import { Activity } from '../../../../types/content';
import dayjs from 'dayjs';
import classNames from 'classnames';
import useContentResolver from '../../../../utils/hooks/useContentResolver/useContentResolver';

interface Props {
    activity: Activity
};

export const activityIsPassed = (date: string) => dayjs(dayjs()).isAfter(dayjs(date), 'day');

const EventItem: FC<Props> = ({ activity }) => {
    const content = useContentResolver(activity.descr);
    const isPassed = activityIsPassed(activity.period.start)
    
    return (
        <div className={classNames(
            'relative border-l-2 border-red-500 border-opacity-40 pl-8 pb-8 group-last:pb-0',
            isPassed && 'opacity-60'
        )}>
            <span className="absolute left-0 translate-x-[-.45rem] bg-red-500 block w-3 h-3 rounded-full" />
            <div className="-translate-y-1.5">
                <h5 className="text-red-500 font-serif text-xl">
                    <Date format="DD MMMM">{ activity.period.start }</Date>
                    { activity.period.multiple && <> tot <Date format="DD MMMM">{ activity.period.end }</Date></>}
                </h5>
                <h4 className="mb-3 font-medium text-lg">{ activity.title }</h4>
                <div className="content">
                    <content.Parsed />
                </div>
            </div>
        </div>
    )
}

export default EventItem;