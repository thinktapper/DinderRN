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
import { LoadingIndicator } from '../components/LoadingIndicator'
import { Formik } from 'formik'
import * as Yup from 'yup'
import tw from 'twrnc'
import { Picker } from '@react-native-picker/picker'
import { useMutation, useQueryClient } from '@tanstack/react-query'
// import DateTimePicker from '@react-native-community/datetimepicker'
// import SearchBarWithAutocomplete from '../components/SearchBarAutocomplete'
// import { useDebounce } from '../utils/useDebounce'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import { useAppContext } from '../context/AppProvider'
import { useAuthContext } from '../context/AuthProvider'
import {
  KeyboardAwareSectionList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
// import { useCreateFeast } from '../hooks/useCreateFeast'
// import { queryClient } from '../lib/queryClient'
import CreateFeastForm from '../components/CreateFeastForm'

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
  const queryClient = useQueryClient()
  // const createFeast = useCreateFeast()
  // const queryClient = useQueryClient()
  // const { user } = useAuthContext()
  // const [feastName, setFeastName] = useState('')
  // const [image, setImage] = useState(null)
  // const [startsAt, setStartsAt] = useState(null)
  // const [endsAt, setEndsAt] = useState(new Date())
  // const [location, setLocation] = useState({ lat: 0, long: 0 })
  // const [radius, setRadius] = useState(1)

  // const mutation = useMutation({
  //   mutationFn: (values) => {
  //     return axios({
  //       url: 'http://localhost:3000/api/feast',
  //       method: 'post',
  //       headers: { authorization: `Bearer ${user?.token}` },
  //       data: { ...values },
  //     })
  //   },
  // })

  // // const autocompleteRef = useRef()

  // // const isValid = () => {
  // //   return feastName && image && endsAt && radius && location
  // // }

  // // const save = async () => {
  // //   if (!isValid) {
  // //     console.debug('Not valid')
  // //     return
  // //   }
  // //   const values = {
  // //     name: feastName,
  // //     image: image,
  // //     location: location,
  // //     endsAt: endsAt.toISOString(),
  // //     radius: radius,
  // //   }
  // //   console.log(values)

  // //   createFeast.mutate(values, {
  // //     onSuccess: () => {
  // //       queryClient.invalidateQueries('feasts')
  // //       navigation.pop('Feasts')
  // //     },
  // //     onError: (err) => {
  // //       console.warn(`Error saving feast: ${err.message}`)
  // //     },
  // //     onSettled: (data, error) => {},
  // //   })

  // //   // try {
  // //   //   // onSaveClick()
  // //   //   mutate(values)
  // //   //   // Alert.alert('Feast info saved successfully')
  // //   //   navigation.pop('Feasts')
  // //   // } catch (err) {
  // //   //   console.warn(`Error saving feast: ${err}`)
  // //   // }

  // //   // try {
  // //   //   const response = await axios({
  // //   //     url: 'http://localhost:3000/api/feast',
  // //   //     method: 'post',
  // //   //     headers: { authorization: `Bearer ${authContext.user.token}` },
  // //   //     data: { ...values },
  // //   //   })
  // //   //     .then((res) => console.log(JSON.stringify(res)))
  // //   //     .catch((res, err) => console.log(err, JSON.stringify(res)))

  // //   //   // if (response.data.success) {
  // //   //   //   queryClient.invalidateQueries('feasts')
  // //   //   //   // ctx.setCurrentFeast(response.data.feast)
  // //   //   //   // setFeasts(response.data.feasts)
  // //   //   //   // setCurrentFeast(response.data.feast)
  // //   //   //   Alert.alert('Feast info saved successfully')
  // //   //   //   navigation.navigate('Home', { feast: response.data.feast })
  // //   //   // } else {
  // //   //   //   console.warn('woops')
  // //   //   // }
  // //   // } catch (err) {
  // //   //   console.log(`Error saving feast: ${err}`)
  // //   // }
  // // }

  // return (
  //   <SafeAreaView style={styles.root}>
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Create a new feast</Text>

  //       <TextInput
  //         style={styles.input}
  //         placeholder="Feast name..."
  //         // placeholder={
  //         //   appContext.feastName ? appContext.feastName : 'Feast name...'
  //         // }
  //         value={feastName}
  //         onChangeText={setFeastName}
  //       />
  //     </View>

  //     <ScrollView
  //       keyboardShouldPersistTaps="handled"
  //       contentContainerStyle={{ flexGrow: 1 }}
  //       horizontal>
  //       <GooglePlacesAutocomplete
  //         placeholder="Type a location"
  //         fetchDetails={true}
  //         onPress={(data, details = null) => {
  //           // 'details' is provided when fetchDetails = true
  //           // console.warn(data, details)
  //           const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?parameters&maxwidth=400&photoreference=${details.photos[0].photo_reference}&key=${GOOGLE_API}`
  //           setImage(imageUrl)
  //           setLocation({
  //             lat: details.geometry.location.lat,
  //             long: details.geometry.location.lng,
  //           })
  //         }}
  //         query={{
  //           key: GOOGLE_API,
  //         }}
  //         onFail={(error) => console.warn(error)}
  //         onNotFound={() => console.warn('no results')}
  //         listViewDisplayed="auto"
  //         listEmptyComponent={() => (
  //           <View style={{ flex: 1 }}>
  //             <Text>No results were found</Text>
  //           </View>
  //         )}
  //         styles={{
  //           container: {
  //             flex: 1,
  //           },
  //           textInputContainer: {
  //             flexDirection: 'row',
  //           },
  //           textInput: {
  //             backgroundColor: '#e13959',
  //             color: '#212121',
  //             height: 44,
  //             borderRadius: 20,
  //             paddingVertical: 16,
  //             paddingHorizontal: 16,
  //             fontSize: 16,
  //             flex: 1,
  //           },
  //           listView: {
  //             backgroundColor: '#cfcfcf',
  //             borderBottomLeftRadius: 10,
  //             borderBottomRightRadius: 10,
  //           },
  //           row: {
  //             backgroundColor: '#e13959',
  //             padding: 13,
  //             height: 44,
  //             flexDirection: 'row',
  //             borderBottomColor: 'black',
  //             borderBottomWidth: 1,
  //           },
  //           separator: {
  //             height: 0.5,
  //             backgroundColor: '#c8c7cc',
  //           },
  //           description: {},
  //           loader: {
  //             flexDirection: 'row',
  //             justifyContent: 'flex-end',
  //             height: 20,
  //           },
  //         }}
  //       />
  //     </ScrollView>

  //     <View style={[styles.container, tw`flex-1 justify-around`]}>
  //       <Text style={tw`text-center text-xl font-semibold`}>End date</Text>
  //       {/* <DateTimePicker value={endsAt} onChange={setEndsAt} /> */}
  //       <RNDateTimePicker
  //         // display="inline"
  //         mode="date"
  //         value={endsAt}
  //         minimumDate={new Date()}
  //         style={tw`flex-1 w-full mt-2`}
  //         onChange={(e, selectedDate) => {
  //           setEndsAt(selectedDate)
  //         }}
  //       />
  //     </View>

  //     <ScrollView style={styles.elementContainer}>
  //       <Text>Radius</Text>
  //       <View style={styles.container}>
  //         <Picker
  //           label="Radius"
  //           selectedValue={radius}
  //           onValueChange={(itemValue) => setRadius(itemValue)}>
  //           <Picker.Item label="1 Mile" value={1} />
  //           <Picker.Item label="2 Miles" value={2} />
  //           <Picker.Item label="3 Miles" value={3} />
  //           <Picker.Item label="4 Miles" value={4} />
  //           <Picker.Item label="5 Miles" value={5} />
  //         </Picker>
  //       </View>
  //     </ScrollView>

  //     <Pressable
  //       onPress={() =>
  //         mutation.mutate({
  //           name: feastName,
  //           image,
  //           location,
  //           startsAt,
  //           endsAt: endsAt.toISOString(),
  //           radius,
  //         })
  //       }
  //       style={styles.button}>
  //       <Text>{mutation.isLoading ? 'Loading...' : 'Create Feast'}</Text>
  //     </Pressable>
  //     <Pressable
  //       onPress={() => navigation.navigate('Feasts')}
  //       style={styles.button}>
  //       <Text>Cancel</Text>
  //     </Pressable>

  //     {mutation.isError && <Text>{mutation.error.message}</Text>}
  // </SafeAreaView>
  // )

  const onFeastCreated = (response) => {
    console.warn(JSON.stringify(response))

    if (response.success) {
      console.log('success, you created a feast: ', response.data)

      queryClient.invalidateQueries('feasts')
      Alert.alert('Feast info saved successfully')
      navigation.push('Feasts')
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.body}>
        <Text style={styles.title}>Create a Feast</Text>
        <CreateFeastForm onFeastCreated={onFeastCreated} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
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

  elementContainer: {
    // marginVertical: 10,
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
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
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 72, 147, 0.75)',
    marginTop: 10,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 20,
  },
  placeApiContainer: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'red',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    minHeight: 46,
    marginTop: 5,
    backgroundColor: 'white',
    width: '90%',
  },
  mapInputContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    paddingLeft: 30,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  locationSearchInput: {
    color: '#5d5d5d',
  },
  placeButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})

export default FeastScreen
