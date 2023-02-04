import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native'
// import Animated from 'react-native-reanimated'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
// import users from '../../assets/data/users'
import Swiper from 'react-native-deck-swiper'
import { rs } from '../utils/ResponsiveScreen'
import PlaceCard from '../components/PlaceCard'
import { useAppContext } from '../context/AppProvider'
import { useAuthContext } from '../context/AuthProvider'
// import { queryClient } from '../lib/queryClient'
import useFeast from '../hooks/useFeast'
// import useVote from '../hooks/useVote'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { queryKeys, VOTE } from '../lib/constants'
import { LoadingIndicator } from '../components/LoadingIndicator'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
// import { produce } from 'immer'

const getFeastPulse = async (feastId, user) => {
  const response = await axios(
    `http://localhost:3000/api/feast/pulse/${feastId.id}`,
    {
      method: 'GET',
      // prettier-ignore
      headers: { 'authorization': `Bearer ${user?.token}` },
    },
  )

  console.warn(
    'getFeastPulse result: STATUS =>',
    JSON.stringify(response.status),
    'DATA =>',
    JSON.stringify(response.data),
  )

  return response.data.filteredPlaces
}

const HomeScreen = ({ route, navigation }) => {
  const swipeRef = useRef(null)
  const { user } = useAuthContext()
  const feastId = route.params?.feast
  const currentFeast = feastState.useValue()
  // const feastId = feast.id
  const places = useFeast()
  // const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const queryClient = useQueryClient()
  // const mutate = useVote()
  const globalPadding = rs(12)
  const wrapperPadding = rs(12)
  // const [currentIndex, setCurrentIndex] = useState(0)

  // mutation to submit nah vote on left swipe
  const nahMutation = useMutation(
    (placeSwiped) => {
      return axios({
        url: `http://localhost:3000/api/vote`,
        method: 'post',
        headers: { authorization: `Bearer ${user.token}` },
        data: {
          feastId: feastId.id,
          placeId: placeSwiped.id,
          voteType: VOTE.nah,
        },
      })
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('nah mutation success:', JSON.stringify(data))
      },
    },
  )

  // mutation to submit yass vote on right swipe
  const yassMutation = useMutation(
    (placeSwiped) => {
      return axios({
        url: `http://localhost:3000/api/vote`,
        method: 'post',
        headers: { authorization: `Bearer ${user.token}` },
        data: {
          feastId: feastId.id,
          placeId: placeSwiped.id,
          voteType: VOTE.yass,
        },
      })
    },
    {
      onSuccess: (data, variables, context) => {
        console.log('yass mutation success:', JSON.stringify(data))
      },
    },
  )

  const swipeLeft = (cardIndex) => {
    // if (!places[cardIndex]) return
    if (!filteredPlaces[cardIndex]) return

    const placeSwiped = filteredPlaces[cardIndex]

    nahMutation.mutate(placeSwiped)
    // console.warn('swiped NAH on: ', places[cardIndex].name)
  }

  const swipeRight = (cardIndex) => {
    // if (!places[cardIndex]) return
    if (!filteredPlaces[cardIndex]) return

    // const placeSwiped = places[cardIndex]
    const placeSwiped = filteredPlaces[cardIndex]

    yassMutation.mutate(placeSwiped)
    // console.warn('swiped YASS on: ', places[cardIndex].name)
  }

  const onSwipedAll = () => {
    Alert.alert({
      title: 'All done!',
      message: "Let's check for a winner..",
    })
    navigation.navigate('Winner')
  }

  // useEffect(() => {
  //   // let unsub
  //   if (places.length > 0) {
  //     // filter out places that have already been voted on
  //     const filteredPlaces = places.filter((place) => {
  //       return !place.votes.some((vote) => vote.userId === user.id)
  //     })
  //     console.log('filtered places: ', filteredPlaces)

  //     if (filteredPlaces.length === 0) {
  //       Alert.alert({
  //         title: 'All done!',
  //         message: "Let's check for a winner..",
  //       })
  //       navigation.navigate('Winner')
  //     } else {
  //       setNonvotedPlaces(filteredPlaces)
  //     }

  //     console.log('nonvoted places: ', nonvotedPlaces)
  //   }
  // }, [feastId, feast])

  useEffect(() => {
    async function fetchPlaces() {
      const result = await getFeastPulse(feastId, user)
      setFilteredPlaces(result)
    }
    fetchPlaces()
  }, [feastId, currentFeast])

  // useEffect(() => {
  //   setFilteredPlaces(
  //     places.filter((place) => {
  //       return !place.votes.some((vote) => vote.userId === user.id)
  //     }),
  //   )
  // }, [places, user])
  // create a useEffect to filter out places that have already been voted on

  // if (isLoading) return <LoadingIndicator />

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header />

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Text style={tw`text-2xl text-center mt-4 font-bold`}>
          {currentFeast ? currentFeast.name : 'No Feast Selected'}
        </Text>
        {filteredPlaces.length > 0 ? (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: 'transparent' }}
            cards={filteredPlaces}
            stackSize={filteredPlaces.length}
            cardIndex={0}
            key={filteredPlaces.id}
            animateCardOpacity
            animateOverlayLabelsOpacity
            swipeBackCard
            verticalSwipe={false}
            backgroundColor={'#4FD0E9'}
            onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
            onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
            // onSwipedAll={() => onSwipedAll()}
            onSwipedAll={() => {
              // Alert.alert({
              //   title: 'All done!',
              //   message: "Let's check for a winner..",
              // })
              navigation.navigate('Winner', { feast: feastId })
            }}
            // onTapCard={setCurrentImageIndex(currentImageIndex + 1)}
            renderCard={(card) => {
              return (
                <PlaceCard
                  card={card}
                  // currentIndex={currentIndex}
                  // setCurrentIndex={setCurrentIndex}
                  globalPadding={globalPadding}
                  wrapperPadding={wrapperPadding}
                />
              )
            }}
            overlayLabels={{
              left: {
                element: (
                  <Image
                    source={require('../../assets/images/nope.png')}
                    width={10}
                    height={5}
                  />
                ),
                title: 'NOPE',
                style: {
                  label: {
                    textAlign: 'right',
                    color: 'red',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 3,
                    marginLeft: -3,
                  },
                },
              },
              right: {
                element: (
                  <Image
                    source={require('../../assets/images/yass.png')}
                    width={15}
                    height={10}
                  />
                ),
                title: 'LIKE',
                style: {
                  label: {
                    // textAlign: 'left',
                    color: '#4DED30',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 3,
                    marginLeft: 3,
                  },
                },
              },
            }}
          />
        ) : (
          <View
            style={[
              tw`relative bg-white h-3/4 rounded-xl justify-center items-center`,
              styles.cardShadow,
            ]}>
            <Text style={tw`font-bold pb-5`}>No more places</Text>
            <Image
              style={tw`h-20 w-full`}
              height={100}
              width={100}
              source={{ uri: 'https://links.papareact.com/6gb' }}
            />
          </View>
        )}
      </View>
      {/* End Cards */}

      {nahMutation.isLoading ||
        (yassMutation.isLoading && <Text>Submitting Vote...</Text>)}

      {/* Bottom Buttons */}
      <View style={tw`flex flex-row justify-evenly mb-1`}>
        <Pressable
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
          <Entypo name="cross" size={24} color="red" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Winner', { feast: feastId })}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-purple-200`}>
          <Ionicons name="flash" size={30} color="#A65CD2" />
        </Pressable>
        <Pressable
          onPress={() => swipeRef.current.swipeRight()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
          <AntDesign name="heart" size={24} color="green" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.41,

    elevation: 2,
  },
  like: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    elevation: 1,
  },
  imageTextContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 80,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageTextName: {
    fontSize: 25,
  },
  imageTextAge: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  imageTextJob: {
    color: 'grey',
    // fontSize: 20,
    marginTop: 5,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  cardInner: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'auto',
    flex: 1,
  },
})

export default HomeScreen
