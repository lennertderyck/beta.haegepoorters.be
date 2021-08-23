import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import QUERIES from '../../graphql/queries';
import PageLayout from '../../layouts/PageLayout';
import { Button, Container, RenderContent } from '../../components';
import ErrorPage from '../ErrorPage';

const BasePage = () => {
    const [ showIframe, setShowIframe ] = useState(false)
    const { slug } = useParams()
    const { data, loading, error } = useQuery(QUERIES.PAGE_BY_SLUG, {
        variables: { slug: 'pagina/' + slug }
    })
    
    console.log(slug);
    
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
            iframe
        },
    }} = data
    
    return (
        <>
            <PageLayout title={ title } banner={ filename } intro={ descr_short } date={ published_at }> 
                <RenderContent content={ body } />
                { (iframe && iframe.enabled) && <>
                    { !showIframe &&  <div className="bg-gray-100 p-6">
                        <h4 className="font-semibold mb-2 text-lg">Toestemming</h4>
                        <p className="font-serif text-lg leading-6 mb-2">Deze pagina bevat een geïntegreerde website en kan cookies van derden bevatten.<br /> Geef toestemming om deze website weer te geven</p>
                        <small>Website van <strong>{ new URL(iframe.source).host }</strong></small>
                        <Button 
                            theme="button" 
                            className="mt-4"
                            onClick={() => setShowIframe(true)}
                        >Website weergeven</Button>
                    </div> }
                    { showIframe && <iframe
                            className="w-full h-screen"
                            loading="lazy"
                            frameborder="0" 
                            allowfullscreen
                            src={ iframe.source }
                        />
                    }
                </>}
            </PageLayout>
        </>
    )
}

export default BasePage