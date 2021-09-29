import { useQuery } from '@apollo/client';
import React from 'react';
import QUERIES from '../../graphql/queries';
import Icon from '../Icon';

const SponsorsBar = () => {
    const { data, error } = useQuery(QUERIES.SPONSORS_ALL)

    if (!data) return null

    const { items, total } = data['SponsorItems']

    if (total === 0) return null
    return (<>
        <div className="flex flex-col items-center pb-8 px-8 pt-12 border-t-2 border-red-500 border-opacity-30 relative">
            <h3 className="font-semibold flex items-center font-serif bg-white mx-0 absolute top-0 transform -translate-y-1/2 px-4">
                <span className="text-red-500">
                    Met hulp van onze sponsors 
                </span>
                <span className="text-red-500">
                    <Icon name="heart" className="ml-2" color="inherit" size="1.4rem" style="line" />
                </span>
            </h3>
            <div className="flex">
                { items.map(({ content: { url, logo: { filename }} }) => (
                    <a 
                        href={ url }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="max-h-10 max-w-40 mr-2 relative last:mr-0"
                    >
                        <img src={ filename } alt="" className="block h-full w-full object-contain" />
                    </a>
                ))}

            </div>
        </div>
    </>)
}

export default SponsorsBar