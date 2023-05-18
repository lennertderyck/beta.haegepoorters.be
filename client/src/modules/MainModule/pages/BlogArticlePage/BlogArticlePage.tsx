import { FC } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { BlogArticle } from '../../../../types/content';
import { useParams } from 'react-router-dom';
import { Button, ContentRender, DateFrom, Img, ShareButton } from '../../../../components/basics';
import LoadingPage from '../LoadingPage/LoadingPage';

interface Props {};

const BlogArticlePage: FC<Props> = () => {
    const params = useParams();
    const [{ data, loading: articleLoading, error }] = useStoryblok<BlogArticle>('cdn/stories/blog/' + params.slug as string);

    const article = data?.story;
    
    if (error) return <>Er ging iets fout bij het laden.</>
    else if (articleLoading) return <LoadingPage />
    return (
        <div className="page">
            <div className="page__header">
                <Button to=".." icon="arrow-left" iconPlacement="start">Meer berichten</Button>
                <h1 className="page__title mt-12">{ article?.name }</h1>
                <p className="-mt-4">Laatst aangepast, <DateFrom ignoreSuffix>{ article?.published_at }</DateFrom> geleden</p>
            </div>
            { article?.content?.banner?.filename && (
                <Img src={ article.content?.banner?.filename } height="55vh" className="page__banner" />
            )}
            <div className="page__content">
                <h2 className="text-lg font-medium text-gray-600 mt-12 mb-6">{ article?.content.descr_short }</h2>
                <ContentRender>{ article?.content.body }</ContentRender>
                <div className="mt-12">
                    <ShareButton />
                </div>
            </div>
        </div>
    )
}

export default BlogArticlePage;