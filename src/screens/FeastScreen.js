import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  View,
  // Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  // FlatList,
  // RefreshControl,
} from 'react-native'
import {
  Modal,
  // View,
  Input,
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  Container,
  Card,
  Icon,
  Flex,
} from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import useFeasts from '../hooks/useFeasts'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useAuthContext } from '../context/AuthProvider'
import { apiURL, queryKeys } from '../lib/constants'
import axios from 'axios'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
// import useRefetchOnFocus from '../hooks/useRefetchOnFocus'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Moment from 'react-moment'
import CustomButton from '../components/CustomButton'

const deleteFeast = async (feastId, token) => {
  // Add JWT to headers
  const headers = { authorization: `Bearer ${token}` }

  // Make DELETE request to server to delete the feast
  const { data } = await axios.delete(`${apiURL.remote}/api/feast/${feastId}`, {
    headers,
  })

  return data
}

const FeastScreen = ({ navigation }) => {
  const [currentFeast, setCurrentFeast] = feastState.use()
  const [selectedFeast, setSelectedFeast] = feastState.use()
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  const { feasts, refetch, isLoading } = useFeasts()

  useEffect(() => {
    refetch()
  }, [])

  const deleteItem = useMutation(
    ({ feastId, token }) => deleteFeast(feastId, token),
    {
      onSuccess: (data) => {
        // console.warn('deleteFeast success:', data)
        // queryClient.invalidateQueries([queryKeys.feasts])
        refetch()
      },
      onError: (error) => {
        console.warn('deleteFeast error:', error)
      },
    }
  )

  const onEditPress = (item) => {
    // console.warn(`Edit pressed for ${item.name}`)

    setSelectedFeast(item)
    // setIsEditing(true)
    navigation.push('EditFeast')
  }

  const onDeletePress = (feast) => {
    // console.warn(`Delete pressed for ${feast.name}`)
    const feastId = feast.id
    const token = user.token

    deleteItem.mutate({ feastId, token })
  }

  const handlePlaceSelect = (item) => {
    setCurrentFeast(item)
    setSelectedFeast(item)

    if (item.closed) {
      navigation.push('Winner', { feast: item })
    } else {
      navigation.navigate('Home', { feast: item })
    }
  }

  const getHeader = () => {
    return (
      <>
        <Center>
          <Text style={styles.title}>Your Feasts</Text>
        </Center>
      </>
    )
  }

  const getFooter = () => {
    return (
      <Center>
        <CustomButton
          text={'Create new'}
          onPress={() => navigation.navigate('NewFeast')}
        />
      </Center>
    )
  }

  if (deleteItem.isLoading) return <LoadingIndicator />
  if (isLoading) return <LoadingIndicator />

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      {feasts.length > 0 ? (
        <VStack px="3" mx="4" mt="4">
          <FlatList
            data={feasts}
            ListHeaderComponent={getHeader}
            ListFooterComponent={getFooter}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'muted.50',
                  }}
                  borderColor="muted.800"
                  borderRadius="md"
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py="2"
                  mx="2"
                >
                  <Pressable onPress={() => handlePlaceSelect(item)}>
                    <HStack space={'1'} justifyContent="space-between" px="3">
                      <Flex direction="row" mb="2.5" mt="1.5">
                        <Icon
                          as={MaterialIcons}
                          name={item.closed ? 'where-to-vote' : 'how-to-vote'}
                          size="4xl"
                          color={item.closed ? 'rose.400' : 'green.600'}
                        />
                        {/* <Spacer /> */}
                        <VStack ml="3">
                          <Text bold style={styles.feastName}>
                            {item.name}
                          </Text>
                          <Moment
                            date={item.endDate}
                            element={Text}
                            format="MM/DD/YYYY"
                            style={styles.date}
                          />
                        </VStack>
                      </Flex>
                      {/* <HStack space={'3'}> */}
                      <Flex direction="row" m={'3'}>
                        <Pressable
                          onPress={() => onEditPress(item)}
                          style={tw`pr-3`}
                        >
                          <FontAwesome name="edit" size={24} color="black" />
                        </Pressable>
                        <Pressable onPress={() => onDeletePress(item)}>
                          <MaterialIcons
                            name="delete"
                            size={24}
                            color="black"
                          />
                        </Pressable>
                      </Flex>
                      {/* </HStack> */}
                    </HStack>
                  </Pressable>
                  {/* </Card> */}
                </Box>
              )
            }}
          />
        </VStack>
      ) : (
        <Box>
          <Text style={[tw`text-center mt-8`, styles.title]}>
            You don't have any feasts yet 😲
          </Text>

          <Center>
            <CustomButton
              onPress={() => navigation.navigate('NewFeast')}
              text={'Create one!'}
            />
          </Center>
        </Box>
      )}
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
    marginBottom: 10,
    paddingVertical: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  container: {
    marginTop: 10,
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
  cardContainer: {
    margin: 8,
    padding: 16,
    borderRadius: 10,
    bottomBorderWidth: 1,
    bottomBorderColor: 'gray',
    elevation: 2,
    shadowColor: '#212121',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  feastName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
})

export default FeastScreen
