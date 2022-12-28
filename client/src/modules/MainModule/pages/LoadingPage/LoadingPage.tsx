import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

interface Props {};

const LoadingPage: FC<Props> = () => {
    return (
        <div className="page">
            <div className="page__header">
                <Skeleton height="2.5rem" width="17rem" className="mb-1" />
                <Skeleton height="1.2rem" width="14rem" />
            </div>
            <div className="page__banner">
                <Skeleton height="55vh" width="100%" className="max-h-96" />
            </div>
            <div className="page__content">
                <Skeleton height="1.2rem" width="80%" />
                <Skeleton height="1.2rem" width="60%" />
            </div>
        </div>
    )
}

export default LoadingPage;