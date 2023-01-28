import { QueryClient, MutationCache } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // refetchOnReconnect: false,
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
      // cacheTime: Infinity,
      // retry: 1,
    },
  },
  // configure global cache callbacks to show warns in dev
  mutationCache: new MutationCache({
    onSuccess: (data) => {
      console.log('Mutation cache success', JSON.stringify(data.message))
    },
    onError: (error) => {
      console.warn('Mutation cache error', JSON.stringify(error.message))
    },
  }),
})

export { queryClient }
