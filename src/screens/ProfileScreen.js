/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
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
import { FormInput } from '../components/FormInput'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from '../lib/constants'
// import { useAuth } from '../hooks/useAuth'
// import { useUser } from '../hooks/user/useUser'
import { useAuthContext } from '../context/AuthProvider'
import { request } from '../utils/authApi'

const ProfileScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const { user, updateUser, logout, setIsSignOut } = authContext
  const { control, handleSubmit } = useForm()

  const [username, setUserame] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)

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

  const handleUpdateUser = async (data) => {
    try {
      await updateUser(data)
      Alert.alert('Success', 'Your profile has been updated')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Your information</Text>

        <form onSubmit={handleSubmit(handleUpdateUser)}>
        <FormInput
          name="username"
          value={username}
          control={control}
          onChangeText={setUserame}
          // placeholder="Username"
          autoCompleteType="username"
          capitalize="none"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />

        <FormInput
          name="email"
          control={control}
          value={email}
          onChangeText={setEmail}
          // placeholder="Email"
          autoCompleteType="email"
          capitalize="none"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />

        <Pressable
        type='submit'
          // onPress={handleSubmit(handleUpdateUser)}
          style={styles.button}>
          <Text>Save</Text>
        </Pressable>
        </form>


        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text>Cancel</Text>
        </Pressable>

        <Pressable onPress={() => authContext.logout()} style={styles.button}>
          <Text>Sign out</Text>
        </Pressable>
      </View>
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
