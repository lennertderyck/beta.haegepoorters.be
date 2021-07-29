import React from 'react';
import { Img } from '../components';

const ArticleLayout = ({ title, intro, banner, children }) => {
    return (
        <article className="py-24">
            <div className="container container-md mb-12">
                <h1 className="font-serif font-bold text-5xl text-gray-600">{ title }</h1>
            </div>
            <div className="container container-lg mb-10"> 
                <Img src={ banner } height="55vh" />
            </div>
            <div className="container container-md">
                <p className="text-lg font-medium text-gray-600 mb-6">{ intro }</p>
                { children }
            </div>
        </article>
    )
}

export default ArticleLayout