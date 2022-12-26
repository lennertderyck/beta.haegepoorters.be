import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RenderTimes } from '../../../../components/basics';

const EventCardSkeleton: FC<Props> = () => {
    return (
        <div className="flex items-center py-4 px-6 bg-gray-50 border-b-2 border-gray-200">
            <div className="mr-6">
                <Skeleton height="2rem" width="2rem" />
                <Skeleton height=".75rem" />
            </div>
            <div className="w-full">
                <div className="max-w-96">
                    <Skeleton height="1.5rem" width="15rem" />
                    <Skeleton width="60%" />
                </div>
            </div>
        </div>
    )
}

interface Props {};

const EventCardLoader: FC<Props> = () => {
    return (
        <RenderTimes>
            <EventCardSkeleton />
        </RenderTimes>
    )
}

export default EventCardLoader;