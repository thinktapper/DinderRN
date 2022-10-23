import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, Text, View } from 'react-native'
import tw from 'twrnc'
import SignInScreen from './src/screens/SignInScreen'
// import StackNavigator from './src/lib/StackNavigator'
// import { Amplify, Auth } from 'aws-amplify'
// import { withAuthenticator } from 'aws-amplify-react-native'
// import config from './src/aws-exports'

// Amplify.configure(config)

const App = () => {
  return (
    // <NavigationContainer>
    //   <StackNavigator />
    // </NavigationContainer>

    <SafeAreaView style={tw`flex-1 bg-slate-200`}>
      <SignInScreen />
    </SafeAreaView>
  )
}

// export default withAuthenticator(App)
export default App
