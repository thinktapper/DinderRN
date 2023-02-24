import React, { useEffect } from 'react'
import { View, Text, Pressable, Image, SafeAreaView } from 'react-native'
import { Center, IconButton, CloseIcon, Box } from 'native-base'
import tw from 'twrnc'
import { useQuery } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import { feastState } from '../context/FeastState'
import { useAuthContext } from '../context/AuthProvider'
import useWinner from '../hooks/useWinner'
import axios from 'axios'
import { LoadingIndicator } from '../components/LoadingIndicator'
import CustomButton from '../components/CustomButton'

// const getFeastPulse = async (feastId, user) => {
//   const response = await axios(
//     `${apiURL.remote}/api/feast/pulse/${feastId.id}`,
//     {
//       method: 'GET',
//       // prettier-ignore
//       headers: { 'authorization': `Bearer ${user?.token}` },
//     },
//   )

//   // console.warn(
//   //   'getFeastPulse result: STATUS =>',
//   //   JSON.stringify(response.status),
//   //   'DATA =>',
//   //   JSON.stringify(response.data),
//   // )

//   return response.data
// }

const WinnerScreen = ({ navigation, route }) => {
  const feastId = route.params?.feast
  const { user } = useAuthContext()
  const currentFeast = feastState.useValue()

  // const { pulse, isLoading, isError, error, refetch } = useWinner(feastId)
  const pulse = useWinner()

  // const {
  //   // isLoading,
  //   isInitialLoading,
  //   isFetching,
  //   refetch,
  //   isError,
  //   error,
  //   data: winner,
  // } = useQuery(
  //   [queryKeys.winner, feastId.id],
  //   async () => {
  //     const response = await getFeastPulse(feastId, user)
  //     if (!response.success) {
  //       console.error(`Network response was not ok -> ${response}`)
  //     }
  //     if (response.winningPlace) {
  //       return response.winningPlace
  //     } else {
  //       return null
  //     }
  //   },
  //   { enabled: !!feastId },
  //   // { enabled: !!currentFeast },
  // )

  // useEffect(() => {
  //   console.debug('WinnerScreen useEffect called')

  //   pulse.refetch()
  // }, [feastId, currentFeast])

  return (
    <SafeAreaView style={[tw`h-full bg-red-500 pt-20`, { opacity: 0.89 }]}>
      <>
        {pulse && pulse.winningPlace ? (
          <Box safeArea flex={1} w="100%">
            <IconButton
              icon={<CloseIcon size="sm" color="white" />}
              position="absolute"
              top={3}
              right={3}
              rounded="full"
              variant="ghost"
              colorScheme="white"
              onPress={() => navigation.goBack()}
            />
            <View style={tw`justify-center px-10 pt-20 mb-2`}>
              <Image
                style={tw`h-20 w-full`}
                source={{ uri: 'https://links.papareact.com/mg9' }}
              />
            </View>

            <Text style={tw`text-white text-center text-xl m-5`}>
              {pulse.winningPlace
                ? `${pulse.winningPlace.name} wins best place to eat for the ${currentFeast.name} feast!`
                : `The winning place will be determined after ${currentFeast.name}'s voting closes.`}
            </Text>

            <Center mt={'3'}>
              <Image
                style={tw`h-50 w-50 rounded-full`}
                source={{
                  uri: pulse.winningPlace.photos
                    ? pulse.winningPlace.photos[0]
                    : 'https://loremflickr.com/640/480/food',
                }}
              />
            </Center>
            {/* <Pressable
              style={tw`bg-white m-10 py-6 rounded-full`}
              onPress={() => navigation.navigate('Feasts')}
            >
              <Text style={tw`text-center text-lg`}>Your Feasts</Text>
            </Pressable> */}
            <Center mt={'5'}>
              <CustomButton
                onPress={() => navigation.navigate('Feasts')}
                text={'Your Feasts'}
                bgColor={'white'}
                fgColor={'black'}
              />
            </Center>
          </Box>
        ) : (
          // ) : isError ? (
          //   <Text>Error: {error.message}</Text>
          // ) : isInitialLoading ? (
          //   <LoadingIndicator />
          // <Text>No winner yet</Text>
          // <Text>Not ready...</Text>
          <Box safeArea flex={1} w="100%">
            <IconButton
              icon={<CloseIcon size="sm" color="white" />}
              position="absolute"
              top={3}
              right={3}
              rounded="full"
              variant="ghost"
              colorScheme="white"
              onPress={() => navigation.goBack()}
            />
            <Center>
              <Text style={tw`text-white text-center text-xl m-5`}>
                {`The winning place will be determined after ${currentFeast.name}'s voting closes.`}
              </Text>
            </Center>

            <Center mt={'5'}>
              <CustomButton
                onPress={() => navigation.navigate('Feasts')}
                text={'Your Feasts'}
                bgColor={'white'}
                fgColor={'black'}
              />
            </Center>
          </Box>
        )}
        {/* <View>{isFetching ? <Text>Refreshing...</Text> : null}</View> */}
      </>
    </SafeAreaView>
  )
}

export default WinnerScreen
