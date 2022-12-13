import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Logo from '../../assets/images/dinder-double_flame-black.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuthContext } from '../context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getMe, login } from '../utils/authApi'
import FormInput from '../components/FormInput'

const loginSchema = Yup.object()
  .shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  })
  .required()

const SignInScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const { height } = useWindowDimensions()
  // const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const methods = useForm({
    resolver: yupResolver(loginSchema),
  })

  // Get current logged-in user
  const query = useQuery(['authUser'], getMe, {
    enabled: false,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      authContext.dispatch({ type: 'SET_USER', payload: data })
    },
  })

  // Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData) => login(userData),
    {
      onSuccess: () => {
        query.refetch()
        Alert.alert('You successfully logged in')
        // navigation.navigate('Home')
      },
      onError: (error) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el) => console.warn(el.message))
        } else {
          console.warn(error.response.data.message)
        }
      },
    },
  )

  // if (user) {
  //   navigation.navigate('Home')
  // }

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods

  const onSubmitHandler = (values) => {
    loginUser(values)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  // const onSignInPressed = async (data) => {
  //   if (loading) {
  //     return
  //   }
  //   setLoading(true)
  //   try {
  //     // auth.login(data.username, data.password)
  //     authContext.login(data.username, data.password)
  //   } catch (error) {
  //     Alert.alert('Oops!', error.message)
  //   }
  //   setLoading(false)
  //   // navigation.navigate('Home')
  // }

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

        <FormProvider {...methods}>
          <FormInput name="username" placeholder="Username" value={username} />
          <FormInput
            name="password"
            placeholder="Password"
            value={password}
            type="password"
            secureTextEntry
          />

          <CustomButton
            text={isLoading ? 'Loading...' : 'Sign In'}
            onPress={handleSubmit(onSubmitHandler)}
          />
        </FormProvider>

        {/* <CustomInput
          name="username"
          placeholder="username"
          capitalize="none"
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
        /> */}

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
