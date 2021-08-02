import dayjs from 'dayjs';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Fade from 'react-reveal/Fade';

import { Img, Container, Button, Icon, PageWrapper } from '../components';
import { articleCalendar } from '../data/dateFormat';

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

const ArticleLayout = ({ title, intro, banner, loading, date, children }) => {
    window.scrollTo(0, 0)
    
    const calendarTime = dayjs().calendar(dayjs(date), articleCalendar)
    
    return (
        <PageWrapper>
            { loading && <Loader /> }
            { !loading && (
                <Fade spy={ title } duration={ 700 }>
                    <Container className="mb-12"> 
                        <Button to="/blog" icon="arrow-left">Meer berichten</Button>
                    </Container>
                    <article>
                        <Container className="mb-12">
                            <h1 className="font-serif font-bold text-5xl text-gray-600">{ title }</h1>
                            { date && <p className="mt-2 flex items-center">
                                <span className="mr-1"><Icon name="time" /></span>
                                { calendarTime }
                            </p> }
                        </Container>
                        { banner && <div className="container container-lg mb-10"> 
                            <Img src={ banner } height="55vh" />
                        </div> }
                        {( intro || children ) && <Container>
                            <p className="text-lg font-medium text-gray-600 mb-6">{ intro }</p>
                            { children }
                        </Container>}
                    </article>
                </Fade>
            )}
        </PageWrapper>
    )
}

export default ArticleLayout