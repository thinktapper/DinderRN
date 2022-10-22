import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import StackNavigator from './src/lib/StackNavigator'
// import { AuthProvider } from './src/lib/useAuth'

import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './src/aws-exports'

Amplify.configure(config)

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthProvider> */}
      <StackNavigator />
      {/* </AuthProvider> */}
    </NavigationContainer>
  )
}

export default withAuthenticator(App)
