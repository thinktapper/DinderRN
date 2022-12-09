/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native'
import tw from 'twrnc'
import FormInput from '../components/FormInput'
import { useForm } from 'react-hook-form'
// import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { EMAIL_REGEX } from '../lib/constants'
// import { useAuth } from '../hooks/useAuth'
// import { useUser } from '../hooks/user/useUser'
import { useAuthContext } from '../context/AuthProvider'
import { request } from '../utils/authApi'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ProfileScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const { user, updateUser, logout, setIsSignOut } = authContext
  const { handleSubmit, register, setValue, errors } = useForm()
  const inputRef = useRef([])
  // const [username, setUserame] = useState(user?.username)
  // const [email, setEmail] = useState(user?.email)

  // const auth = useAuth()
  // const { user } = useUser()
  // const { logout } = useAuth()

  if (!user) {
    navigation.navigate('SignIn')
  }

  const handleSignOut = async () => {
    setIsSignOut(true)
    await logout()
  }

  // const isValid = () => {
  //   return name && bio
  // }

  // const save = async () => {
  //   if (!isValid()) {
  //     console.warn('Not valid')
  //     return
  //   }
  // }

  const updateUserSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username should be at least 3 characters long')
      .max(24, 'Username should be max 24 characters long'),
    email: Yup.string().matches(EMAIL_REGEX, 'Invalid email'),
  })

  const handleUpdateUser = async (data) => {
    // console.warn('data', data)

    // await updateUser(data)

    // if (result && result.user !== null) {
    //   Alert.alert('Success', 'Your profile has been updated')
    // }
    try {
      await updateUser(data)
      // if ('user' in result && result.user !== null) {
      //   Alert.alert('Success', 'Your profile has been updated')
      // }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    // <SafeAreaView style={styles.root}>
    <KeyboardAwareScrollView style={styles.root}>
      <Text style={styles.title}>Your information</Text>
      <View style={styles.container}>
        <FormInput
          name="username"
          label="Username"
          placeholder={user?.username ?? 'Username'}
          register={'username'}
          ref={(ref) => {
            inputRef.current = ref
          }}
          onChangeText={(value) => setValue('username', value)}
          errors={errors}
        />

        <FormInput
          name="email"
          label="Email address"
          placeholder={user?.email ?? 'tim@apple.com'}
          register={'email'}
          ref={(ref) => {
            inputRef.current = ref
          }}
          onChangeText={(value) => setValue('email', value)}
          errors={errors}
        />

        <Pressable
          onPress={handleSubmit(handleUpdateUser)}
          style={styles.button}>
          <Text>Save</Text>
        </Pressable>

        {/* <Formik
          initialValues={{ username: user.username, email: user.email }}
          validationSchema={updateUserSchema}
          onSubmit={(values) => handleUpdateUser(values)}>
          {({ handleSubmit, isValid, values }) => (
            <>
              <Field
                component={FormInput}
                name="username"
                placeholder={user.username}
              />

              <Field
                component={FormInput}
                name="email"
                placeholder={user.email}
                keyboardType="email-address"
              />

              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text>Save</Text>
              </Pressable>
            </>
          )}
        </Formik> */}

        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text>Cancel</Text>
        </Pressable>

        <Pressable onPress={() => authContext.logout()} style={styles.button}>
          <Text>Sign out</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
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
