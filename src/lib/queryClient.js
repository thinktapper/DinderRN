// @ts-nocheck
import { QueryClient, MutationCache } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 20000,
      retry: 1,
    },
  },
  // configure global cache callbacks to show warns in dev
  mutationCache: new MutationCache({
    onSuccess: (data) => {
      console.warn('Mutation cache success', data.message)
    },
    onError: (error) => {
      console.warn('Mutation cache error', error.message)
    },
  }),
})

export { queryClient }
