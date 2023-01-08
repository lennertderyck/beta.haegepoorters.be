import { FC } from 'react';
import { BlogArticle } from '../../../../types/content';
import { useEffectOnce, useStoryblok } from '../../../../utils/hooks';
import NewsCard from './NewsCard';

interface Props {};

const HighlightedNews: FC<Props> = () => {
    const [{ data, loading: articlesLoading }] = useStoryblok<BlogArticle>('cdn/stories', {
        'starts_with': 'blog/',
        'sort_by': 'published_at:desc',
        'per_page': 3
    });
    
    return (
        <div className="card-group -mt-6">
            { data?.stories?.map((article) => (
                <NewsCard key={ article.id } article={ article } />
            ))}
        </div>
    )
}

export default HighlightedNews;