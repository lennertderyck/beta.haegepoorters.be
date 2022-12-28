import { FC } from 'react';
import { useStoryblok } from '../../../../utils/hooks';
import { BlogArticle } from '../../../../types/content';
import BlogPageLoader from './BlogPageLoader';
import BlogArticleItem from './BlogArticleItem';
import { ShareButton } from '../../../../components/basics';

interface Props {};

const BlogPage: FC<Props> = () => {
    const [{ data, loading: articlesLoading }] = useStoryblok<BlogArticle>('cdn/stories', {
        'starts_with': 'blog/',
        'sort_by': 'published_at:desc',
    });
    
    return (
        <div className="page page--wide">
            <div className="page__header">
                <h1 className="page__title">Nieuws & blog</h1>
                <p>Het reilen en zeilen binnen onze scouts</p>
            </div>
            <div className="page__content">
                { articlesLoading ? <BlogPageLoader /> : (
                    <div className="card-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        { data?.stories?.map((article) => (
                            <BlogArticleItem article={ article } />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogPage;