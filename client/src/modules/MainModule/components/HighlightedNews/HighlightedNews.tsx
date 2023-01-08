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
    
    useEffectOnce(() => {
        const f = async () => {
            const r = await fetch('https://api.storyblok.com/v2/cdn/stories?starts_with=haegeprekerke%2F&sort_by=first_published_at:desc&page=1&per_page=1&token=swBnDurWPN9tnVgAPXnGNwtt');
            console.log('TEST REQUEST');
            console.log(await r.json());
        }
    })
    
    return (
        <div className="card-group -mt-6">
            { data?.stories?.map((article) => (
                <NewsCard key={ article.id } article={ article } />
            ))}
        </div>
    )
}

export default HighlightedNews;