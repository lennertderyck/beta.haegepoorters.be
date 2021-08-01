import React from 'react';

import { CenterMessage } from '../../components';
import PageLayout from '../../layouts/PageLayout';

const ErrorPage = () => {
    return (
        <PageLayout>
            <CenterMessage
                icon="map-pin-range"
                intro="Oeps, dat liep niet volgens plan"
            >We konden de gevraagde pagina niet vinden</CenterMessage>
        </PageLayout>
    )
}

export default ErrorPage