import React, { useState } from 'react'
import { URL } from 'react-native-url-polyfill'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  // Text,
  Alert,
  Image,
  View,
} from 'react-native'
import {
  Stack,
  Container,
  Collapse,
  Checkbox,
  VStack,
  HStack,
  Spinner,
  Heading,
  Box,
  Toast,
  Input,
  Button,
  IconButton,
  CloseIcon,
  FormControl,
  Center,
  Pressable,
  // Alert,
  Text,
  Flex,
} from 'native-base'
import { EvilIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoadingIndicator } from '../components/LoadingIndicator'
import {
  useMutation,
  useAsyncMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API } from '@env'
import { apiURL } from '../lib/constants'
import { PickerIOS, Picker } from '@react-native-picker/picker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useAuthContext } from '../context/AuthProvider'
import axios from 'axios'
import useUsers from '../hooks/useUsers'

const submitFeast = async (formData, user) => {
  const response = await axios(`${apiURL.local}/api/feast`, {
    method: 'POST',
    data: { ...formData },
    headers: {
      // prettier-ignore
      'authorization': `Bearer ${user?.token}`,
    },
  })
  console.warn('submitFeast:', JSON.stringify(response))
  return response.data
}

function CreateFeastForm({ props }) {
  const { navigation, onFeastCreated } = props
  const { user } = useAuthContext()
  const guests = useUsers()
  const [groupValues, setGroupValues] = useState([])
  const [guestArr, setGuestArr] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    startDate: new Date(),
    endDate: new Date(),
    location: { lat: 0, long: 0 },
    radius: 1,
    guests: [],
  })

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const getPhotoUri = async (photoRef) => {
    let imageUrl
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo`,
      {
        responseType: 'blob',
        params: {
          key: GOOGLE_API,
          photoreference: photoRef,
          maxwidth: 400,
        },
      },
    )
    // const imageUrl = URL.createObjectURL(response.data.request._url)
    const imageLookupUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API}`

    const imgageUrlQuery = await fetch(imageLookupUrl)
      .then((res) => res.blob())
      .catch((err) => console.error(err))
      .finally(() => {
        imageUrl = imgageUrlQuery
      })
    imageUrl = URL.createObjectURL(imgageUrlQuery)
    // handleChange('image', JSON.stringify(imageUrl))

    console.debug(
      'getPhotoUri:',
      imgageUrlQuery,
      // JSON.stringify(response),
      'imageUrl obj:',
      JSON.stringify(imageUrl),
    )

    return JSON.stringify(imageUrl)
    // return response.data.request._url
  }

  async function handlePlaceSelect(data, details) {
    // console.debug('details:', JSON.stringify(details))
    // const photoRef = details.photos?.[0]?.photo_reference
    // console.debug('photoRef:', JSON.stringify(photoRef))
    // const photoUri = await getPhotoUri(photoRef)

    // console.debug('photoUri:', JSON.stringify(photoUri))
    // handleChange('image', photoUri)
    // let imageUrl = ''
    // if (photoRef) {
    //   const imageLookupUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API}`
    //   const imgageUrlQuery = await fetch(imageLookupUrl)
    //     .then((res) => res.blob())
    //     .catch((err) => console.error(err))
    //     .finally(() => {
    //       imageUrl = imgageUrlQuery
    //       handleChange('image', imageUrl)
    //     })
    // const imageUrl = URL.createObjectURL(imgageUrlQuery)
    // handleChange('image', imageUrl)
    // }

    handleChange('location', {
      lat: details.geometry.location.lat,
      long: details.geometry.location.lng,
    })
  }

  const handleCreateFeast = () => {
    // handleChange('guests', guestArr)
    // let guestsArrData = []
    try {
      // if (guestArr.length > 0) {
      //   guestArr.forEach((val) => guestsArrData.push(val))
      // }
      // setGuestArr(...guestsArrData)
      setFormData({ ...formData, guests: guestArr })
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   [guests]: guestsArrData,
      // }))
      console.log(
        guestArr.length,
        // formData.guests.length,
        // guestsArrData.length,
        JSON.stringify(formData),
        // {
        //   ...formData.guests,
        // },
      )
      // if (formData.guests.length) {
      createFeast.mutate({ formData, user })
      // } else {
      //   console.debug(
      //     `Did not send mutation bc formData.guests.length fail, see: ${JSON.stringify(
      //       formData.guests,
      //     )}}`,
      //   )
      // }
    } catch (err) {
      console.debug(`ERROR setting guests array in formData: ${err}`)
    }
  }

  const createFeast = useMutation(
    ({ formData, user }) => submitFeast(formData, user),
    {
      onSuccess: (response) => {
        return onFeastCreated(response)
      },
      onError: (error) => {
        console.log('error', error)
      },
    },
  )

  return (
    <ScrollView style={tw`flex-1 w-full`}>
      {/* <Box safeArea flex={1} w="100%"> */}
      <Heading size="lg" color="coolGray.800" fontWeight="bold">
        Create a Feast
      </Heading>
      <IconButton
        icon={<CloseIcon size="sm" />}
        position="absolute"
        top={1}
        right={1}
        rounded="full"
        variant="ghost"
        colorScheme="rose"
        onPress={() => navigation.goBack()}
      />
      {createFeast.isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <VStack space={3} mt="5">
            <Center w="100%" h="20" rounded="lg" shadow={3}>
              <Input
                placeholder="Feast name..."
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                variant="rounded"
                size="xl"
                bgColor="white"
              />
            </Center>
            <Center w="100%" rounded="lg" shadow={3}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
                horizontal>
                <GooglePlacesAutocomplete
                  enablePoweredByContainer={false}
                  placeholder="Type a location"
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.warn(data, details)
                    handlePlaceSelect(data, details)
                  }}
                  query={{
                    key: GOOGLE_API,
                  }}
                  onFail={(error) => console.debug(error)}
                  onNotFound={() => console.debug('no results')}
                  listViewDisplayed="auto"
                  listEmptyComponent={() => (
                    <View style={{ flex: 1 }}>
                      <Text>No results were found</Text>
                    </View>
                  )}
                  styles={{
                    container: {
                      flex: 1,
                      // maxWidth: 300,
                    },
                    textInputContainer: {
                      flexDirection: 'row',
                    },
                    textInput: {
                      // backgroundColor: '#e13959',
                      // color: '#212121',
                      height: 44,
                      borderRadius: 20,
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      fontSize: 16,
                      flex: 1,
                    },
                    listView: {
                      // backgroundColor: '#cfcfcf',
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      paddingHorizontal: 16,
                    },
                    row: {
                      // backgroundColor: '#e13959',
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    },
                    separator: {
                      height: 0.5,
                      // backgroundColor: '#c8c7cc',
                    },
                    description: {},
                    loader: {
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      height: 20,
                    },
                  }}
                />
              </ScrollView>
            </Center>

            <Box flex={1} w="100%" rounded="lg" shadow={3} alignSelf="center">
              <HStack alignItems="center">
                <Center size="20" w="50%" py="3" flex={1}>
                  <Text fontWeight="semibold" fontSize="md">
                    Voting start
                  </Text>
                  <RNDateTimePicker
                    // display="inline"
                    mode="date"
                    value={formData.startDate}
                    minimumDate={new Date()}
                    style={tw`flex-1 w-full mt-2`}
                    onChange={(e, selectedDate) => {
                      handleChange('startDate', selectedDate)
                    }}
                  />
                </Center>
                <Center size="20" w="50%" py="3" flex={1}>
                  <Text fontWeight="semibold" fontSize="md">
                    Voting end
                  </Text>
                  <RNDateTimePicker
                    // display="inline"
                    mode="date"
                    value={formData.endDate}
                    minimumDate={new Date()}
                    style={tw`flex-1 w-full mt-2`}
                    onChange={(e, selectedDate) => {
                      handleChange('endDate', selectedDate)
                    }}
                  />
                </Center>
              </HStack>
            </Box>

            <ScrollView style={styles.container}>
              {/* <View style={tw`flex-row justify-evenly`}> */}
              <View>
                <Text textAlign="center" fontWeight="bold">
                  Radius
                </Text>
                <View style={styles.elementContainer}>
                  <Picker
                    label="Radius"
                    selectedValue={formData.radius}
                    onValueChange={(itemValue) =>
                      handleChange('radius', itemValue)
                    }>
                    <PickerIOS.Item label="1 Mile" value={1} />
                    <PickerIOS.Item label="2 Miles" value={2} />
                    <PickerIOS.Item label="3 Miles" value={3} />
                    <PickerIOS.Item label="4 Miles" value={4} />
                    <PickerIOS.Item label="5 Miles" value={5} />
                  </Picker>
                </View>
              </View>
            </ScrollView>

            <ScrollView>
              <Box alignItems="center">
                <VStack space={2}>
                  <HStack alignItems="baseline">
                    <Heading fontSize="md">Guests</Heading>
                  </HStack>
                  <VStack>
                    <Box>
                      <Text>
                        Selected: (
                        {guestArr.length ? guestArr.length : 'None yet 😏'})
                      </Text>
                    </Box>
                  </VStack>
                  <Checkbox.Group
                    colorScheme="rose"
                    defaultValue={guestArr}
                    accessibilityLabel="invite guests"
                    onChange={setGuestArr}>
                    {guests.map((guest) => (
                      <Checkbox key={guest.id} value={guest.username} my="1">
                        <Image
                          style={tw`h-8 w-8 rounded-full py-1`}
                          source={{ uri: guest.image }}
                        />
                        <Text>{guest.username}</Text>
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </VStack>
              </Box>
            </ScrollView>

            <Button
              mt="5"
              colorScheme="rose"
              onPress={() => handleCreateFeast()}>
              <Text>Create Feast</Text>
            </Button>
            {createFeast.isLoading && (
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Submitting feast" />
                <Heading color="primary.500" fontSize="md">
                  Submitting feast...
                </Heading>
              </HStack>
            )}
            {createFeast.error && (
              <Box w="100%" alignItems="center">
                <Collapse isOpen={showAlert}>
                  <Alert maxW="400" status="error">
                    <VStack space={1} flexShrink={1} w="100%">
                      <HStack
                        flexShrink={1}
                        space={2}
                        alignItems="center"
                        justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                          <Alert.Icon />
                          <Text
                            fontSize="md"
                            fontWeight="medium"
                            _dark={{
                              color: 'coolGray.800',
                            }}>
                            Failed to create feast
                          </Text>
                        </HStack>
                        <IconButton
                          variant="unstyled"
                          _focus={{
                            borderWidth: 0,
                          }}
                          icon={<CloseIcon size="3" />}
                          _icon={{
                            color: 'coolGray.600',
                          }}
                          onPress={() => setShowAlert(false)}
                        />
                      </HStack>
                      <Box
                        pl="6"
                        _dark={{
                          _text: {
                            color: 'coolGray.600',
                          },
                        }}>
                        {createFeast.error.message}
                      </Box>
                    </VStack>
                  </Alert>
                </Collapse>
              </Box>
            )}
          </VStack>
        </>
      )}
      {/* </Box> */}
    </ScrollView>
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
  closeButton: {
    position: 'absolute',
    right: '3',
    top: '3',
    zIndex: '1',
    colorScheme: 'coolGray',
    p: '2',
    bg: 'transparent',
    borderRadius: 'sm',
    _web: {
      outlineWidth: 0,
      cursor: 'pointer',
    },
    _icon: {
      color: 'muted.500',
      size: '4',
    },
    _hover: {
      bg: 'muted.200',
    },
    _pressed: {
      bg: 'muted.300',
    },
    _dark: {
      _icon: {
        color: 'muted.400',
      },
      _hover: {
        bg: 'muted.700',
      },
      _pressed: {
        bg: 'muted.600',
      },
    },
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

export default CreateFeastForm
