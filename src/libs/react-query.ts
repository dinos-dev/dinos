import { QueryClient, QueryCache } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retryOnMount: true,
            refetchOnReconnect: false,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            console.log('queryCache :', error);
        },
    }),
});

export default queryClient;
