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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'

const ProfileScreen = () => {
  const [user, setUser] = useState(null)
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [radius, setRadius] = useState(1)

  useEffect(() => {
    const getCurrentUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser()

      const dbUsers = await DataStore.query(User, u =>
        u.sub('eq', authUser.attributes.sub),
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

  const signOut = async () => {
    await DataStore.clear()
    Auth.signOut()
  }

  const getCoords = details => {
    // console.warn(details)
    try {
      setLat(details.geometry.location.lat)
      setLong(details.geometry.location.lng)
    } catch (error) {
      console.warn(`Could not set coords: ${error}`)
    }
    // } finally {
    //   console.warn(`Latitude set to: ${lat}, Longitude set to: ${long}`)
    // }
  }

  const isValid = () => {
    return name && bio && lat && long && radius
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
        updated.lat = lat
        updated.long = long
        updated.radius = radius
        // updated.places = places
      })

      await DataStore.save(updatedUser)
    } else {
      // create a new user
      const authUser = await Auth.currentAuthenticatedUser()

      const newUser = new User({
        sub: authUser.attributes.sub,
        name,
        bio,
        image: 'https://ptpimg.me/ud7dea.png',
        lat,
        long,
        radius,
      })
      await DataStore.save(newUser)
    }

    Alert.alert('User saved successfully')
    navigation.navigate('Home', { lat, long, radius })
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

        {/* <SafeAreaView> */}
        <GooglePlacesAutocomplete
          placeholder="Type a location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.warn(data, details)
            getCoords(details)
          }}
          query={{
            key: GOOGLE_API,
          }}
          onFail={error => console.log(error)}
          onNotFound={() => console.warn('no results')}
          listEmptyComponent={() => (
            <View style={{ flex: 1 }}>
              <Text>No results were found</Text>
            </View>
          )}
        />
        {/* </SafeAreaView> */}

        {/* <View> */}
        <Text>Radius</Text>
        <Picker
          label="Radius"
          selectedValue={radius}
          onValueChange={itemValue => setRadius(itemValue)}>
          <Picker.Item label="1 Mile" value={1} />
          <Picker.Item label="2 Miles" value={2} />
          <Picker.Item label="3 Miles" value={3} />
          <Picker.Item label="4 Miles" value={4} />
          <Picker.Item label="5 Miles" value={5} />
        </Picker>
        {/* </View> */}

        <Pressable onPress={save} style={styles.button}>
          <Text>Save</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text>Cancel</Text>
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
