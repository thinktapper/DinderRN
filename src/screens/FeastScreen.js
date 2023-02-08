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
// import Flame from '../../assets/images/flame-square.png'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import useFeasts from '../hooks/useFeasts'
import Feast from '../components/Feast'
import { ListItem } from '../components/ListItem'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useAuthContext } from '../context/AuthProvider'
import { apiURL, queryKeys } from '../lib/constants'
// import { useAppContext } from '../context/AppProvider'
import axios from 'axios'
import EditFeastModal from '../components/EditFeastModal'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
import useRefetchOnFocus from '../hooks/useRefetchOnFocus'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Moment from 'react-moment'
import moment from 'moment'

const deleteFeast = async (feastId, token) => {
  // Add JWT to headers
  const headers = { authorization: `Bearer ${token}` }

  // Make DELETE request to server to delete the feast
  const { data } = await axios.delete(`${apiURL.local}/api/feast/${feastId}`, {
    headers,
  })

  return data
}

const FeastScreen = ({ navigation }) => {
  const [currentFeast, setCurrentFeast] = feastState.use()
  const [selectedFeast, setSelectedFeast] = feastState.use()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  // if new user or no feasts, don't call useFeasts
  const feasts = useFeasts()

  const deleteItem = useMutation(
    ({ feastId, token }) => deleteFeast(feastId, token),
    {
      onSuccess: (data) => {
        console.warn('deleteFeast success:', data)
        queryClient.invalidateQueries([queryKeys.feasts])
      },
      onError: (error) => {
        console.warn('deleteFeast error:', error)
      },
    },
  )

  const onEditPress = (item) => {
    console.warn(`Edit pressed for ${item.name}`)

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

  if (deleteItem.isLoading) return <LoadingIndicator />
  // if (error) return console.log(error)

  // if (!feasts) return <LoadingIndicator />

  // if (!data) return <LoadingIndicator />

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
          <Pressable
            onPress={() => navigation.navigate('NewFeast')}
            style={tw`w-60 bg-rose-500 my-5 rounded-full`}>
            <Text style={tw`text-white p-3 text-center text-lg`}>
              Create new
            </Text>
          </Pressable>
        </Center>
      </>
    )
  }

  const getFooter = () => {
    return (
      <Center>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={tw`w-60 bg-rose-500 mt-5 rounded-full`}>
          <Text style={tw`text-white p-3 text-center text-lg`}>
            Back to deck
          </Text>
        </Pressable>
      </Center>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   setCurrentFeast(selectedFeast)
  //   if (selectedFeast.closed) {
  //     navigation.push('Winner', { feast: selectedFeast })
  //   } else {
  //     navigation.navigate('Home', { feast: selectedFeast })
  //   }
  // }, [selectedFeast])

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      {feasts.length > 0 ? (
        <VStack px="3" mx="4">
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
                  mx="2">
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
                        <VStack ml="1">
                          <Text bold style={styles.feastName}>
                            {item.name}
                          </Text>
                          <Moment
                            date={item.startDate}
                            element={Text}
                            format="MM/DD/YYYY"
                            style={styles.date}
                          />
                        </VStack>
                      </Flex>
                      <HStack space={'3'}>
                        <Pressable onPress={() => onEditPress(item)}>
                          <FontAwesome name="edit" size={24} color="black" />
                        </Pressable>
                        <Pressable onPress={() => onDeletePress(item)}>
                          <MaterialIcons
                            name="delete"
                            size={24}
                            color="black"
                          />
                        </Pressable>
                      </HStack>
                    </HStack>
                  </Pressable>
                  {/* </Card> */}
                </Box>
              )
            }}
          />
        </VStack>
      ) : (
        // <VStack px="3" mx="4">
        //   <FlatList
        //     data={feasts}
        //     ListHeaderComponent={getHeader}
        //     ListFooterComponent={getFooter}
        //     keyExtractor={(item) => item.id}
        //     renderItem={({ item }) => {
        //       return (
        //         <Box
        //           borderBottomWidth="1"
        //           _dark={{
        //             borderColor: 'muted.50',
        //           }}
        //           borderColor="muted.800"
        //           pl={['0', '4']}
        //           pr={['0', '5']}
        //           py="2"
        //           mx="2">
        //           <Pressable onPress={() => handlePlaceSelect(item)}>
        //             <HStack space={'3'} justifyContent="space-between" px="3">
        //               <Icon
        //                 as={MaterialIcons}
        //                 name={item.closed ? 'where-to-vote' : 'how-to-vote'}
        //                 size="4xl"
        //                 color={item.closed ? 'rose.400' : 'green.600'}
        //               />
        //               <VStack>
        //                 <Text
        //                   _dark={{
        //                     color: 'warmGray.50',
        //                   }}
        //                   color="coolGray.800"
        //                   bold>
        //                   {item.name}
        //                 </Text>
        //                 <Moment
        //                   date={item.startDate}
        //                   element={Text}
        //                   format="MM/DD/YYYY"
        //                 />
        //               </VStack>
        //               {/* <Spacer /> */}

        //               <HStack space={'3'}>
        //                 <Pressable onPress={() => onEditPress(item)}>
        //                   <FontAwesome name="edit" size={24} color="black" />
        //                 </Pressable>
        //                 <Pressable onPress={() => onDeletePress(item)}>
        //                   <MaterialIcons
        //                     name="delete"
        //                     size={24}
        //                     color="black"
        //                   />
        //                 </Pressable>
        //               </HStack>
        //             </HStack>
        //           </Pressable>
        //         </Box>
        //         // />
        //       )
        //     }}
        //   />
        // </VStack>
        <Box>
          <Text style={[tw`text-center mt-8`, styles.title]}>
            You don't have any feasts yet 😲
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('NewFeast')}>
            <Text>Create one!</Text>
          </Pressable>
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
