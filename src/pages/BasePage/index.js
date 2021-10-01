import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';

import QUERIES from '../../graphql/queries';
import PageLayout from '../../layouts/PageLayout';
import { Button, CenterMessage, RenderContent, ShareService } from '../../components';
import ErrorPage from '../ErrorPage';

const NormalPage = ({ data }) => {
    const [ showIframe, setShowIframe ] = useState(false)

    const { 
        name: title, 
        published_at,
        content: { 
            descr_short, 
            body, 
            banner: { 
                filename 
            },
            iframe
        }
    } = data
    
    return <PageLayout title={ title } banner={ filename } intro={ descr_short } date={ published_at }> 
        <RenderContent content={ body } />
        { (iframe && iframe.enabled) && <>
            { !showIframe &&  <div className="bg-gray-100 p-6">
                <h4 className="font-semibold mb-2 text-lg">Toestemming</h4>
                <p className="font-serif text-lg leading-6 mb-2">Deze pagina bevat een geïntegreerde website en kan cookies van derden bevatten.<br /> Geef toestemming om deze website weer te geven</p>
                <small>Website van <strong>{ iframe !== '' && new URL(iframe.source).host }</strong> [ safetycheck (icon) google api ]</small>
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
                    title={ 'iframe' } // eslint-disable-line
                    src={ iframe.source }
                />
            }
        </>}
        <ShareService />
    </PageLayout>
}

const RedirectProcessor = ({ data }) => {
    const [ cancelled, setCancelled ] = useState(false)
    const { content: {
        redirect_url,
        timeout: timoutString,
        manual_skip_timeout
    }} = data
    const timeout = timoutString === 'man' ? 'man' :  parseInt(timoutString)
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + timeout);
    
    const { seconds, pause } = useTimer({
        expiryTimestamp: time,
        autoStart: timeout === 'man' ? false : true,
        // onExpire: () => window.location.replace(redirect_url)
    });
    
    useEffect(() => {
        if (cancelled) pause()
    }, [cancelled])
    
    return <div className="h-full flex items-center justify-center">
        { !cancelled && timeout !== 'man' && <CenterMessage
            intro="We sturen je door"
            icon="external-link"
        >
            { seconds !== 0
                ? <p className="mb-2">Je wordt binnen { seconds } seconden doorgestuurd naar</p>
                : <p className="mb-2">Je wordt nu doorgestuurd naar</p>
            }
            <p className="font-serif break-all px-6">{ redirect_url }</p>
            { manual_skip_timeout && <Button href={ redirect_url } className="mx-auto mt-4" theme="button">Doorgaan</Button>}
        </CenterMessage>}
        { !cancelled && timeout === 'man' && <CenterMessage
            intro="Wil je doorgaan?"
            icon="external-link"
        >
            <p className="mb-2">We sturen je door naar</p>
            <p className="font-serif break-all px-6">{ redirect_url }</p>
            <div className="flex items-center justify-center mt-4">
                <Button href={ redirect_url } className="mr-4" theme="button">Doorgaan</Button>
                <Button onClick={() => setCancelled(true)} theme="simple">Annuleren</Button>
            </div>
        </CenterMessage>}
        { cancelled && <CenterMessage
            intro="Doorsturen geannuleerd"
            icon="flag-2"
        >
            <p>We sturen je niet meer door</p>
            <div className="flex items-center justify-center mt-4">
                <Button href={ redirect_url } className="mr-4" theme="button">Toch doorgaan</Button>
                <Button to="/" theme="simple">Startpagina</Button>
            </div>
        </CenterMessage>}
    </div>
}

const BasePage = () => {
    const [ showIframe, setShowIframe ] = useState(false)
    const { slug } = useParams()
    const { data, loading, error } = useQuery(QUERIES.PAGE_BY_SLUG, {
        variables: { 
            slug: 'pagina/' + slug,
            redirectSlug: 'redirects/' + slug
        }
    })
        
    if (loading) return <PageLayout loading />
    if (error) return <ErrorPage />
    
    const { RedirectItem, PageItem } = data;

    if (!RedirectItem && !PageItem) return <ErrorPage />
    
    return (
        <>
            { PageItem && <NormalPage data={ PageItem } />}
            { RedirectItem && <RedirectProcessor data={ RedirectItem } />}
        </>
    )
}

export default BasePage