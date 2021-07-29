import React from 'react';
import Fade from 'react-reveal/Fade';
import dayjs from 'dayjs';

import { Img } from '../components';
import Skeleton from 'react-loading-skeleton';

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
    {/* <div className="container container-md px-8 lg:px-0">
        <Skeleton height="1rem" width="60%" />
        <Skeleton height="1rem" width="70%" />
        <Skeleton height="1rem" width="50%" />
    </div> */}
</>

const PageLayout = ({ title, intro, banner, date, loading = false, children }) => {
    return (
        <div className="py-24">
            <Fade when={ loading } collapse><Loader /></Fade>
            <Fade when={ !loading }>
                <article>
                    <div className="container container-md mb-12 px-8 lg:px-0">
                        <h1 className="font-serif font-bold text-5xl text-gray-600">{ title }</h1>
                        { date && <p>Laatst aangepast, { dayjs(date).fromNow() }</p> }
                    </div>
                    { banner && <div className="container container-lg mb-10"> 
                        <Img src={ banner } height="55vh" />
                    </div> }
                    <div className="container container-md px-8 lg:px-0">
                        <p className="text-lg font-medium text-gray-600 mb-6">{ intro }</p>
                        { children }
                    </div>
                </article>
            </Fade>
        </div>
    )
}

export default PageLayout