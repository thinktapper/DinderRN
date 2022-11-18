// import 'react-native-gesture-handler'
import React from 'react'
import 'react-native-url-polyfill/auto'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
// import { StatusBar } from 'expo-status-bar'
// import { SafeAreaView } from 'react-native'
// import tw from 'twrnc'
import Navigation from './src/navigation'

import { AppProvider } from './src/context/AppProvider'
import { AuthProvider } from './src/context/AuthProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
})

const App = () => {
  return (
    // <SafeAreaView style={tw`flex-1 bg-slate-200`}>
    // <AppProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </QueryClientProvider>
    // {/* </AppProvider> */}
    // </SafeAreaView>
  )
}

export default App
