// import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import tw from 'twrnc'
import Navigation from './src/navigation'
import { Amplify } from 'aws-amplify'
import config from './src/aws-exports'
import { AppProvider } from './src/context/AppProvider'
import { AuthProvider } from './src/context/AuthProvider'

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
})

const App = () => {
  return (
    // <SafeAreaView style={tw`flex-1 bg-slate-200`}>
    <AuthProvider>
      <AppProvider>
        <Navigation />
      </AppProvider>
    </AuthProvider>
    // </SafeAreaView>
  )
}

export default App
