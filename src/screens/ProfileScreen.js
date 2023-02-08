import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
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
import FormInput from '../components/FormInput'
// import { useForm } from 'react-hook-form'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { EMAIL_REGEX } from '../lib/constants'
import { useAuthContext } from '../context/AuthProvider'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../components/Header'
// import { useMutation } from '@tanstack/react-query'
// import { logout } from '../utils/useApi'

const ProfileScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const [loading, setLoading] = useState(false)
  // const { user, updateUser, logout, setIsSignOut } = authContext

  const onLogoutHandler = async () => {
    // console.log(authContext.user)
    setLoading(true)
    try {
      await authContext.logout()
    } catch (error) {
      console.warn(`Error logging out: ${error}`)
    }
    setLoading(false)
    Alert.alert('successfully logged out!')
  }

  const updateUserSchema = Yup.object().shape({
    email: Yup.string().matches(EMAIL_REGEX, 'Invalid email'),
    username: Yup.string()
      .min(3, 'Username should be at least 3 characters long')
      .max(24, 'Username should be max 24 characters long'),
    image: Yup.string().optional().trim(),
  })

  const handleUpdateUser = async (values) => {
    // console.warn('data', values)
    setLoading(true)
    try {
      const response = await authContext.updateUser(values)
      if (response.data.success) {
        Alert.alert('Success', 'Your profile has been updated')
        setLoading(false)
        navigation.navigate('Feasts')
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <Header />
      <View style={tw`items-center p-5`}>
        <Text style={styles.title}>Your information</Text>

        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{ uri: authContext.user.image }}
        />

        <Formik
          initialValues={{
            email: authContext.user.email,
            username: authContext.user.username,
            image: authContext.user.image ? authContext.user.image : '',
          }}
          validationSchema={updateUserSchema}
          onSubmit={handleUpdateUser}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
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

              <FormControl isInvalid={'image' in errors && touched.image}>
                <FormControl.Label>Profile Pic</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  onBlur={handleBlur('image')}
                  placeholder="Direct image link, e.g. https://i.imgur.com/8BDXWCv.jpg"
                  onChangeText={handleChange('image')}
                  value={values.image}
                  error={errors.image}
                  touched={touched.image}
                />
                <FormControl.ErrorMessage>
                  {errors.image}
                </FormControl.ErrorMessage>
              </FormControl>

              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text>{loading ? 'Loading...' : 'Save'}</Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.button}>
                <Text>Cancel</Text>
              </Pressable>

              <Pressable onPress={onLogoutHandler} style={styles.button}>
                <Text>Sign out</Text>
              </Pressable>
            </VStack>
          )}
        </Formik>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  location: {
    margin: 10,
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  button: {
    backgroundColor: '#F63A6E',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
})

export default ProfileScreen
