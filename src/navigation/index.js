import React, { useEffect, useState } from 'react'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthContext } from '../context/AuthProvider'

import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import HomeScreen from '../screens/HomeScreen'
import FeastScreen from '../screens/FeastScreen'
import NewFeastScreen from '../screens/NewFeastScreen'
import EditFeastScreen from '../screens/EditFeastScreen'
import WinnerScreen from '../screens/WinnerScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const { user, splashLoading } = useAuthContext()

  if (splashLoading) {
    return <LoadingIndicator />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user == null ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                animationTypeForReplace: 'pop',
                // animationTypeForReplace: isSignOut ? 'pop' : 'push',
              }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Feasts" component={FeastScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="NewFeast" component={NewFeastScreen} />
              <Stack.Screen name="EditFeast" component={EditFeastScreen} />
              <Stack.Screen name="Winner" component={WinnerScreen} />
            </Stack.Group>
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
