import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStoryblok } from '../../../../utils/hooks';
import { Page } from '../../../../types/content';
import { ContentRender, Img, ShareButton } from '../../../../components/basics';

interface Props {};

const RequestBySlugPage: FC<Props> = () => {
    const location = useLocation();
    const [{ data, loading: pageLoading, error }, request] = useStoryblok<Page>('cdn/stories/pagina' + location.pathname);
    const pageData = data?.story;
    
    useEffect(() => {
        request();
    }, [ location.pathname ]);
    
    if (error) return <>Pagina niet gevonden</>
    else if (pageLoading || !pageData) return <>Pagina laden</>
    else return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">{ pageData.name }</h1>
                <p className="-mt-4">Laatst aangepast, { pageData.published_at }</p>
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