import classNames from 'classnames';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

interface EventItemSkeletonProps {
    contentPreview?: boolean;
    animated?: boolean;
    blur?: boolean;
}

export const EventItemSkeleton: FC<EventItemSkeletonProps> = ({ contentPreview = true, animated = true, blur }) => {
    return (
        <div className="relative border-l-2 border-gray-400 border-opacity-40 pl-8 pb-8 last:pb-0">
            <span className="absolute left-0 translate-x-[-.45rem] bg-gray-400 block w-3 h-3 rounded-full" />
            
            <div className={classNames(blur && 'blur-sm')}>
                <Skeleton enableAnimation={ animated } height="1rem" width="10rem" />
                <Skeleton enableAnimation={ animated } height="1.6rem" width="15rem" />
            </div>
            { contentPreview && (
                <div className={classNames('mt-6', blur && 'blur-sm')}>
                    <Skeleton enableAnimation={ animated }  height="1rem" width="70%" />
                    <Skeleton enableAnimation={ animated } height="1rem" width="60%" />
                </div>
            )}
        </div>
    )
}

const EventItemLoader: FC = () => {
    return (
        <ul className="ml-2">
            <EventItemSkeleton />
            <EventItemSkeleton />
            <EventItemSkeleton />
        </ul>
    )
}

export default EventItemLoader;