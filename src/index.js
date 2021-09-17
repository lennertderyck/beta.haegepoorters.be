import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { ApolloProvider } from '@apollo/client'
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/nl-be';

import * as serviceWorker from './serviceWorker';
import client from './graphql'
import { getToken, initKeycloak, updateToken, _keycl } from './utils/keycloak.vendors';

import App from './App';

import 'remixicon/fonts/remixicon.css'
import './sass/index.scss'

dayjs.locale('nl-be')
dayjs.extend(relativeTime)
dayjs.extend(calendar)

const renderApp = () => ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={ client }>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// Keycloak init
initKeycloak(renderApp)

_keycl.onReady = (auth) => {
    console.log('onReady', auth)
    if (auth) getToken(true)
}
_keycl.onAuthSuccess = () => {
    console.log('onAuthSuccess')
    getToken(true)
}
_keycl.onAuthLogout = () => {
    console.log('onAuthLogout')
    localStorage.removeItem('gaToken')
}
_keycl.onTokenExpired = () => {
    console.log('onTokenExpired')
    updateToken()
}
_keycl.onAuthRefreshSuccess = () => {
    console.log('onAuthRefreshSuccess')
    getToken(true)
}

// PWA service init
serviceWorker.register();