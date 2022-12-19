import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useAuthContext } from '../context'
import { useAuthContext } from '../context/AuthProvider'

import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen'
import HomeScreen from '../screens/HomeScreen'
import FeastScreen from '../screens/FeastScreen'
import NewFeastScreen from '../screens/NewFeastScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '../utils/authApi'
import { useUser } from '../hooks/user/useUser'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  // const auth = useAuthContext()
  const { user, splashLoading } = useAuthContext()
  // const authUser = authContext.state.authUser
  // const { user } = useUser()

  // const {
  //   isLoading,
  //   isFetching,
  //   data: user,
  // } = useQuery(['authUser'], () => getMe(), {
  //   enabled: !!user,
  //   retry: 1,
  //   select: (data) => data.user,
  //   onSuccess: (data) => {
  //     authContext.dispatch({ type: 'SET_USER', payload: data })
  //   },
  // })

  // const loading = isLoading || isFetching

  if (splashLoading) {
    return <LoadingIndicator />
  }
  // if (query.isLoading && user.token) {
  //   return <LoadingIndicator />
  // }

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
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Feasts" component={FeastScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewFeast" component={NewFeastScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
