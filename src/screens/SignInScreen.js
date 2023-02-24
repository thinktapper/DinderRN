import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
  Pressable,
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
  const { height } = useWindowDimensions()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (values) => {
    // console.log('submitting with', values)
    // loginUser(values)
    setLoading(true)
    try {
      authContext.login(values)
    } catch (error) {
      console.log('Error', error)
      setLoading(false)
    }
    setLoading(false)
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

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={onSubmit}
          validationSchema={loginSchema}
        >
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

              <Center>
                <CustomButton
                  text={loading ? 'Loading...' : 'Sign In'}
                  onPress={handleSubmit}
                  bgColor={'cornflowerblue'}
                />
              </Center>
            </VStack>
          )}
        </Formik>

        {/* <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        /> */}
        {/* <Pressable
          onPress={onForgotPasswordPressed}
          style={[styles.container, styles.container_TERTIARY]}
        >
          <Text style={[styles.text, styles.text_TERTIARY]}>
            Forgot password?
          </Text>
        </Pressable> */}

        <Pressable
          onPress={onSignUpPressed}
          style={[styles.container, styles.container_TERTIARY]}
        >
          <Text style={[styles.text, styles.text_TERTIARY]}>
            Don't have an account? Create one
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
})

export default SignInScreen
