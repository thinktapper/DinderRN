import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import StackNavigator from './src/lib/StackNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
