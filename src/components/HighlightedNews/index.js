import { useQuery } from '@apollo/client';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import queries from '../../graphql/queries';
import Button from '../Button';
import RenderTimes from '../RenderTimes';

const Loader = () => (
    <div className="w-full border-b-2 border-gray-200 py-6">
        <Skeleton height="1.5rem" width="50%" className="mb-2" /><br/>
        <Skeleton width="80%" /><br/>
        <Skeleton width="60%" />
    </div>
)

const Card = ({ data }) => {
    const { name, full_slug, content: { descr_short } } = data;
    
    return (
        <div className="border-b-2 border-gray-200 py-6">
            <h4 className="font-bold text-xl mb-2">{ name }</h4>
            <p className="font-serif text-base">{ descr_short }</p>
            <Button to={ full_slug } className="mt-4">Meer hierover</Button>
        </div>
    )
}

const HighlightedNews = () => {
    const { data, loading } = useQuery(queries.HIGHLIGHTED_NEWS)
    
    if (loading) return <RenderTimes>
        <Loader />
    </RenderTimes>
    
    const { NewsItems: { items }} = data;
    
    return (
        <div className="-mt-6">
            { items.map((i, index) => <Card data={ i } key={ index } />)}
            {/* <Card />
            <Card />
            <Card /> */}
        </div>
    )
}

export default HighlightedNews