import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Form, Input } from '../../components';
import PageLayout from '../../layouts/PageLayout';
import QUERIES from '../../graphql/queries';

const Results = ({ data }) => {
    const { items } = data.ContentNodes;
    
    const resultString = (amount) => {
        if (amount === 0 || amount > 1) return 'resultaten'
        return 'resultaat'
    }

    return (
        <>
        <div className="uppercase tracking-widest text-xs font-semibold text-red-500 mb-6">{ items.length } { resultString(items.length) }</div>
        { items.map(({ name, content, full_slug }) => (
            <Button theme="clear" to={ '/' + full_slug } className="border-b-2 py-4 hover:bg-gray-100 w-full">
                <h4>[ icon resulttype ] { name }</h4>
            </Button>
        ))}
        </>
    )
}

const SearchPage = () => {
    const [ search, { data, loading, error }] = useLazyQuery(QUERIES.SEARCH_BY_TERM);
    const { query: queryInUrl } = useParams();
    const { push } = useHistory()
    
    const handleSearch = ({ query }) => {
        push('/zoeken/' + queryInUrl)
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