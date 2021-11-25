import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import { CenterMessage } from '..';

const DefaultErrorFallback = () => {
    return <CenterMessage
        intro="We konden dit niet laden"
    >
        Probeer de pagina te herladen, of probeer het later opnieuw
    </CenterMessage>
}

const Component = ({ children, fallback, onError }) => {
    
    const handleError = () => {
        if (onError) onError()
    }
    
    return (
        <ErrorBoundary 
            FallbackComponent={ fallback || <DefaultErrorFallback /> } 
            onError={ handleError }
        >{ children }</ErrorBoundary>
    )
}

export default Component