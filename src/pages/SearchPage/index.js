import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useParams, useHistory, Link } from 'react-router-dom';

import { Button, Form, Icon, Input } from '../../components';
import PageLayout from '../../layouts/PageLayout';
import QUERIES from '../../graphql/queries';

const iconByResultType = (parent_id) => ({
    "63377801": "pages",
    "62392900": "team",
    "62392899": "newspaper"
}[parent_id] || 'file-search')

const Results = ({ data }) => {
    const { items } = data.ContentNodes;
    
    console.log(items)
    
    const resultString = (amount) => {
        if (amount === 0 || amount > 1) return 'resultaten'
        return 'resultaat'
    }

    return (
        <>
        <div className="uppercase tracking-widest text-xs font-semibold text-red-500 mb-6">{ items.length } { resultString(items.length) }</div>
        { items.map(({ name, content, full_slug, parent_id }, index) => (
            <Link 
                key={ index }
                to={ '/' + full_slug } 
                className="flex flex-col border-b-2 p-5 hover:bg-gray-100 w-full"
            >
                <div className="flex items-center mb-2">
                    <Icon name={ iconByResultType(parent_id) } size="1.2rem" className="mr-2" />
                    <span className="font-serif text-gray-400">{ full_slug }</span>
                </div>
                <h4 className="align-middle font-semibold text-lg">{ name }</h4>
            </Link>
            // <Button 
            //     key={ index }
            //     theme="clear" 
            //     to={ '/' + full_slug } 
            //     className="border-b-2 py-4 hover:bg-gray-100 w-full"
            // >
            //     <Icon name={ iconByResultType(parent_id) } size="1.2rem" className="mr-4" />
            //     <h4 className="align-middle">{ name }</h4>
            // </Button>
        ))}
        </>
    )
}

const SearchPage = () => {
    const [ search, { data, loading, error }] = useLazyQuery(QUERIES.SEARCH_BY_TERM);
    const { query: queryInUrl } = useParams();
    const { push } = useHistory()
    
    const handleSearch = ({ query }) => {   
        push(`/zoeken/${ query }`)
        search({
            variables: {
                query
            }
        })
    }
    
    useEffect(() => {
        if (queryInUrl) search({
            variables: {
                query: queryInUrl
            }
        })
    }, [])
    
    return (
        <PageLayout title="Zoeken">
            <Form onSubmit={ handleSearch }>
                <Input 
                    type="text" 
                    name="query" 
                    placeholder="Naar wat zoek je?" 
                    defaultValue={ queryInUrl }
                    prepend="" 
                    append=""
                />
            </Form>
            { data && <Results data={ data } />}
            {/* <CenterMessage 
                icon="seedling"
                intro="Hier kan je binnenkort zoeken"
            >We zetten nog even de puntjes op de i</CenterMessage> */}
            {/* <Icon name="seedling" className="text-center" size="2rem" />
            <h2 className="text-2xl text-center font-serif">Hier kan je binnenkort zoeken</h2>
            <p className="text-center"></p> */}
        </PageLayout>
    )
}

export default SearchPage