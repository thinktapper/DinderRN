import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

const LoginScreen = () => {
  const { signInWithEmail } = useAuth()

  return (
    <View>
      <Text>Login to the app</Text>
      <Button title="login" onPress={signInWithEmail} />
    </View>
  )
}
export default LoginScreen
