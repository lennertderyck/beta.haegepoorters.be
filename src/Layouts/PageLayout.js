import React from 'react';

import dayjs from 'dayjs';

import { Img } from '../components';

const PageLayout = ({ title, intro, banner, date, children }) => {
    const lastEditedDate = dayjs(date).fromNow()
    
    return (
        <article className="py-24">
            <div className="container container-md mb-12 px-8 lg:px-0">
                <h1 className="font-serif font-bold text-5xl text-gray-600">{ title }</h1>
                { date && <p>Laatst aangepast, { lastEditedDate }</p> }
            </div>
            { banner && <div className="container container-lg mb-10"> 
                <Img src={ banner } height="55vh" />
            </div> }
            <div className="container container-md px-8 lg:px-0">
                <p className="text-lg font-medium text-gray-600 mb-6">{ intro }</p>
                { children }
            </div>
        </article>
    )
}

export default PageLayout