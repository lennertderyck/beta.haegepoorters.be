import React from 'react';
import { useQuery } from '@apollo/client';

import { Button, Img, Icon } from '../../components';
import QUERIES from '../../graphql/queries';
import PageLayout from '../../layouts/PageLayout';
import { useVisitor } from '../../contexts/visitorContext';

const Card = ({ data }) => {
    const { sensitiveHidden, showSensitive } = useVisitor()
    const { content: { first_name, tel, image: { filename }}} = data;
    
    return <div className="border-b-2 border-gray-200 py-6">
        <Img src={ filename } height="15rem" className="mb-4" />
        <h4 className="font-bold text-xl -mb-1">{ first_name }</h4>
        <p className="font-serif text-lg">Originele stokstaart</p>
        { sensitiveHidden && <a href="https://www.youtube.com/watch?v=IO9XlQrEt2Y" target="_blank" rel="noreferrer" className="flex items-center mt-3">
            <Icon name="phone" size="1.2rem" className="mr-2" /> 
            <span className="filter blur-sm">+32412456789</span> 
        </a>}
        { !sensitiveHidden && <a href={ 'tel:' + tel } className="flex items-center mt-3">
            <Icon name="phone" size="1.2rem" className="mr-2" /> 
            <span>{ tel }</span>
        </a>}
    </div>
}

const TeamPage = () => {
    const { data, loading } = useQuery(QUERIES.TEAM_FULL)
    const { sensitiveHidden, showSensitive } = useVisitor()

    if (loading) return <p>loading</p>
    
    const { TeammemberItems: { items }} = data
    
    return (
        <PageLayout title="Leiding" subtitle="Ons team van gemotiveerde leiding" wide className="relative">
            <div className="grid grid-cols-4 gap-6">
                { items.map((data, index) => <div 
                    className="col-span-1" 
                    key={ index }
                >
                    <Card data={ data } />
                </div>)}
            </div>
            { sensitiveHidden && <div className="sticky bottom-0 p-4 bg-gray-200 mx-8 mt-12">
                <Button 
                    theme="simple" 
                    icon="eye-close"
                    onClick={() => showSensitive()}
                >Gsm-nummers weergeven</Button>
            </div>}
        </PageLayout>
    )
}

export default TeamPage