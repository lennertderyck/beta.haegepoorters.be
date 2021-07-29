import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import QUERIES from '../../graphql/queries';
import PageLayout from '../../Layouts/PageLayout';
import { RenderContent } from '../../components';
import ErrorPage from '../ErrorPage';

const BasePage = () => {
    const { slug } = useParams()
    const { data, loading, error } = useQuery(QUERIES.PAGE_BY_SLUG, {
        variables: { slug: 'pages/' + slug }
    })
    
    if (loading) return <PageLayout loading />
    if (error || !data.PageItem) return <ErrorPage />
    
    const { PageItem: { 
        name: title, 
        published_at,
        content: { 
            descr_short, 
            body, 
            banner: { 
                filename 
            },
        },
    }} = data
    
    return (
        <PageLayout title={ title } banner={ filename } intro={ descr_short } date={ published_at }> 
            <RenderContent content={ body } />
        </PageLayout>
    )
}

export default BasePage