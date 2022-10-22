import 'react-native-url-polyfill/auto'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import ChatScreen from '../screens/ChatScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import Auth from '../components/Auth'
import { useAuth } from './useAuth'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Auth" component={Auth} />
        </>
      )}
    </Stack.Navigator>
  )
}
export default StackNavigator
