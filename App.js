// import 'react-native-gesture-handler'
import React from 'react'
// import { StatusBar } from 'expo-status-bar'
import 'react-native-url-polyfill/auto'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/lib/queryClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron from 'reactotron-react-native'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import Navigation from './src/navigation'
import { AppProvider } from './src/context/AppProvider'
import { AuthProvider } from './src/context/AuthProvider'
import { NativeBaseProvider } from 'native-base'
// import { AuthContextProvider } from './src/context'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: 1,
//       // staleTime: 1000 * 60 * 60 * 24, // 24 hours
//       // staleTime: 600000,
//       // cacheTime: 900000,
//       staleTime: Infinity,
//       cacheTime: Infinity,
//     },
//   },
// })

const asyncPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

if (__DEV__) {
  // @ts-ignore
  import('./src/utils/reactotron')
}
// if (__DEV__) {
//   import('./src/utils/ReactotronConfig').then(() =>
//     console.log('Reactotron Configured'),
//   )
// }

const App = ({ navigation }) => {
  return (
    // <SafeAreaView style={tw`flex-1 bg-slate-200`}>

    // <PersistQueryClientProvider
    //   client={queryClient}
    //   persistOptions={{ persister: asyncPersister }}>
    <AuthProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <NativeBaseProvider>
            <Navigation />
          </NativeBaseProvider>
        </QueryClientProvider>
      </AppProvider>
    </AuthProvider>
    // </PersistQueryClientProvider>
    // </SafeAreaView>
  )
}

export default App
