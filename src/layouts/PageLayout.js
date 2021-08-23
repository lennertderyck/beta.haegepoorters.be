import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Fade from 'react-reveal/Fade';

import { Container, Img, PageWrapper } from '../components';
import Skeleton from 'react-loading-skeleton';
import { className } from '../utils';

const Loader = () => <>
    <div className="container container-md mb-12 px-8 lg:px-0">
        <Skeleton height="2.5rem" width="17rem" className="mb-1" /><br />
        <Skeleton height="1.2rem" width="14rem" />
    </div>
    <div className="container container-lg mb-10"> 
        <Skeleton height="55vh" width="100%" />
    </div>
    <div className="container container-md px-8 lg:px-0 mb-6">
        <Skeleton height="1.2rem" width="80%" />
        <Skeleton height="1.2rem" width="60%" />
    </div>
</>

const PageLayout = ({ title, subtitle, intro, banner, wide = false, date, loading = false, className: cls, disableScroll = false, children }) => { 
    /* !disableScroll && window.scrollTo(0, 0) */
    
    useEffect(() => {
        !disableScroll && window.scrollTo(0, 0)
    }, [])
    
    return (
        <PageWrapper>
            { loading && <Loader /> }
            { !loading && <Fade spy={ title } duration={ 700 }>
                    <article {...className(
                        cls
                    )}>
                        <Container className="mb-12">
                            <h1 className="font-serif font-bold text-5xl text-gray-600">{ title }</h1>
                            { date && <p className="mt-2">Laatst aangepast, { dayjs(date).fromNow() }</p> }
                            { subtitle && <p className="mt-6">{ subtitle }</p> }
                        </Container>
                        { banner && <div className="container container-lg mb-10"> 
                            <Img src={ banner } height="55vh" />
                        </div> }
                        {( intro || children ) && <Container wide={ wide }>
                            <p className="text-lg font-medium text-gray-600 mb-6">{ intro }</p>
                            { children }
                        </Container>}
                    </article>
                </Fade>
            }
        </PageWrapper>
    )
}

export default PageLayout