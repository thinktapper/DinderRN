import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
// import Auth from '../components/Auth'
import { useAuth } from '../lib/useAuth'

const LoginScreen = () => {
  const { loading, user, signIn, signUp, signOut } = useAuth()

  return (
    <View>
      <Text>{loading ? 'loading...' : 'Login to the app'}</Text>
      <Button title="login" onPress={signIn} />
    </View>
  )
}
export default LoginScreen
