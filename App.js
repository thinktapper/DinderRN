import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, Text, View } from 'react-native'
import tw from 'twrnc'
import Navigation from './src/navigation'
// import StackNavigator from './src/lib/StackNavigator'
import { Amplify, Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './src/aws-exports'

Amplify.configure(config)

const App = () => {
  return (
    // <NavigationContainer>
    //   <StackNavigator />
    // </NavigationContainer>

    <SafeAreaView style={tw`flex-1 bg-slate-200`}>
      <Navigation />
    </SafeAreaView>
  )
}
const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 3,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'password',
    },
  ],
}

export default withAuthenticator(App, { signUpConfig })
// export default App
