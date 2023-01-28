import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
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

const HomeScreen = ({ route, navigation }) => {
  const swipeRef = useRef(null)
  const { user } = useAuthContext()
  const feastId = route.params?.feast
  // const feast = feastState.useValue()
  // const feastId = feast.id
  const places = useFeast()
  const queryClient = useQueryClient()
  // const mutate = useVote()
  const globalPadding = rs(12)
  const wrapperPadding = rs(12)
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
  const yassMutation = useMutation({
    mutationFn: (placeSwiped) => {
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
    onSuccess: (data, variables, context) => {
      console.log('yass mutation success:', JSON.stringify(data))
    },
  })

  const swipeLeft = (cardIndex) => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]

    nahMutation.mutate(placeSwiped)
    // console.warn('swiped NAH on: ', places[cardIndex].name)
  }

  const swipeRight = (cardIndex) => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]
    yassMutation.mutate(placeSwiped)
    // console.warn('swiped YASS on: ', places[cardIndex].name)
  }

  // if (isLoading) return <LoadingIndicator />

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header />

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Text style={tw`text-2xl text-center mt-4 font-bold`}>
          {feastId ? feastId.name : 'No Feast Selected'}
        </Text>
        {places.length > 0 ? (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: 'transparent' }}
            cards={places}
            stackSize={places.length}
            cardIndex={0}
            key={places.id}
            animateCardOpacity
            animateOverlayLabelsOpacity
            swipeBackCard
            verticalSwipe={false}
            backgroundColor={'#4FD0E9'}
            onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
            onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
            onSwipedAll={() => {
              Alert.alert({
                title: 'All done!',
                message: "Let's check for a winner..",
              })
              navigation.navigate('Winner')
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
            // onTapCard={cardIndex => swipeLeft(cardIndex)}
            overlayLabels={{
              left: {
                element: (
                  <Image
                    source={require('../../assets/images/nope.png')}
                    width={40}
                    height={40}
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
                    width={40}
                    height={40}
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

      {nahMutation.isLoading ||
        (yassMutation.isLoading && <Text>Submitting Vote...</Text>)}

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
