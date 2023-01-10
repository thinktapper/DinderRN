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
import { useFeastDetails } from '../hooks/useFeastPlaces'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { queryKeys, VOTE } from '../lib/constants'
import produce from 'immer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import Header from '../components/Header'

const HomeScreen = ({ route, navigation }) => {
  const feastId = route.params?.feast
  const ctx = useAppContext()
  const { currentFeast, loading, handleChangeFeast } = ctx
  // const feastDetails = ctx.handleChangeFeast(feastId)
  const auth = useAuthContext()
  const swipeRef = useRef(null)
  // const [feast, setFeast] = useState({})
  const [places, setPlaces] = useState(null)
  // const [deck, setDeck] = useState([])
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const globalPadding = rs(12)
  const wrapperPadding = rs(12)

  // if (!feastDetails) return null

  useEffect(() => {
    let unsub
    const fetchPlaces = async () => {
      unsub = await axios({
        url: `http://localhost:3000/api/feast/${ctx.currentFeast.id}`,
        method: 'get',
        headers: { authorization: `Bearer ${auth.user.token}` },
      })
      if (unsub.data.success) {
        setPlaces(
          // unsub.data.feast.places,
          unsub.data.feast.places.map((place) => ({
            ...place,
            votes: [],
          })),
        )
      } else {
        console.warn(`Failed fetching places for ${currentFeast}`)
      }
    }
    fetchPlaces()
    return unsub
  }, [])

  // console.warn(places)

  if (loading) return <LoadingIndicator />

  const swipeLeft = async (cardIndex) => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]
    const submit = await axios({
      url: `http://localhost:3000/api/vote`,
      method: 'post',
      headers: { authorization: `Bearer ${auth.user.token}` },
      data: {
        feastId: currentFeast.id,
        placeId: placeSwiped.id,
        voteType: VOTE.nah,
      },
    })
    if (submit.data.success) {
      const updatedPlaces = produce(places, (draft) => {
        draft[cardIndex].votes.push(VOTE.yass)
      })
      // placeSwiped.votes ? placeSwiped.votes.push(VOTE.yass) : placeSwiped
      // setPlaces((places) =>
      //   produce((places) => {
      //     places[cardIndex].votes.push(VOTE.yass)
      //   }),
      // )

      console.warn('swiped NAH on: ', places[cardIndex].name)
      console.log(placeSwiped)
    } else {
      console.warn(`Oops! Did not count vote for ${placeSwiped}`)
    }
    // if (!places[cardIndex]) return
    // console.warn(cardIndex)

    // const placeSwiped = places[cardIndex]
    // console.warn(placeSwiped)

    // const submit = await axios({
    //   url: `http://localhost:3000/api/vote`,
    //   method: 'post',
    //   headers: { authorization: `Bearer ${auth.user.token}` },
    //   data: {
    //     feastId: currentFeast.id,
    //     placeId: placeSwiped.id,
    //     voteType: VOTE.nah,
    //   },
    // })
    // console.warn(JSON.stringify(submit))
    // if (submit.data.success) {
    //   // placeSwiped.votes = []
    //   // placeSwiped.votes?.push(VOTE.nah)
    //   console.warn(submit.data)
    //   setPlaces((places) =>
    //     produce((places) => {
    //       places[cardIndex].votes.push(VOTE.nah)
    //     }),
    //   )

    //   console.warn('swiped NAH on: ', places[cardIndex].name)
    //   console.log(placeSwiped)
    // } else {
    //   console.warn(`Oops! Did not count vote for ${placeSwiped}`)
    // }
  }

  const swipeRight = async (cardIndex) => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]
    const submit = await axios({
      url: `http://localhost:3000/api/vote`,
      method: 'post',
      headers: { authorization: `Bearer ${auth.user.token}` },
      data: {
        feastId: currentFeast.id,
        placeId: placeSwiped.id,
        voteType: VOTE.yass,
      },
    })
    if (submit.data.success) {
      const updatedPlaces = produce(places, (draft) => {
        draft[cardIndex].votes.push(VOTE.yass)
      })
      // placeSwiped.votes ? placeSwiped.votes.push(VOTE.yass) : placeSwiped
      // setPlaces((places) =>
      //   produce((places) => {
      //     places[cardIndex].votes.push(VOTE.yass)
      //   }),
      // )

      console.warn('swiped YASS on: ', places[cardIndex].name)
      console.log(placeSwiped)
    } else {
      console.warn(`Oops! Did not count vote for ${placeSwiped}`)
    }
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header />

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Text style={tw`text-2xl text-center mt-4 font-bold`}>
          {currentFeast ? currentFeast.name : 'No Feast Context'}
        </Text>
        {places ? (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: 'transparent' }}
            cards={places}
            stackSize={places.length}
            cardIndex={0}
            key={places.length}
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
                    source={require('../../assets/images/nope.png')}
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
                    source={require('../../assets/images/yass.png')}
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
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
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
