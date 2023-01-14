import Reactotron from 'reactotron-react-native'
import { queryClient } from '../lib/queryClient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query'

const queryClientManager = new QueryClientManager({
  queryClient,
})

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from

Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    // controls connection & communication settings
    onDisconnect: () => {
      queryClientManager.unsubscribe()
    },
  })
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!
