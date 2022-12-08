/* eslint-disable prettier/prettier */
// import 'react-native-gesture-handler'
import React from 'react'
import 'react-native-url-polyfill/auto'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
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

const asyncPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

const App = () => {
  return (
    // <SafeAreaView style={tw`flex-1 bg-slate-200`}>
    // <AppProvider>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncPersister }}>
      {/* <AuthProvider> */}
      <Navigation />
      {/* </AuthProvider> */}
    </PersistQueryClientProvider>
    // {/* </AppProvider> */}
    // </SafeAreaView>
  )
}

export default App
