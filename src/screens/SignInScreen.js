import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Logo from '../../assets/images/dinder-double_flame-black.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useForm, Controller } from 'react-hook-form'
import { useAuthContext } from '../context/AuthProvider'

const SignInScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const { height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSignInPressed = async (data) => {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      const result = await authContext.login(data.username, data.password)
      if (result.ok) {
        authContext.setUser(result)
      }
    } catch (error) {
      Alert.alert('Oops!', error.message)
    }
    setLoading(false)
    navigation.navigate('Home')
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp')
  }

  const onForgotPasswordPressed = () => {
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

        <CustomInput
          name="username"
          placeholder="username"
          control={control}
          rules={{ required: 'Username is required' }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
          secureTextEntry
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

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
