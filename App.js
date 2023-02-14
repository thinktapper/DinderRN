import 'expo-dev-client'
import 'react-native-gesture-handler'
import React from 'react'
import { LogBox } from 'react-native'
// import { StatusBar } from 'expo-status-bar'
import 'react-native-url-polyfill/auto'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/lib/queryClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron from 'reactotron-react-native'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import Navigation from './src/navigation'
import { AuthProvider } from './src/context/AuthProvider'
import { NativeBaseProvider } from 'native-base'

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
])

const asyncPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

// if (__DEV__) {
//   import('./src/utils/reactotron')
// }

const App = ({ navigation }) => {
  return (
    // <SafeAreaView style={tw`flex-1 bg-slate-200`}>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncPersister }}
    >
      <AuthProvider>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
    // </SafeAreaView>
  )
}

export default App
