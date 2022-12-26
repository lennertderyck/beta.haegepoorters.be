import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useStoryblok } from '../../../../utils/hooks';
import { Page } from '../../../../types/content';
import { ContentRender } from '../../../../components/basics';

interface Props {};

const RequestBySlugPage: FC<Props> = () => {
    const location = useLocation();
    
    console.log(location.pathname);
    
    const [{ data, loading: pageLoading, error }] = useStoryblok<Page>('cdn/stories/pagina' + location.pathname);
    const pageData = data?.story;
    
    if (error) return <>Pagina niet gevonden</>
    else if (pageLoading) return <>Pagina laden</>
    else return (
        <div className="page">
            <div className="page__header">
                <h1 className="page__title">{ pageData?.name }</h1>
                <p className="-mt-4">Laatst aangepast, { pageData?.published_at }</p>
            </div>
            <div className="page__content">
                <ContentRender>{ pageData?.content.body }</ContentRender>
            </div>
        </div>
    )
}

export default RequestBySlugPage;