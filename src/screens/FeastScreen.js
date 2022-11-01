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
import { DataStore } from 'aws-amplify'
import { Feast } from '../models'
import DatePicker from 'react-native-date-picker'

const FeastScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [endsAt, setEndsAt] = useState(new Date())
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [distance, setDistance] = useState(0)




  // useEffect(() => {
    
  // }, [])

  const isValid = () => {
    return name && bio
  }

  const save = async () => {
    if (!isValid()) {
      console.warn('Not valid')
      return
    }
    // create a new feast
    try {
      const newFeast = new Feast({
        sub: authUser.attributes.sub,
        name,
        bio,
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg',
      })
      await DataStore.save(newFeast)

      Alert.alert('Feast saved successfully')
      navigation.navigate('Home')
    } catch (error) {
      console.warn(`Error saving feast: ${error}`)
    }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Feast name..."
          value={name}
          onChangeText={setName}
        />

        <DatePicker 
          date={endsAt}
          onDateChange={setEndsAt}
        />

        <Pressable onPress={save} style={styles.button}>
          <Text>Save</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Home')} style={styles.button}>
          <Text>Cancel</Text>
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
