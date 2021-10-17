import React, { useEffect, createContext, useState, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';

import { AppRouter, Form, Icon, Input, Modal } from '../../components';
import PageLayout from '../../layouts/PageLayout';
import QUERIES from '../../graphql/queries';

const iconByResultType = (parent_id) => ({
    "63377801": "pages",
    "62392900": "team",
    "62392899": "newspaper"
}[parent_id] || 'file-search')

const context = createContext();
const { Provider } = context;
const useSearchRoute = () => useContext(context)

const Results = ({ data }) => {
    const { setRoute } = useSearchRoute()
    const { push } = useHistory()
    const { items } = data.ContentNodes;
    
    
    const resultString = (amount) => {
        if (amount === 0 || amount > 1) return 'resultaten'
        return 'resultaat'
    }

    return (
        <>
            <div className="uppercase tracking-widest text-xs font-semibold text-red-500 mb-6">{ items.length } { resultString(items.length) }</div>
            { items.map(({ name, full_slug, parent_id }, index) => (
                <div 
                    key={ index }
                    // onClick={() => setRoute('/' + full_slug)}
                    onClick={() => push('/' + full_slug)}
                    className="flex flex-col items-start border-b-2 py-5 lg:px-5 lg:hover:bg-gray-100 w-full cursor-pointer"
                >
                    <div className="flex items-center justify-start mb-2">
                        <Icon name={ iconByResultType(parent_id) } size="1.2rem" className="mr-2" />
                        <span className="font-serif text-gray-400">{ full_slug }</span>
                    </div>
                    <h4 className="align-middle text-left font-semibold text-lg">{ name }</h4>
                </div>
            ))}
        </>
    )
}

const SearchPage = () => {
    const [ search, { data }] = useLazyQuery(QUERIES.SEARCH_BY_TERM);
    const { query: queryInUrl } = useParams();
    const { push } = useHistory()
    const [ resultRoute, setRoute ] = useState(null)
    
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
    }, []) // eslint-disable-line
    
    return (
        <Provider value={{
            resultRoute,
            setRoute
        }}>
            {resultRoute && <Modal title="Zoekresultaat" open={ true } onClose={() => setRoute(null)}>
                <AppRouter route={ resultRoute } embedded/>
            </Modal>}
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
            </PageLayout>
        </Provider>
    )
}

export default SearchPage