import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  // Text,
  Alert,
  View,
} from 'react-native'
import {
  Stack,
  Container,
  Collapse,
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
import { PickerIOS, Picker } from '@react-native-picker/picker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useAuthContext } from '../context/AuthProvider'
import axios from 'axios'

const submitFeast = async (formData, user) => {
  const response = await axios('http:localhost:3000/api/feast', {
    method: 'POST',
    data: { ...formData },
    headers: {
      // prettier-ignore
      'authorization': `Bearer ${user?.token}`,
    },
  })
  // console.warn('submitFeast:', JSON.stringify(response))
  return response.data
}

function CreateFeastForm({ props }) {
  const { queryClient, navigation, onFeastCreated } = props
  const { user } = useAuthContext()
  const [showAlert, setShowAlert] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    image: 'https://loremflickr.com/640/480/food',
    startDate: new Date(),
    endDate: new Date(),
    location: { lat: 0, long: 0 },
    radius: 1,
  })

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  function handlePlaceSelect(data, details) {
    console.debug('data:', data, 'details:', details)

    if (details.photos.length > 0) {
      const imageUrl = String.raw`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details.photos[0].photo_reference}&key=${GOOGLE_API}`
      handleChange('image', imageUrl)
    }

    handleChange('location', {
      lat: details.geometry.location.lat,
      long: details.geometry.location.lng,
    })
  }

  const handleCreateFeast = () => {
    createFeast.mutate({ formData, user })
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
      onSettled: () => {
        navigation.goBack
      },
    },
  )

  return (
    <Box safeArea flex={1} w="100%">
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
                      paddingVertical: 16,
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

            <ScrollView style={styles.elementContainer}>
              <Text textAlign="center" fontWeight="bold">
                Radius
              </Text>
              <View style={styles.container}>
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
    </Box>
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
