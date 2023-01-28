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
} from 'native-base'
// import Flame from '../../assets/images/flame-square.png'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import useFeasts from '../hooks/useFeasts'
import Feast from '../components/Feast'
import { ListItem } from '../components/ListItem'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useAuthContext } from '../context/AuthProvider'
// import { useAppContext } from '../context/AppProvider'
import axios from 'axios'
import EditFeastModal from '../components/EditFeastModal'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
import useRefetchOnFocus from '../hooks/useRefetchOnFocus'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../lib/constants'

const deleteFeast = async (feastId, token) => {
  // Add JWT to headers
  const headers = { authorization: `Bearer ${token}` }

  // Make DELETE request to server to delete the poll
  const { data } = await axios.delete(
    `http:localhost:3000/api/feast/${feastId}`,
    { headers },
  )

  return data
}

const FeastScreen = ({ navigation }) => {
  const [currentFeast, setCurrentFeast] = feastState.use()
  const [selectedFeast, setSelectedFeast] = feastState.use()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  // const feastsArr = useFeasts()
  const feasts = useFeasts()

  const deleteItem = useMutation(
    ({ feastId, token }) => deleteFeast(feastId, token),
    {
      onSuccess: (data) => {
        console.warn('deleteFeast success:', data)
        queryClient.invalidateQueries(queryKeys.feasts)
      },
      onError: (error) => {
        console.log('deleteFeast error:', error)
      },
    },
  )

  // const onEditPress = (freshFeast) => {
  //   // console.warn(`Edit pressed for ${feast}`)
  //   const feastId = selectedFeast.id
  //   // const updatedFeast = feast
  //   const token = user.token

  //   updateFeast.mutate({ feastId, freshFeast, token })
  // }

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

  const getHeader = () => {
    return (
      <>
        {/* <Header /> */}
        <Text style={styles.title}>Your Feasts</Text>
        <Box>
          <Pressable
            onPress={() => navigation.navigate('NewFeast')}
            style={styles.button}>
            <Text>Create new</Text>
          </Pressable>
        </Box>
      </>
    )
  }

  const getFooter = () => {
    return (
      <Box>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text>Back to deck</Text>
        </Pressable>
      </Box>
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      <Header />

      {feasts.length > 0 ? (
        <VStack px="3">
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
                  pl={['0', '4']}
                  pr={['0', '5']}
                  py="2">
                  <Pressable
                    onPress={() => {
                      setSelectedFeast(item)
                      // setIsEditing(true)
                      navigation.push('Home', { feast: item })
                    }}>
                    <HStack space={[2, 3]} justifyContent="space-between">
                      {item.image && (
                        <Avatar
                          size="md"
                          source={{ uri: item.image }}
                          alignSelf="center"
                        />
                      )}
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
                          {item.closed ? 'Closed' : 'Open'}
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
                      {/* <HStack> */}
                      <Pressable
                        onPress={() => {
                          setSelectedFeast(item)
                          setIsEditing(true)
                          navigation.push('EditFeast')
                        }}>
                        <FontAwesome name="edit" size={24} color="black" />
                      </Pressable>
                      <Pressable onPress={() => onDeletePress(item)}>
                        <MaterialIcons name="delete" size={24} color="black" />
                      </Pressable>
                      {/* </HStack> */}
                    </HStack>
                  </Pressable>
                </Box>
                // />
              )
            }}
          />
        </VStack>
      ) : (
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
})

export default FeastScreen
