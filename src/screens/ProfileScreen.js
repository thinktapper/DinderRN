/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { useUser } from '../hooks/user/useUser'
// import { useAppContext } from '../context/AppProvider'
import { useAuthContext } from '../context/AuthProvider'

const ProfileScreen = ({ navigation }) => {
  const authContext = useAuthContext()
  const { user, logout, isSignOut, setIsSignOut } = authContext
  // const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

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

  const isValid = () => {
    return name && bio
  }

  const save = async () => {
    if (!isValid()) {
      console.warn('Not valid')
      return
    }

    // if (user) {
    //   const updatedUser = User.copyOf(user, (updated) => {
    //     updated.name = name
    //     updated.bio = bio
    //     updated.lat = appContext.lat
    //     updated.long = appContext.long
    //     updated.radius = appContext.radius
    //     // updated.places = places
    //   })

    //   await DataStore.save(updatedUser)
    // } else {
    //   // create a new user
    //   const authUser = await Auth.currentAuthenticatedUser()

    //   const newUser = new User({
    //     sub: authUser.attributes.sub,
    //     name,
    //     bio,
    //     image: 'https://ptpimg.me/ud7dea.png',
    //     lat: appContext.lat,
    //     long: appContext.long,
    //     radius: appContext.radius,
    //   })
    //   await DataStore.save(newUser)
    // }

    // Alert.alert('User saved successfully')
    // navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Set your swipe session</Text>

        <TextInput
          style={styles.input}
          placeholder="Name..."
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="bio..."
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={setBio}
        />

        <Pressable onPress={save} style={styles.button}>
          <Text>Save</Text>
        </Pressable>

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
