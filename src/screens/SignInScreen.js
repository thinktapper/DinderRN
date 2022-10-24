import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Logo from '../../../assets/images/dinder-double_flame-black.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { height } = useWindowDimensions()

  const onSignInPressed = () => {
    console.warn('Sign In Pressed')
  }

  const onSignUpPressed = () => {
    console.warn('Sign Up Pressed')
  }

  return (
    <ScrollView>
      <View style={tw`items-center p-5`}>
        <Image
          source={Logo}
          style={[tw`max-w-xs max-h-56`, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
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
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

export default SignInScreen
