import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import StackNavigator from './src/lib/StackNavigator'
import { AuthProvider } from './src/lib/useAuth'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}
