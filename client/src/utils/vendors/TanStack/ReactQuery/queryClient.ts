import { QueryClient } from "@tanstack/react-query";

const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      retry: 0,
      refetchOnMount(query) {
        if (query.state.status === 'error') return false;
        else return true;
      },
    },
  },
});

export default QUERY_CLIENT;