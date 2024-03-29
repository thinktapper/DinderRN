import React, { useState } from 'react'
import { URL } from 'react-native-url-polyfill'
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
import tw from 'twrnc'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useMutation } from '@tanstack/react-query'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useAuthContext } from '../context/AuthProvider'
import { feastState } from '../context/FeastState'
import axios from 'axios'
import { apiURL } from '../lib/constants'
import CustomButton from './CustomButton'

const submitFeast = async (selectedFeast, formData, user) => {
  const response = await axios(
    `${apiURL.remote}/api/feast/${selectedFeast.id}`,
    {
      method: 'PUT',
      data: { ...formData },
      headers: {
        // prettier-ignore
        'authorization': `Bearer ${user?.token}`,
      },
    }
  )
  // console.warn('submitFeast:', JSON.stringify(response))
  return response.data
}

function EditFeastForm({ props }) {
  const { onFeastEdited, navigation } = props
  const selectedFeast = feastState.useValue()
  const { user } = useAuthContext()
  const [showAlert, setShowAlert] = useState(false)
  const [formData, setFormData] = useState({
    name: selectedFeast?.name,
    image: selectedFeast?.image || '',
    startDate: new Date(selectedFeast?.startDate),
    endDate: new Date(selectedFeast?.endDate),
    // location: selectedFeast.location,
    // radius: selectedFeast?.radius,
  })

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleEditFeast = () => {
    editFeast.mutate({ selectedFeast, formData, user })
  }

  const editFeast = useMutation(
    ({ selectedFeast, formData, user }) =>
      submitFeast(selectedFeast, formData, user),
    {
      onSuccess: (response) => {
        return onFeastEdited(response)
      },
      onError: (error) => {
        console.warn('error', error)
      },
      // onSettled: () => {
      // navigation.goBack()
      // },
    }
  )

  return (
    <>
      <Box safeArea flex={1} w="100%">
        <Heading
          alignSelf={'center'}
          size="lg"
          color="coolGray.800"
          fontWeight="bold"
        >
          Edit{' '}
          <Text style={tw`text-rose-500 text-2xl font-extrabold`}>
            {selectedFeast?.name}
          </Text>{' '}
          feast
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
        {editFeast.isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <VStack space={3} mt="5">
              <Box>
                <FormControl my={'5'}>
                  <FormControl.Label>Feast Name</FormControl.Label>
                  <Center w="100%" h="20" rounded="lg" shadow={3}>
                    <Input
                      placeholder={selectedFeast?.name}
                      value={formData.name}
                      onChangeText={(text) => handleChange('name', text)}
                      variant="rounded"
                      size="xl"
                      bgColor="white"
                    />
                  </Center>

                  <FormControl.Label>Feast Image</FormControl.Label>
                  <Center w="100%" h="20" rounded="lg" shadow={3}>
                    <Input
                      placeholder="Direct link, e.g. https://i.imgur.com/8BDXWCv.jpg"
                      value={formData.image}
                      onChangeText={(text) => handleChange('image', text)}
                      variant="rounded"
                      size="xl"
                      bgColor="white"
                    />
                  </Center>

                  <Box
                    flex={1}
                    w="100%"
                    rounded="lg"
                    shadow={3}
                    alignSelf="center"
                  >
                    <HStack alignItems="center">
                      <Center size="20" w="50%" py="3" flex={1}>
                        <Text fontWeight="semibold" fontSize="md">
                          Voting start
                        </Text>
                        {/* <Moment
                          date={selectedFeast?.startDate}
                          element={Text}
                          format="MM/DD/YYYY"
                        /> */}
                        <RNDateTimePicker
                          // display="inline"
                          mode="date"
                          value={formData.startDate}
                          minimumDate={new Date()}
                          style={tw`mt-2`}
                          onChange={(e, selectedDate) => {
                            handleChange('startDate', selectedDate)
                          }}
                        />
                      </Center>
                      <Center size="20" w="50%" py="3" flex={1}>
                        <Text fontWeight="semibold" fontSize="md">
                          Voting end
                        </Text>
                        {/* <Moment
                          date={selectedFeast?.endDate}
                          element={Text}
                          format="MM/DD/YYYY"
                        /> */}
                        <RNDateTimePicker
                          // display="inline"
                          mode="date"
                          value={formData.endDate}
                          minimumDate={new Date()}
                          style={tw`mt-2`}
                          onChange={(e, selectedDate) => {
                            handleChange('endDate', selectedDate)
                          }}
                        />
                      </Center>
                    </HStack>
                  </Box>

                  {/* <Box mt={'1'}>
                    <Text
                      textAlign="center"
                      fontWeight="semibold"
                      fontSize="md"
                    >
                      {`${selectedFeast?.radius} mile radius`}
                    </Text>
                    <Box top={'-60'}>
                      <Picker
                        label="Radius"
                        selectedValue={formData.radius}
                        onValueChange={
                          (itemValue) => handleChange('radius', itemValue)
                          // setRadius(itemValue)
                        }
                      >
                        <PickerIOS.Item label="1 Mile" value={1} />
                        <PickerIOS.Item label="2 Miles" value={2} />
                        <PickerIOS.Item label="3 Miles" value={3} />
                        <PickerIOS.Item label="4 Miles" value={4} />
                        <PickerIOS.Item label="5 Miles" value={5} />
                      </Picker>
                    </Box>
                  </Box> */}

                  {/* <Button
                    mt="5"
                    colorScheme="rose"
                    onPress={() => handleEditFeast()}
                  >
                    <Text>Edit Feast</Text>
                  </Button> */}

                  <Center mt={'3'}>
                    <CustomButton
                      text={'Edit Feast'}
                      onPress={() => handleEditFeast()}
                    />
                  </Center>
                </FormControl>

                {editFeast.isLoading && (
                  <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Submitting feast" />
                    <Heading color="primary.500" fontSize="md">
                      Submitting update...
                    </Heading>
                  </HStack>
                )}
                {editFeast.error && (
                  <Box w="100%" alignItems="center">
                    <Collapse isOpen={showAlert}>
                      <Alert maxW="400" status="error">
                        <VStack space={1} flexShrink={1} w="100%">
                          <HStack
                            flexShrink={1}
                            space={2}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <HStack
                              flexShrink={1}
                              space={2}
                              alignItems="center"
                            >
                              <Alert.Icon />
                              <Text
                                fontSize="md"
                                fontWeight="medium"
                                _dark={{
                                  color: 'coolGray.800',
                                }}
                              >
                                Failed to edit feast
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
                            }}
                          >
                            {editFeast.error.message}
                          </Box>
                        </VStack>
                      </Alert>
                    </Collapse>
                  </Box>
                )}
              </Box>
            </VStack>
          </>
        )}
      </Box>
    </>
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

export default EditFeastForm
