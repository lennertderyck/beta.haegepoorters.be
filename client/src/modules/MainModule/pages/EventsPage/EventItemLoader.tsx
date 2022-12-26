import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const EventItemSkeleton: FC = () => {
    return (
        <div className="relative border-l-2 border-gray-400 border-opacity-40 pl-8 pb-8 last:pb-0">
            <span className="absolute left-0 translate-x-[-.45rem] bg-gray-400 block w-3 h-3 rounded-full" />
            
            <div className="mb-6">
                <Skeleton height="1rem" width="10rem" />
                <Skeleton height="1.6rem" width="15rem" />
            </div>
            <div>
                <Skeleton height="1rem" width="70%" />
                <Skeleton height="1rem" width="60%" />
            </div>
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