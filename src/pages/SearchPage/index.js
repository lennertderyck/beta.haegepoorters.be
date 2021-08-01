import React from 'react';
import { CenterMessage } from '../../components';
import PageLayout from '../../layouts/PageLayout';

const SearchPage = () => {
    return (
        <PageLayout>
            <CenterMessage 
                icon="seedling"
                intro="Hier kan je binnenkort zoeken"
            >We zetten nog even de puntjes op de i</CenterMessage>
            {/* <Icon name="seedling" className="text-center" size="2rem" />
            <h2 className="text-2xl text-center font-serif">Hier kan je binnenkort zoeken</h2>
            <p className="text-center"></p> */}
        </PageLayout>
    )
}

export default SearchPage