import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ArticleLayout from '../../Layouts/ArticleLayout';
import queries from '../../graphql/queries';
import { RenderContent } from '../../components';

const BlogArticlePage = () => {
    const { slug } = useParams()
    const { data, loading } = useQuery(queries.NEWS_ITEM_BY_SLUG, {
        variables: {
            slug: 'blog/' + slug
        }
    })
    
    if (loading) return <>Loading</>
    
    const { NewsItem: { 
        name,
        content: { 
            body,
            descr_short,
            banner: {
                filename: banner
            }
        }
    }} = data
    
    return (
        <ArticleLayout
            title={ name }
            intro={ descr_short }
            banner={ banner }
        >
            <RenderContent content={ body } />
        </ArticleLayout>
    )
}

export default BlogArticlePage