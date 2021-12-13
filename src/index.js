import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import { ApolloProvider } from '@apollo/client'
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/nl-be';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import * as serviceWorker from './serviceWorker';
import client from './graphql'
import { getToken, initKeycloak, updateToken, _keycl } from './utils/keycloak.vendors';

import App from './App';

import 'remixicon/fonts/remixicon.css'
import 'react-tabs/style/react-tabs.css';
import './sass/index.scss'

dayjs.locale('nl-be')
dayjs.extend(relativeTime)
dayjs.extend(calendar)

Sentry.init({
    dsn: "https://30ca99c4c91543a686f65a782e853493@o1089819.ingest.sentry.io/6105296",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

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