import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthContext } from '../context/AuthProvider'
// import { useUser } from '../hooks/user/useUser'

import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import NewPasswordScreen from '../screens/NewPasswordScreen'
import HomeScreen from '../screens/HomeScreen'
import FeastScreen from '../screens/NewFeastScreen'
import NewFeastScreen from '../screens/NewFeastScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const authContext = useAuthContext()
  const { user, splashLoading, isSignOut } = authContext
  // const { userInfo, isLoading } = authContext
  // const [userInfo, setUserInfo] = useState({})
  // const { user } = useUser()

  // useEffect(() => {
  //   useUser()
  // }, [])

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
                animationTypeForReplace: isSignOut ? 'pop' : 'push',
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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Feasts" component={FeastScreen} />
            <Stack.Screen name="NewFeast" component={NewFeastScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
