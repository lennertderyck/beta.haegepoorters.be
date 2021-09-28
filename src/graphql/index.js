import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
// import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

const cache = new InMemoryCache();

// persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

const httpLink = createHttpLink({
  uri: 'https://gapi.storyblok.com/v1/api',
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "Token": "llrJxGX1ja0AqEiAB1xrJwtt",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;