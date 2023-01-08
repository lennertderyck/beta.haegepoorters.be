import { FC } from 'react';
import { RenderTimes } from '../../../../components/basics';
import Skeleton from 'react-loading-skeleton';

interface Props {};

const TeamPageLoader: FC<Props> = () => {
    return (
        <div className="page__content">
            <div className="mb-12">
                <Skeleton width="16rem" height="2.5rem" className="mb-2" />
            </div>
            <div className="card-group -mt-6 grid grid-cols-4 gap-6">
                <RenderTimes>
                    <div className="card col-span-4 md:col-span-2 lg:col-span-1">
                        <Skeleton width="100%" height="15rem" className="mb-6" />
                        <Skeleton width="12rem" height="1.5rem" className="mb-2" />
                        <Skeleton width="8rem" />
                    </div>
                </RenderTimes>
            </div>
        </div>
    )
}

export default TeamPageLoader;