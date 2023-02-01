import React from 'react'
import { View, Text, Pressable, Image, SafeAreaView } from 'react-native'
import tw from 'twrnc'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../lib/constants'
import { feastState } from '../context/FeastState'
import { useAuthContext } from '../context/AuthProvider'
import axios from 'axios'
import { LoadingIndicator } from '../components/LoadingIndicator'

const getFeastPulse = async (currentFeast, user) => {
  const response = await axios(
    `http://localhost:3000/api/feast/pulse/${currentFeast.id}`,
    {
      method: 'GET',
      // prettier-ignore
      headers: { 'authorization': `Bearer ${user?.token}` },
    },
  )

  // console.warn(
  //   'getFeastPulse result: STATUS =>',
  //   JSON.stringify(response.status),
  //   'DATA =>',
  //   JSON.stringify(response.data),
  // )

  return response.data
}

const WinnerScreen = ({ navigation, route }) => {
  const feastId = route.params?.feast
  const { user } = useAuthContext()
  const currentFeast = feastState.useValue()

  const {
    // isLoading,
    isInitialLoading,
    isFetching,
    refetch,
    isError,
    error,
    data: winner,
  } = useQuery(
    [queryKeys.winner, currentFeast.name],
    async () => {
      const response = await getFeastPulse(currentFeast, user)
      if (!response.success) {
        console.error(`Network response was not ok -> ${response}`)
      }
      return response.winningPlace
    },
    { enabled: !!currentFeast },
  )

  return (
    <SafeAreaView style={[tw`h-full bg-red-500 pt-20`, { opacity: 0.89 }]}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
          style={tw`h-20 w-full`}
          source={{ uri: 'https://links.papareact.com/mg9' }}
        />
      </View>

      {winner ? (
        <>
          <Text style={tw`text-white text-center text-xl mt-5`}>
            {winner
              ? `${winner.name} wins best place to eat for the ${currentFeast.name} feast!`
              : `The winning place will be determined after ${currentFeast.name}'s voting closes.`}
          </Text>

          <Pressable
            style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}
            onPress={() => refetch()}>
            <Text style={tw`text-center`}>Check Feast Pulse</Text>
          </Pressable>

          <View style={tw`flex-row justify-evenly mt-5`}>
            <Image
              style={tw`h-32 w-32 rounded-full`}
              source={{
                uri: winner.photos
                  ? winner.photos[0]
                  : 'https://loremflickr.com/640/480/food',
              }}
            />
            <Image
              style={tw`h-32 w-32 rounded-full`}
              source={{
                uri: currentFeast.image ? currentFeast.image : user.image,
              }}
            />
          </View>
        </>
      ) : isError ? (
        <Text>Error: {error.message}</Text>
      ) : isInitialLoading ? (
        <LoadingIndicator />
      ) : (
        <Text>Not ready...</Text>
      )}

      <View>{isFetching ? <Text>Refreshing...</Text> : null}</View>

      <Pressable
        style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}
        onPress={() => navigation.navigate('Feasts')}>
        <Text style={tw`text-center`}>Share result</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default WinnerScreen
