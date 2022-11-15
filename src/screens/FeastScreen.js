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
import tw from 'twrnc'
import { Picker } from '@react-native-picker/picker'
import { Auth, DataStore } from 'aws-amplify'
import { Feast, Place, FeastUser } from '../models'
import DateTimePicker from '@react-native-community/datetimepicker'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useAppContext } from '../context/AppProvider'

const FeastScreen = ({ navigation }) => {
  const appContext = useAppContext()
  const [newFeastName, setNewFeastName] = useState('')
  const [newFeastAddress, setNewFeastAddress] = useState('')
  const [newRadius, setNewRadius] = useState(1)
  const [newEndsAt, setNewEndsAt] = useState(new Date())
  const feastAddress = appContext.feastAddress
  const feastName = appContext.feastName
  const radius = appContext.radius
  const date = appContext.endsAt
  const { lat, long } = appContext.coords

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

  // create a new feast in DataStore
  const createDataStoreFeast = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true })

      const newFeast = await DataStore.save(
        new Feast({
          name: appContext.feastName,
          endsAt: appContext.date,
          lat: appContext.coords.lat,
          long: appContext.coords.long,
          radius: appContext.radius,
          organizerID: user.attributes.sub,
          // organizer: user.attributes.id,
        }),
      )
      if (newFeast) {
        Object.entries(newFeast).forEach(([key, value]) =>
          console.log(`${key}: ${value}`),
        )
      }
      // console.debug(`New feast created: ${result}`)
      // setFeast(newFeast)
      // console.debug(`Feast set to: ${feast}`)

      // // fetch places from Google
      // const newPlaces = await handleGetPlaces()
      // setPlaces(newPlaces)

      // save places to DataStore
      for (let place of appContext.places) {
        await DataStore.save(
          new Place({
            googleID: place.googleID,
            name: place.name,
            price: place.price,
            rating: place.rating.toString(),
            ratingsTotal: place.ratingsTotal,
            stars: place.stars,
            photos: [...place.photos],
            description: place.description,
            feastID: newFeast.id,
          }),
        )
      }
      console.debug(`Places saved to DataStore`)

      // save feast to AsyncStorage
      // await setAppData({
      //   feastName: feastName,
      //   feastAddress: feastAddress,
      //   places: places,
      //   endsAt: endsAt,
      // })

      // return newFeast
    } catch (err) {
      console.log(`Error saving new feast to db: ${err.message}`)
    }
  }

  useEffect(() => {
    // Set google places autocomplete address from context
    if (feastAddress) {
      autocompleteRef.current?.setAddressText(feastAddress)
    }
  }, [])

  const isValid = () => {
    return newFeastName && newEndsAt && newRadius
  }

  const save = async () => {
    if (!isValid()) {
      console.warn('Not valid')
      return
    }
    // Get new feast address from google places autocomplete
    // const address = await autocompleteRef.current?.getAddressText()
    // setNewFeastAddress(address)

    // Save feast to context + db and navigate to home
    try {
      const localSave = await appContext.handleSaveFeast({
        newFeastName,
        newFeastAddress,
        newRadius,
        newEndsAt,
      })
      if (localSave) {
        // const result = await appContext.handleSaveDataStore()
        // if (result) {
        //   console.log('Saved feast to db:', result)
        // }
        const dbSave = await createDataStoreFeast()
      }

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
          value={newFeastName}
          onChangeText={setNewFeastName}
        />
      </View>

      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder="Type a location"
        fetchDetails={true}
        minLength={2}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          appContext.getCoords(details)
          setNewFeastAddress(details.formatted_address)
          // setNewFeastAddress(autocompleteRef.current?.getAddressText())
        }}
        query={{
          key: GOOGLE_API,
          language: 'en',
        }}
        onFail={error => console.log(error)}
        onNotFound={() => console.warn('no results')}
        listEmptyComponent={() => (
          <View style={{ flex: 1 }}>
            <Text>No results were found</Text>
          </View>
        )}
      />

      <View style={[styles.container, tw`flex-1 justify-around`]}>
        <Text style={tw`text-center text-xl font-semibold`}>End date</Text>
        {/* <DateTimePicker value={endsAt} onChange={setEndsAt} /> */}
        <RNDateTimePicker
          // display="inline"
          mode="date"
          value={newEndsAt}
          minimumDate={new Date()}
          style={tw`flex-1 w-full mt-2`}
          onChange={(e, selectedDate) => {
            setNewEndsAt(selectedDate)
          }}
        />
      </View>

      <ScrollView style={styles.elementContainer}>
        <Text>Radius</Text>
        <View style={styles.container}>
          <Picker
            label="Radius"
            selectedValue={newRadius}
            onValueChange={itemValue => setNewRadius(itemValue)}>
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
