import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import 'dayjs/locale/nl-be';
import * as serviceWorker from './serviceWorker';

import App from './App';

import { ApolloProvider } from '@apollo/client'
import client from './graphql'

import 'remixicon/fonts/remixicon.css'
import './sass/index.scss'
import { initKeycloak } from './utils/keycloak.vendors';

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

initKeycloak(renderApp)
serviceWorker.register();