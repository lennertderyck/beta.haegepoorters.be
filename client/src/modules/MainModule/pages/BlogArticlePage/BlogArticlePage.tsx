import { FC } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { BlogArticle } from '../../../../types/content';
import { useParams } from 'react-router-dom';
import { Button, ContentRender } from '../../../../components/basics';

interface Props {};

const BlogArticlePage: FC<Props> = () => {
    const params = useParams();
    const [{ data, loading: articleLoading }] = useStoryblok<BlogArticle>('cdn/stories/blog/' + params.slug as string);

    const article = data?.story;
    
    return (
        <div className="page">
            <div className="page__header">
                <Button to=".." icon="arrow-left" iconPlacement="start">Meer berichten</Button>
                <h1 className="page__title mt-12">{ article?.name }</h1>
                <h2 className="text-lg font-medium text-gray-600 mt-12 mb-6">{ article?.content.descr_short }</h2>
            </div>
            <ContentRender>{ article?.content.body }</ContentRender>
        </div>
    )
}

export default BlogArticlePage;