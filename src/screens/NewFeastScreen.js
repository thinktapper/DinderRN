import React, { useState, useEffect, useRef } from 'react'
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
import {
  VStack,
  Input,
  Button,
  FormControl,
  NativeBaseProvider,
  Center,
} from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'
import tw from 'twrnc'
import { Picker } from '@react-native-picker/picker'
// import DateTimePicker from '@react-native-community/datetimepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'
import RNDateTimePicker from '@react-native-community/datetimepicker'
// import { useAppContext } from '../context'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'
import {
  KeyboardAwareSectionList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view'

const feastSchema = Yup.object().shape({
  name: Yup.string().required('Feast name required'),
  startDate: Yup.date(),
  endDate: Yup.date(),
  radius: Yup.number()
    .min(1, ({ min }) => `Radius must be at least ${min} mile`)
    .max(5, ({ max }) => `Radius cannot be more than ${max} miles`)
    .required('Radius is required'),
  location: Yup.object()
    .shape({
      lat: Yup.number(),
      long: Yup.number(),
    })
    .required('Location JSON object is required'),
})

const FeastScreen = ({ navigation }) => {
  // const appContext = useAppContext()
  const authContext = useAuthContext()
  const [feastName, setFeastName] = useState('')
  const [feastAddress, setFeastAddress] = useState(null)
  const [location, setLocation] = useState({ lat: 0, long: 0 })
  const [radius, setRadius] = useState(1)
  const [endsAt, setEndsAt] = useState(new Date())
  // const [newEndsAt, setNewEndsAt] = useState(new Date())
  // const feastAddress = appContext.feastAddress
  // const feastName = appContext.feastName
  // const radius = appContext.radius
  // const date = appContext.endsAt
  // const { lat, long } = appContext.coords

  const autocompleteRef = useRef()

  // const handleFeastNameChange = text => {
  //   setNewFeastName(text)
  // }

  // const handleFeastAddressChange = text => {
  //   setNewFeastAddress(text)
  // }

  // const handleRadiusChange = text => {
  //   setNewRadius(text)
  // }

  // const handleEndsAtChange = text => {
  //   setNewEndsAt(text)
  // }

  const isValid = () => {
    return feastName && endsAt && radius && location
  }

  const save = async () => {
    if (!isValid) {
      return Alert.alert('Not valid')
    }

    const values = {
      name: feastName,
      location: JSON.stringify(location),
      endsAt: endsAt,
      radius: radius,
    }

    try {
      const response = await axios({
        url: 'http://localhost:3000/api/feast',
        method: 'post',
        headers: { authorization: `Bearer ${authContext.user.token}` },
        data: { ...values },
      })

      Alert.alert('Feast info saved successfully')

      navigation.navigate('Home')
    } catch (err) {
      console.log(`Error saving feast: ${err}`)
    }
  }
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <Text style={styles.title}>Create or update your Feast</Text>

        <TextInput
          style={styles.input}
          placeholder="Feast name..."
          value={feastName}
          onChangeText={setFeastName}
        />
      </View>

      <View style={tw`flex-1 pt-4`}>
        <GooglePlacesAutocomplete
          // ref={autocompleteRef}
          placeholder="Type a location"
          fetchDetails={true}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLocation({
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng,
            })
            // appContext.getCoords(details)
            // setNewFeastAddress(details.formatted_address)
            // setNewFeastAddress(autocompleteRef.current?.getAddressText())
          }}
          query={{
            key: GOOGLE_API,
            language: 'en',
          }}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.warn('no results')}
          listEmptyComponent={() => (
            <View style={{ flex: 1 }}>
              <Text>No results were found</Text>
            </View>
          )}
        />
      </View>

      <View style={[styles.container, tw`flex-1 justify-around`]}>
        <Text style={tw`text-center text-xl font-semibold`}>End date</Text>
        {/* <DateTimePicker value={endsAt} onChange={setEndsAt} /> */}
        <RNDateTimePicker
          // display="inline"
          mode="date"
          value={endsAt}
          minimumDate={new Date()}
          style={tw`flex-1 w-full mt-2`}
          onChange={(e, selectedDate) => {
            setEndsAt(selectedDate)
          }}
        />
      </View>

      <ScrollView style={styles.elementContainer}>
        <Text>Radius</Text>
        <View style={styles.container}>
          <Picker
            label="Radius"
            selectedValue={radius}
            onValueChange={(itemValue) => setRadius(itemValue)}>
            <Picker.Item label="1 Mile" value={1} />
            <Picker.Item label="2 Miles" value={2} />
            <Picker.Item label="3 Miles" value={3} />
            <Picker.Item label="4 Miles" value={4} />
            <Picker.Item label="5 Miles" value={5} />
          </Picker>
        </View>
      </ScrollView>

      <Pressable onPress={save} style={styles.button}>
        <Text>Save</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text>Cancel</Text>
      </Pressable>
      {/* </View> */}
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
  elementContainer: {
    marginVertical: 10,
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
