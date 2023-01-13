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
  RefreshControl,
} from 'react-native'
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
} from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import { useUserFeasts } from '../hooks/useFeasts'
import Feast from '../components/Feast'
import { ListItem } from '../components/ListItem'
import { LoadingIndicator } from '../components/LoadingIndicator'
// import { Divider } from 'native-base'
import { useAuthContext } from '../context/AuthProvider'
import { useAppContext } from '../context/AppProvider'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { produce } from 'immer'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
import { queryKeys } from '../lib/constants'
import useRefetchOnFocus from '../hooks/useRefetchOnFocus'

const getUserFeasts = async (userId) => {
  const { data } = await axios({
    url: 'http://localhost:3000/api/user/feasts',
    method: 'get',
    headers: { authorization: `Bearer ${userId}` },
  })
  return data.feasts
}

const FeastScreen = ({ navigation }) => {
  const [feasts, setFeasts] = useState([])
  const [currentFeast, setCurrentFeast] = useState(null)

  // const [feasts, setFeasts] = feastState.use()
  // const [currentFeast, setCurrentFeast] = feastState.use()
  const { user } = useAuthContext()
  // const ctx = useAppContext()
  // const feastsRef = useRef(true)
  // const { feasts, isLoading, error } = useUserFeasts()

  const userId = user?.token

  const { data, refetch, isLoading, isFetching, isError, error } = useQuery(
    [queryKeys.feasts],
    async () => {
      const response = await getUserFeasts(userId) //fetch('https://your-api.com/data')
      return response
    },
  )

  useRefetchOnFocus(refetch)

  // useLayoutEffect(() => {
  //   // subscribe to feastState changes outside React
  //   feastState.subscribe((newState, oldState) => {
  //     console.log('Feast State changed')
  //   })

  //   // call the returned unsubscribe function to unsubscribe.
  //   unsubscribe()
  // }, [])

  // const datas = useUserFeasts()
  // useEffect(() => {

  //   let unsub
  //   const fetchUserFeasts = async () => {
  //     unsub = await getUserFeasts()
  //     if (unsub.data.success) {
  //       setPlaces(
  //         // unsub.data.feast.places,
  //         unsub.data.feast.places.map((place) => ({
  //           ...place,
  //           votes: [],
  //         })),
  //       )
  //     } else {
  //       console.warn(`Failed fetching places for ${currentFeast}`)
  //     }
  //   }
  //   fetchPlaces()
  //   return unsub
  //   getUserFeasts(userId).then((feasts) => {
  //     setFeasts(feasts)
  //     // setFeasts(
  //     //   feasts.map((feast) => ({
  //     //     ...feast,
  //     //     votes: [],
  //     //   })),
  //     // )
  //   })

  //   // return unsub
  // }, [currentFeast])

  // useEffect(() => {
  //   let unsub
  //   const fetchFeasts = async () => {
  //     unsub = await axios({
  //       url: `http://localhost:3000/api/feast/${currentFeast.id}`,
  //       method: 'get',
  //       headers: { authorization: `Bearer ${user.token}` },
  //     })
  //     if (unsub.data.success) {
  //       setFeasts(
  //         unsub.data.feasts.map((feast) => ({
  //           // id: feast.id,
  //           ...feast,
  //           votes: [],
  //         })),
  //       )
  //     } else {
  //       console.warn(`Failed fetching places for ${currentFeast}`)
  //     }
  //   }

  //   fetchFeasts()
  //   return unsub
  // }, [])

  // console.warn(`Feasts: ${JSON.stringify(feasts)}`)

  // const onListItemPress = (item) => {
  //   setCurrentFeast(item)
  //   feastState.set((previous) => {
  //     return produce(previous, (updated) => {
  //       updated.currentFeast = item
  //     })
  //   })
  //   navigation.navigate('Home')
  // }

  const onItemPress = useCallback(
    (item) => {
      // setCurrentFeast(item)
      // feastState.set((previous) => {
      //   return produce(previous, (updated) => {
      //     updated.currentFeast = item
      //   })
      // })

      navigation.navigate('Home', { currentFeast: item })
    },
    [navigation],
  )

  const onEditPress = (feast) => {
    console.warn(`Edit pressed for ${feast}`)
  }

  const onDeletePress = (feast) => {
    console.warn(`Delete pressed for ${feast}`)
  }

  if (isLoading) return <LoadingIndicator />
  if (error) return console.log(error)

  // if (!feasts) return <LoadingIndicator />

  if (!data) return <LoadingIndicator />

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>Your Feasts</Text>

        <Box>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              {
                let pic =
                  item.places?.[0]?.photos?.[0] ||
                  'https://links.papareact.com/6gb'

                return (
                  <Box
                    borderBottomWidth="1"
                    _dark={{
                      borderColor: 'muted.50',
                    }}
                    borderColor="muted.800"
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2">
                    <Pressable onPress={() => onItemPress(item)}>
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Avatar
                          size="64px"
                          source={{ uri: pic }}
                          // source={{
                          // uri: 'https://links.papareact.com/6gb',
                          // uri:
                          //   item.places[0]?.photos[0] ||
                          //   'https://links.papareact.com/6gb',
                          // }}
                        />
                        <VStack>
                          <Text
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold>
                            {item.name}
                          </Text>
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}>
                            {item.createdAt}
                          </Text>
                        </VStack>
                        {/* <Spacer /> */}
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start">
                          {item.places?.length}
                        </Text>
                      </HStack>
                      <HStack>
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
                    </Pressable>
                  </Box>
                  // />
                )
              }
            }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => refetch()}
              />
            }
          />
        </Box>
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
