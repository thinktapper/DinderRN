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
import { Picker } from '@react-native-picker/picker'
import { Auth, DataStore } from 'aws-amplify'
import { User } from '../models/'

const ProfileScreen = () => {
  const [user, setUser] = useState(null)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  const signOut = () => {
    Auth.signOut()
  }

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser()

      const dbUsers = await DataStore.query(
        User,
        u => u.sub === user.attributes.sub,
      )
      if (dbUsers.length < 0) {
        return
      }
      const dbUser = dbUsers[0]
      setUser(dbUser)

      setName(dbUser.name)
      setBio(dbUser.bio)
    }
    getCurrentUser()
  }, [])

  const isValid = () => {
    return name && bio
  }

  const save = async () => {
    if (!isValid()) {
      console.warn('Not valid')
      return
    }

    if (user) {
      const updatedUser = User.copyOf(user, updated => {
        updated.name = name
        updated.bio = bio
      })

      await DataStore.save(updatedUser)
    } else {
      // create a new user
      const authUser = await Auth.currentAuthenticatedUser()

      const newUser = new User({
        sub: authUser.attributes.sub,
        name,
        bio,
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg',
      })
      await DataStore.save(newUser)
    }

    Alert.alert('User saved successfully')
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
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

        <Pressable onPress={() => signOut()} style={styles.button}>
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
    padding: 10,
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
