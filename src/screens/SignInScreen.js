import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native'
import {
  VStack,
  Input,
  Button,
  FormControl,
  NativeBaseProvider,
  Center,
} from 'native-base'
import tw from 'twrnc'
import Logo from '../../assets/images/dinder-double_flame-black.png'
import CustomButton from '../components/CustomButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthContext } from '../context/AuthProvider'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import { useUser } from '../hooks/user/useUser'
// import { login } from '../utils/authApi'
// import { getMe } from '../utils/useApi'
// import { useAuth } from '../hooks/useAuth'
// import { setStoredUser } from '../lib/user-storage'
// import FormInput from '../components/FormInput'

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

const validate = (values) => {
  const errors = {}

  if (!values.unsername) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

const SignInScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  // const auth = useAuth()
  const { height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  // const { updateUser } = useUser()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirm, setConfirm] = useState('')

  // Get current logged-in user
  // const query = useQuery(['authUser'], getMe, {
  //   enabled: false,
  //   select: (data) => data.user,
  //   retry: 1,
  //   onSuccess: (data) => {
  //     authContext.dispatch({ type: 'SET_USER', payload: data })
  //   },
  // })

  // Login Mutation
  // const { mutate: loginUser, isLoading } = useMutation(
  //   (userData) => login(userData),
  //   {
  //     onSuccess: (response) => {
  //       if ('user' in response && 'token' in response.user) {
  //         console.debug(`User ${response.user.username} logged in`)
  //         Alert.alert('You successfully logged in')
  //       }

  //       // update stored user data
  //       authContext.dispatch({ type: 'SET_USER', payload: response.user })
  //       // query.refetch()
  //       // navigation.navigate('Home')
  //     },
  //     onError: (error) => {
  //       if (Array.isArray(error.response.data.error)) {
  //         error.data.error.forEach((el) => console.warn(el.message))
  //       } else {
  //         console.warn(error.response.data.message)
  //       }
  //     },
  //   },
  // )

  // if (user) {
  //   navigation.navigate('Home')
  // }

  const onSubmit = async (values) => {
    console.log('submitting with', values)
    // loginUser(values)
    setLoading(true)
    try {
      authContext.login(values)
      // const response = await login(values)
      // if ('user' in response && 'token' in response.user) {
      //   console.debug(`User ${response.user.username} logged in`)
      //   // update stored user data
      //   authContext.dispatch({ type: 'SET_USER', payload: response.user })
      //   setStoredUser(response.user)
      //   Alert.alert('You successfully logged in')
      // }
    } catch (error) {
      console.log('Error', error)
      setLoading(false)
    }
    setLoading(false)
  }

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

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={loginSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            values,
            touched,
            errors,
          }) => (
            <VStack width="80%" space={4}>
              <FormControl isInvalid={'username' in errors && touched.username}>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  onBlur={handleBlur('username')}
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  value={values.username}
                  error={errors.username}
                  touched={touched.username}
                />
                <FormControl.ErrorMessage>
                  {errors.username}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isInvalid={'password' in errors && touched.password}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  type="password"
                  onBlur={handleBlur('password')}
                  placeholder="Enter password"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                />
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>

              <CustomButton
                text={loading ? 'Loading...' : 'Sign In'}
                onPress={handleSubmit}
              />
            </VStack>
          )}
        </Formik>

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
