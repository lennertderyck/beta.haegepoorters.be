import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/nl-be';

import App from './App';

import { ApolloProvider } from '@apollo/client'
import client from './graphql'

import 'remixicon/fonts/remixicon.css'
import 'tailwindcss/tailwind.css'
import './sass/index.scss'

dayjs.locale('nl-be')
dayjs.extend(relativeTime)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);