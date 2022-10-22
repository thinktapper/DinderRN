import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import tw from 'twrnc'
// import Auth from '../components/Auth'
import { useAuth } from '../lib/useAuth'
// import Modal from '../components/Signup/Modal'

const LoginScreen = () => {
  const { loading, user, signIn, signUp, signOut } = useAuth()
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
        source={{ uri: 'https://tinder.com/static/tinder.png' }}>
        <TouchableOpacity
          style={[
            tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`,
            { marginHorizontal: '25%' },
          ]}
          onPress={() => navigation.navigate('Auth')}>
          <Text style={tw`text-center font-semibold`}>
            Sign in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}
export default LoginScreen
