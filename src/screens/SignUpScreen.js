import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  Pressable,
} from 'react-native'
import {
  VStack,
  Input,
  Button,
  FormControl,
  NativeBaseProvider,
  Center,
} from 'native-base'
import CustomButton from '../components/CustomButton'
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
  image: Yup.string().optional().trim(),
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
    const { password, username, image, email } = values

    setLoading(true)
    try {
      authContext.signup(email, username, image, password)
    } catch (e) {
      Alert.alert('Oops', e.message)
    }
    setLoading(false)
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn')
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>

          <Formik
            initialValues={{
              username: '',
              email: '',
              image: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={onRegisterPressed}
            validationSchema={signupSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <VStack width="80%" space={4} mt={'6'}>
                <FormControl
                  isInvalid={'username' in errors && touched.username}
                >
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

                <FormControl isInvalid={'image' in errors && touched.image}>
                  <FormControl.Label>Profile Pic</FormControl.Label>
                  <Input
                    autoCapitalize="none"
                    onBlur={handleBlur('image')}
                    placeholder="Direct link, e.g. https://i.imgur.com/8BDXWCv.jpg"
                    onChangeText={handleChange('image')}
                    value={values.image}
                    error={errors.image}
                    touched={touched.image}
                  />
                  <FormControl.ErrorMessage>
                    {errors.image}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={'password' in errors && touched.password}
                >
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
                  }
                >
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

                <Center>
                  <CustomButton
                    text={loading ? 'Loading...' : 'Sign Up'}
                    onPress={handleSubmit}
                  />
                </Center>
              </VStack>
            )}
          </Formik>

          {/* <SocialSignInButtons /> */}

          {/* <CustomButton
            text="Have an account? Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          /> */}
          <Pressable
            onPress={onSignInPress}
            style={[styles.container, styles.container_TERTIARY]}
          >
            <Text style={[styles.text, styles.text_TERTIARY]}>
              Have an account? <Text style={styles.link}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    color: 'cornflowerblue',
  },
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

  // text: {
  //   fontWeight: 'bold',
  //   color: 'white',
  // },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
})

export default SignUpScreen
