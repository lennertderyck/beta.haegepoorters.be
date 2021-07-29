import React from 'react';

import { CenterMessage } from '../../components';
import PageLayout from '../../Layouts/PageLayout';

const GalleryPage = () => {
    return (
        <PageLayout>
            <CenterMessage 
                icon="seedling"
                intro="Hier kan je binnenkort al onze foto's bekijken"
            >We zetten nog even de puntjes op de i</CenterMessage>
            {/* <Icon name="seedling" className="text-center" size="2rem" />
            <h2 className="text-2xl text-center font-serif"></h2>
            <p className="text-center"></p> */}
        </PageLayout>
    )
}

export default GalleryPage