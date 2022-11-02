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
  ScrollView,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { DataStore } from 'aws-amplify'
import { Feast } from '../models'
import DateTimePicker from '@react-native-community/datetimepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'
import RNDateTimePicker from '@react-native-community/datetimepicker'

const FeastScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [endsAt, setEndsAt] = useState(new Date())
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [distance, setDistance] = useState(0)

  // useEffect(() => {

  // }, [])

  const getCoords = details => {
    // console.warn(details)
    try {
      setLat(details.geometry.location.lat)
      setLong(details.geometry.location.lng)
    } catch (error) {
      console.warn(`Could not set coords: ${error}`)
    } finally {
      console.warn(`Latitude set to: ${lat}, Longitude set to: ${long}`)
    }
  }

  const isValid = () => {
    return name && endsAt && lat && long && distance
  }

  const save = async () => {
    if (!isValid()) {
      console.warn('Not valid')
      return
    }
    // create a new feast
    try {
      const newFeast = new Feast({
        name,
        endsAt: endsAt.toISOString(),
        lat,
        long,
        distance,
      })
      await DataStore.save(newFeast)

      Alert.alert('Feast saved successfully')
      navigation.navigate('Home', { lat, long })
    } catch (error) {
      console.warn(`Error saving feast: ${error}`)
    }
  }
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <Text style={styles.title}>Create a Feast</Text>

        <TextInput
          style={styles.input}
          placeholder="Feast name..."
          value={name}
          onChangeText={setName}
        />
      </View>

      <GooglePlacesAutocomplete
        placeholder="Type a location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.warn(data, details)
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

      <View style={styles.container}>
        <Text>Date</Text>
        <RNDateTimePicker
          // display="inline"
          value={endsAt}
          onChange={(e, selectedDate) => {
            setEndsAt(selectedDate)
          }}
        />

        <Text>Distance</Text>
        <Picker
          label="Distance"
          selectedValue={distance}
          onValueChange={itemValue => setDistance(itemValue)}>
          <Picker.Item label="1 Mile" value={1} />
          <Picker.Item label="2 Miles" value={2} />
          <Picker.Item label="3 Miles" value={3} />
          <Picker.Item label="4 Miles" value={4} />
          <Picker.Item label="5 Miles" value={5} />
        </Picker>

        <Pressable onPress={save} style={styles.button}>
          <Text>Save</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
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
    // alignContent: 'center',
    padding: 10,
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

export default FeastScreen
