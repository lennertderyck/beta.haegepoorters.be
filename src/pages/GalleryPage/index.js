import React from 'react';
import { useQuery } from '@apollo/client';

import { Img, Button } from '../../components';
import PageLayout from '../../layouts/PageLayout';
import QUERIES from '../../graphql/queries';
import { siteGroups } from '../../data/site'

const GroupsDisplay = ({ groups }) => {
    
    return groups.map((group, index) => (
    <span 
        key={ index }
        className="text-gray-400 text-xs font-semibold uppercase tracking-widest"
    >
        { siteGroups.find(({ value }) => value === group).plur }
    </span>))
}

const Card = ({ data }) => {
    const { name, content: { url, groups } } = data;
    
    return <Button 
        href={ url }
        target="_blank"
        theme="clear" 
        className="border-b-2 border-gray-200 py-6 flex items-center justify-between w-full"
    >
        <div className="flex items-center mr-6">
            <div className="mr-6 w-6 h-6 flex-shrink-0">
                <Img 
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${ url }`}
                    className="rounded-full"
                />
            </div>
            <div>
                <h4 className="font-semibold text-xl -mb-1">{ name }</h4>
                <GroupsDisplay groups={ groups?.selected }/>
            </div>
        </div>
        <Button theme="button" className="whitespace-nowrap">Bekijk album</Button>
    </Button>
}

const GalleryPage = () => {
    const { data, loading } = useQuery(QUERIES.GALLERY_ALBUMS)
    
    if (loading) return <PageLayout
        title="Galerij"
    >
        <p>Loading</p>
    </PageLayout>
    
    const { GaleryalbumItems: { items }} = data;
    
    return (
        <PageLayout
            title="Galerij"
            wide
            // subtitle="Herbeleef memorabele momenten"
        >
            {/* <CenterMessage 
                icon="seedling"
                intro="Hier kan je binnenkort al onze foto's bekijken"
            >We zetten nog even de puntjes op de i</CenterMessage> */}
            {/* <Icon name="seedling" className="text-center" size="2rem" />
            <h2 className="text-2xl text-center font-serif"></h2>
            <p className="text-center"></p> */}
            <div className="-mt-6 w-full grid grid-cols-12 lg:gap-6">
                { items.map((data, index) => (
                    <div 
                        key={ index }
                        className="col-span-12 lg:col-span-4"
                    >
                        <Card data={ data } />
                    </div>
                ))}
            </div>
        </PageLayout>
    )
}

export default GalleryPage