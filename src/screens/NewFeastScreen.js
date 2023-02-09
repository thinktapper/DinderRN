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
import tw from 'twrnc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CreateFeastForm from '../components/CreateFeastForm'
import { queryKeys } from '../lib/constants'

const NewFeastScreen = ({ navigation }) => {
  const queryClient = useQueryClient()

  const onFeastCreated = (response) => {
    console.log('success, you created a feast: ', response.data)

    // @ts-ignore
    queryClient.invalidateQueries(queryKeys.feasts)

    navigation.navigate('Feasts')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Center w="100%" padding={10}>
        <CreateFeastForm props={{ queryClient, navigation, onFeastCreated }} />
      </Center>
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

export default NewFeastScreen
