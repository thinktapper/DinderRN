import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import tw from 'twrnc'
// import Auth from '../components/Auth'
import { useAuth } from '../lib/useAuth'

const LoginScreen = () => {
  const { loading, user, signIn, signUp, signOut } = useAuth()
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={{ uri: 'https://tinder.com/static/tinder.png' }}>
        <Text>Sign in & get swiping</Text>
      </ImageBackground>
    </View>
  )
}
export default LoginScreen
