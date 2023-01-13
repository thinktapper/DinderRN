// @ts-ignore
import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
// import Animated from 'react-native-reanimated'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  // @ts-ignore
  Ionicons,
  // @ts-ignore
  FontAwesome,
  // @ts-ignore
  Fontisto,
  // @ts-ignore
  MaterialCommunityIcons,
} from '@expo/vector-icons'
// import users from '../../assets/data/users'
import Swiper from 'react-native-deck-swiper'
import { rs } from '../utils/ResponsiveScreen'
import PlaceCard from '../components/PlaceCard'
import { useAppContext } from '../context/AppProvider'
import { useAuthContext } from '../context/AuthProvider'
// import { useFeastDetails } from '../hooks/useFeastPlaces'
import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { queryKeys, VOTE } from '../lib/constants'
// import produce from 'immer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import Header from '../components/Header'
import { feastState } from '../context/FeastState'
import { produce } from 'immer'

// Fetch places belonging to current feast from API
const getFeastPlaces = async (currentFeast, user) => {
  const { data } = await axios({
    url: `http://localhost:3000/api/feast/${currentFeast?.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user.token}` },
  })
  return data.feast.places
}

// @ts-ignore
const HomeScreen = ({ route, navigation }) => {
  const currentFeast = route.params?.currentFeast
  // const ctx = useAppContext()
  // const feastId = route.params?.feast
  // const currentFeast = useState(null)
  // const currentFeast = feastState.useValue()
  // const { currentFeast, loading, handleChangeFeast } = ctx
  const { user } = useAuthContext()
  const swipeRef = useRef(null)
  const [places, setPlaces] = useState([])
  // const [places, setPlaces] = feastState.use()
  const globalPadding = rs(12)
  const wrapperPadding = rs(12)
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // query to fetch places
  const { data, refetch, isLoading, error } = useQuery(
    [queryKeys.places, currentFeast],
    async () => {
      const response = await getFeastPlaces(currentFeast, user) //fetch('https://your-api.com/data')
      return response
    },
    {
      initialData: places,
      staleTime: 600000,
      cacheTime: 900000,
    },
  )

  // mutation to submit nah vote on left swipe
  const nahMutation = useMutation(
    async (placeSwiped, cardIndex) => {
      const response = await axios({
        url: `http://localhost:3000/api/vote`,
        method: 'post',
        headers: { authorization: `Bearer ${user.token}` },
        data: {
          // @ts-ignore
          feastId: currentFeast.id,
          placeId: placeSwiped.id,
          voteType: VOTE.nah,
        },
      })
      return response.data
    },
    {
      onSuccess: (cardIndex) => {
        const updatedPlaces = produce(places, (updatedPlaces) => {
          updatedPlaces[cardIndex].votes.push(VOTE.nah)
        })
        setPlaces(updatedPlaces)
      },
    },
  )

  // @ts-ignore
  const yassMutation = useMutation({
    // @ts-ignore
    mutationFn: (placeSwiped, cardIndex) => {
      return axios({
        url: `http://localhost:3000/api/vote`,
        method: 'post',
        headers: { authorization: `Bearer ${user.token}` },
        data: {
          // @ts-ignore
          feastId: currentFeast.id,
          placeId: placeSwiped.id,
          voteType: VOTE.yass,
        },
      })
      // return response.data
    },
  })
  // {
  // On success, refetch the user data
  // eslint-disable-next-line no-undef
  // onSuccess: () => refetch(),
  // },
  // {
  //   onSuccess: (cardIndex) => {
  //     const updatedPlaces = produce(places, (updatedPlaces) => {
  //       updatedPlaces[cardIndex].votes.push(VOTE.nah)
  //     })
  //     setPlaces(updatedPlaces)
  //   },
  // },
  // })

  const swipeLeft = async (cardIndex) => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]

    // @ts-ignore
    nahMutation(placeSwiped, cardIndex)
    console.warn('swiped NAH on: ', places[cardIndex].name)
  }

  const swipeRight = async (cardIndex) => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]
    yassMutation.mutate(placeSwiped, cardIndex)
    console.warn('swiped YASS on: ', places[cardIndex].name)
  }

  useEffect(() => {
    // @ts-ignore
    if (currentFeast) {
      // @ts-ignore
      const fetchFeastPlaces = async () => {
        // @ts-ignore
        const response = await getFeastPlaces(currentFeast, user)
        setPlaces(response)
      }
      fetchFeastPlaces()
    }
  }, [currentFeast])

  if (isLoading) return <LoadingIndicator />

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header />

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Text style={tw`text-2xl text-center mt-4 font-bold`}>
          {currentFeast
            ? // @ts-ignore
              currentFeast.name
            : 'No Feast Context'}
        </Text>
        {data.places ? (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: 'transparent' }}
            cards={data.places}
            stackSize={data.places.length}
            cardIndex={0}
            key={data.places.id}
            animateCardOpacity
            animateOverlayLabelsOpacity
            swipeBackCard
            verticalSwipe={false}
            backgroundColor={'#4FD0E9'}
            onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
            onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
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
            // onTapCard={cardIndex => swipeLeft(cardIndex)}
            overlayLabels={{
              left: {
                element: (
                  <Image
                    // @ts-ignore
                    source={require('../../assets/images/nope.png')}
                    // @ts-ignore
                    width={100}
                    height={100}
                  />
                ),
                title: 'NOPE',
                style: {
                  label: {
                    textAlign: 'right',
                    color: 'red',
                  },
                },
              },
              right: {
                element: (
                  <Image
                    // @ts-ignore
                    source={require('../../assets/images/yass.png')}
                    // @ts-ignore
                    width={100}
                    height={100}
                  />
                ),
                title: 'LIKE',
                style: {
                  label: {
                    color: '#4DED30',
                  },
                },
              },
            }}
          />
        ) : (
          // <View>
          //   <Text>Loading...</Text>
          // </View>
          <View
            style={[
              tw`relative bg-white h-3/4 rounded-xl justify-center items-center`,
              styles.cardShadow,
            ]}>
            <Text style={tw`font-bold pb-5`}>No more places</Text>
            <Image
              style={tw`h-20 w-full`}
              // @ts-ignore
              height={100}
              width={100}
              source={{ uri: 'https://links.papareact.com/6gb' }}
            />
          </View>
        )}
      </View>
      {/* End Cards */}

      {/* Bottom Buttons */}
      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => swipeRef.current.swipeRight()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
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
