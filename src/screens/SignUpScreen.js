import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import {
  VStack,
  Input,
  Button,
  FormControl,
  NativeBaseProvider,
  Center,
} from 'native-base'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
// import SocialSignInButtons from '../components/SocialSignInButtons'
// import { useForm } from 'react-hook-form'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthContext } from '../context/AuthProvider'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const signupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(3, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

const SignUpScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const [loading, setLoading] = React.useState(false)
  // const { control, handleSubmit, watch } = useForm()
  // const pwd = watch('password')

  // if (user) {
  //   navigation.navigate('Home')
  // }

  const onRegisterPressed = async (values) => {
    if (loading) {
      return
    }
    const { password, username, email } = values
    // const username = data.username.toLowerCase()

    setLoading(true)
    try {
      // auth.signup(email, username, password)
      authContext.signup(email, username, password)
    } catch (e) {
      Alert.alert('Oops', e.message)
    }
    setLoading(false)
    // navigation.navigate('SignIn')
    // navigation.navigate('Home')
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={onRegisterPressed}
          validationSchema={signupSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
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

              <FormControl isInvalid={'email' in errors && touched.email}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  onBlur={handleBlur('email')}
                  placeholder="tim@apple.com"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isInvalid={'password' in errors && touched.password}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  secureTextEntry
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

              <FormControl
                isInvalid={
                  'confirmPassword' in errors && touched.confirmPassword
                }>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  secureTextEntry
                  type="password"
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm password"
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
                <FormControl.ErrorMessage>
                  {errors.confirmPassword}
                </FormControl.ErrorMessage>
              </FormControl>

              <CustomButton
                text={loading ? 'Loading...' : 'Sign Up'}
                onPress={handleSubmit}
              />
            </VStack>
          )}
        </Formik>

        {/* <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        /> */}

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
})

export default SignUpScreen
