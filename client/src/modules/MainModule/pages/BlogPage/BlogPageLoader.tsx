import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { RenderTimes } from '../../../../components/basics';

const BlogPageSkeleton: FC = () => {
    return (
        <div className="border-b-2 border-gray-200 py-6 h-full">
            <Skeleton width="100%" height="10rem" className="mb-6" />
            <Skeleton width="8rem" />
            <Skeleton height="1.5rem" width="10rem" className="mb-3" />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
        </div>
    )
}

interface Props {};

const BlogPageLoader: FC<Props> = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RenderTimes>
                <div className="col-span-1 h-full">
                    <BlogPageSkeleton />
                </div>
            </RenderTimes>
        </div>
    )
}

export default BlogPageLoader;