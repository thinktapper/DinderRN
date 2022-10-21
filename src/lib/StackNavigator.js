import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import ChatScreen from '../screens/ChatScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import useAuth from './useAuth'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { session } = useAuth()

  return (
    <Stack.Navigator>
      {session && session.user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  )
}
export default StackNavigator
