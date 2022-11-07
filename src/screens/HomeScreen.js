import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { Auth, DataStore } from 'aws-amplify'
import users from '../../assets/data/users'
import { User } from '../models'
import { Vote } from '../models'
import { GOOGLE_API } from '@env'
import axios from 'axios'
import Swiper from 'react-native-deck-swiper'

const HomeScreen = ({ route }) => {
  const { lat, long, radius } = route.params
  // const { places } = props.params
  const [activeScreen, setActiveScreen] = useState('Home')
  const color = '#b5b5b5'
  const activeColor = '#F76C6B'
  const navigation = useNavigation()
  const { user, signOut } = Auth
  const [places, setPlaces] = useState([])
  const swipeRef = useRef(null)

  // fetch data from API
  const handleGetPlaces = useCallback(async () => {
    // let placeDetails = []
    const distance = radius * 1609.34
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&locationbias=circle%3A${distance}%40${lat}%2C${long}&key=${GOOGLE_API}`

    //get our initial places from Google
    // try {
    //   const { data } = await axios.get(searchUrl)
    //   const { status, results } = data

    //   // Loop through results to get more information
    //   let arrPlacePromises = []
    //   if (status == 'OK') {
    //     results.forEach(r => {
    //       arrPlacePromises.push(
    //         axios.get(
    //           `https://maps.googleapis.com/maps/api/place/details/json?place_id=${r.place_id}&fields=place_id%2Cformatted_address%2Cname%2Crating%2Cformatted_phone_number%2Cphotos%2Cprice_level%2Cwebsite&key=${GOOGLE_API}`,
    //         ),
    //       )
    //     })

    //     let arrPromiseResults = await Promise.all(arrPlacePromises)

    //     arrPromiseResults.forEach(pr => {
    //       let data = pr.data.result
    //       placeDetails.push({
    //         id: data.place_id,
    //         name: data.name,
    //         address: data.formatted_address || 'Address not available',
    //         rating: data.rating || 'No rating',
    //         phone: data.formatted_phone_number || 'Phone not available',
    //         photo: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${data.photos[0].photo_reference}&sensor=false&maxheight=500&maxwidth=500&key=${GOOGLE_API}`,
    //         price: data.price_level || 'Price not available',
    //         website: data.website || '',
    //         votingRank: 0,
    //       })
    //     })
    //     setPlaces(placeDetails)

    //     // console.log(placeDetails)

    //     // TODO: save places to DataStore
    //   }
    try {
      const res = await fetch(searchUrl)
      const data = await res.json()
      if (res.ok) {
        let fetchedPlaces = []
        for (let googlePlace of data.results) {
          let place = {}
          // let gallery = []

          // if (googlePlace.photos) {
          //   for (let photo of googlePlace.photos) {
          //     // gallery.push(`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxheight=500&maxwidth=500&key=${GOOGLE_API}`)
          //     // let photoUrl =
          //     //   Urls.GooglePicBaseUrl +
          //     //   photo.photo_reference +
          //     //   Urls.GooglePicParams +
          //     //   GOOGLE_API
          //     let photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxheight=500&maxwidth=500&key=${GOOGLE_API}`
          //     gallery.push(photoUrl)
          //   }
          // }

          // place['id'] = googlePlace.place_id
          // place['name'] = googlePlace.name
          // place['types'] = googlePlace.types
          // place['address'] =
          //   googlePlace.formatted_address || 'Address not available'
          // place['price'] = googlePlace.price_level || 'Price level unavailable'
          // place['rating'] = googlePlace.rating || 'No ratings'
          // place['ratingsTotal'] = googlePlace.user_ratings_total || 'N/A'
          // place['photo'] = gallery[0]
          // place['gallery'] = gallery

          place.id = googlePlace.place_id
          place.name = googlePlace.name
          place.types = googlePlace.types
          place.address =
            googlePlace.formatted_address || 'Address not available'
          place.open = googlePlace.opening_hours.open_now
          place.price = googlePlace.price_level || 'Price level unavailable'
          place.rating = googlePlace.rating || 'No ratings'
          place.ratingsTotal = googlePlace.user_ratings_total || 'N/A'
          place.photo = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${googlePlace.photos[0].photo_reference}&sensor=false&maxheight=500&maxwidth=500&key=${GOOGLE_API}`

          fetchedPlaces.push(place)
        }

        // Set fetchedPlaces array to state
        setPlaces(fetchedPlaces)
      }
    } catch (error) {
      console.error(`Error fetching places from Google: ${error}`)
      // throw new Error(error, 'Error fetching places from Google')
    }
    // console.log(places)
  })

  useEffect(() => {
    // const fetchPlaces = async () => {
    //   await handleGetPlaces()
    // }
    handleGetPlaces()
  }, [])

  console.log(places)

  const swipeLeft = async cardIndex => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]
    try {
      await DataStore.save(
        new Vote({
          voteType: VoteType.NEGATIVE,
          placeID: placeSwiped.id,
          userID: user.attributes.id,
        }),
      )
    } catch (error) {
      console.warn(`Error saving negative vote: ${error}`)
    } finally {
      console.warn('swiped NAY on', places[cardIndex].name)
    }
  }

  const swipeRight = async cardIndex => {
    console.warn('swipe right: ', places[cardIndex].name)
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`flex-row justify-around w-full p-2.5`}>
        <TouchableOpacity onPress={() => setActiveScreen('Home')}>
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={tw`h-10 w-10 rounded-full`}
            />
          ) : (
            <Fontisto
              name="tinder"
              size={30}
              color={activeScreen === 'Home' ? activeColor : color}
            />
          )}
        </TouchableOpacity>
        <MaterialCommunityIcons
          name="star-four-points"
          size={30}
          color={color}
        />
        <TouchableOpacity
          onPress={() => {
            setActiveScreen('Chat')
            navigation.navigate('Feast')
          }}>
          <Ionicons
            name="ios-chatbubbles"
            size={30}
            color={activeScreen === 'Chat' ? activeColor : color}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveScreen('Profile')
            navigation.navigate('Profile')
          }}>
          <FontAwesome
            name="user"
            size={30}
            color={activeScreen === 'Profile' ? activeColor : color}
          />
        </TouchableOpacity>
      </View>
      {/* End Header */}

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        {places.length ? (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: 'transparent' }}
            cards={places}
            stackSize={places.length}
            cardIndex={0}
            key={places.length}
            animateCardOpacity
            verticalSwipe={false}
            overlayLabels={{
              left: {
                // element: (
                //   <Image
                //     source={'../../assets/images/nope.png'}
                //     width={150}
                //     height={150}
                //   />
                // ),
                title: 'NOPE',
                style: {
                  label: {
                    textAlign: 'right',
                    color: 'red',
                  },
                },
              },
              right: {
                // element: (
                //   <Image
                //     source={'../../assets/images/yass.png'}
                //     width={150}
                //     height={150}
                //   />
                // ),
                title: 'LIKE',
                style: {
                  label: {
                    color: '#4DED30',
                  },
                },
              },
            }}
            backgroundColor={'#4FD0E9'}
            onSwipedLeft={cardIndex => swipeLeft(cardIndex)}
            onSwipedRight={cardIndex => swipeRight(cardIndex)}
            renderCard={card => {
              return card ? (
                <View
                  key={card.id}
                  style={tw`relative bg-white h-3/4 rounded-xl`}>
                  <Image
                    source={{ uri: card.photo }}
                    style={tw`absolute top-0 h-full w-full rounded-xl`}
                  />
                  <View
                    style={[
                      tw`absolute bottom-0 bg-white w-full flex-row justify-around items-stretch h-20 px-8 py-2 rounded-b-xl`,
                      styles.cardShadow,
                    ]}>
                    <View>
                      <Text style={tw`text-xl font-bold`}>{card.name}</Text>
                      <Text style={tw`w-9/12`}>
                        Rating: {card.rating} ({card.ratingsTotal})
                      </Text>
                    </View>
                    <Text style={tw`text-2xl font-bold`}>
                      {card.open ? 'Open now' : 'Closed'}
                    </Text>
                  </View>
                </View>
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
              )
            }}
          />
        ) : (
          <View>
            <Text>Loading...</Text>
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
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    elevation: 1,
  },
})

export default HomeScreen
