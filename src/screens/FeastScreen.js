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
  Container,
} from 'native-base'
import Flame from '../../assets/images/flame-square.png'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import useFeasts from '../hooks/useFeasts'
import useFeast from '../hooks/useFeast'
import Feast from '../components/Feast'
import { ListItem } from '../components/ListItem'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useAuthContext } from '../context/AuthProvider'
import { useAppContext } from '../context/AppProvider'
// import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { produce } from 'immer'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
import { queryKeys } from '../lib/constants'
import useRefetchOnFocus from '../hooks/useRefetchOnFocus'

// const getUserFeasts = async (userId) => {
//   const { data } = await axios({
//     url: 'http://localhost:3000/api/user/feasts',
//     method: 'get',
//     headers: { authorization: `Bearer ${userId}` },
//   })
//   return data.feasts
// }

const FeastScreen = ({ navigation }) => {
  const [currentFeast, setCurrentFeast] = feastState.use()
  const feasts = useFeasts()

  const onEditPress = (feast) => {
    console.warn(`Edit pressed for ${feast}`)
  }

  const onDeletePress = (feast) => {
    console.warn(`Delete pressed for ${feast}`)
  }

  // if (isLoading) return <LoadingIndicator />
  // if (error) return console.log(error)

  // if (!feasts) return <LoadingIndicator />

  // if (!data) return <LoadingIndicator />

  const getHeader = () => {
    return (
      <>
        <Header />
        <Text style={styles.title}>Your Feasts</Text>
      </>
    )
  }

  const getFooter = () => {
    return (
      <Box>
        <Pressable
          onPress={() => navigation.navigate('NewFeast')}
          style={styles.button}>
          <Text>Create new</Text>
        </Pressable>
      </Box>
    )
  }

  return (
    <SafeAreaView style={styles.root}>
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
                      setCurrentFeast(item)
                      navigation.push('Home', { feast: item })
                    }}>
                    <HStack space={[2, 3]} justifyContent="space-between">
                      <Avatar
                        size="md"
                        source={
                          item.image
                            ? { uri: item.image }
                            : require('../../assets/images/flame-square.png')
                        }
                        // source={require('../../assets/images/flame-square.png')}
                        alignSelf="center"
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
                      {/* <HStack> */}
                      <Pressable onPress={() => onEditPress(item)}>
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
            // refreshControl={
            //   <RefreshControl
            //     refreshing={isFetching}
            //     onRefresh={() => refetch()}
            //   />
            // }
          />
        </VStack>
      ) : (
        <Box>
          <Pressable onPress={() => navigation.navigate('NewFeast')}>
            <Text style={styles.text}>
              You don't have any feasts yet. Create one!
            </Text>
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
