import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Logo from '../../assets/images/dinder-double_flame-black.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

const SignInScreen = () => {
  const { height } = useWindowDimensions()
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm()

  const onSignInPressed = () => {
    console.warn('Sign In Pressed')

    navigation.navigate('Home')
  }

  const onSignUpPressed = () => {
    console.warn('Sign Up Pressed')

    navigation.navigate('SignUp')
  }

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password Pressed')

    navigation.navigate('ForgotPassword')
  }

  return (
    <ScrollView>
      <View style={tw`items-center p-5`}>
        <Image
          source={Logo}
          style={[tw`max-w-xs max-h-56`, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput name="email" placeholder="Email" control={control} />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

export default SignInScreen
