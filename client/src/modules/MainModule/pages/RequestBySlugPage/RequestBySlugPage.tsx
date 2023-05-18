import { FC, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useStoryblok } from '../../../../utils/hooks';
import { Page } from '../../../../types/content';
import { ContentRender, DateFrom, Img, ShareButton } from '../../../../components/basics';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoadingPage from '../LoadingPage/LoadingPage';

interface Props {};

const RequestBySlugPage: FC<Props> = () => {
    const location = useLocation();
    const correctedPath = useMemo(() => {
        if (location.pathname.startsWith('/pagina')) return location.pathname.replace('/pagina', '');
        else return location.pathname;
    }, [location.pathname]);
    const [{ data, loading: pageLoading, error }, request] = useStoryblok<Page>('cdn/stories/pagina' + correctedPath);
    const pageData = data?.story;
    
    useEffect(() => {
        request();
    }, [ location.pathname ]);
    
    if (error) return <NotFoundPage />
    else if (pageLoading || !pageData) return <LoadingPage />
    else return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">{ pageData.name }</h1>
                <p className="-mt-4">Laatst aangepast, <DateFrom ignoreSuffix>{ pageData.published_at }</DateFrom> geleden</p>
            </div>
            { pageData.content?.banner?.filename && (
                <Img src={ pageData.content?.banner?.filename } height="55vh" className="page__banner" />
            )}
            <div className="page__content">
                <ContentRender>{ pageData?.content.body }</ContentRender>
                <div className="mt-12">
                    <ShareButton />
                </div>
            </div>
        </div>
    )
}

export default RequestBySlugPage;