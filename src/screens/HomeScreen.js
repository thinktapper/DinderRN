import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import Animated from 'react-native-reanimated'
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
// import users from '../../assets/data/users'
import { User } from '../models'
import { Vote, VoteType } from '../models'
import { GOOGLE_API } from '@env'
import Swiper from 'react-native-deck-swiper'
import { useAppContext } from '../context/AppProvider'
import CardImageSteps from '../components/CardImageSteps'
import CardImageCarousel from '../components/CardImageCarousel'
import { StoryContainer } from 'react-native-stories-view'
import { rs } from '../utils/ResponsiveScreen'
import PlaceCard from '../components/PlaceCard'
import MainCard from '../components/MainCard'

const HomeScreen = ({ navigation }) => {
  const appContext = useAppContext()
  const [activeScreen, setActiveScreen] = useState('Home')
  const color = '#b5b5b5'
  const activeColor = '#F76C6B'
  const { user, signOut } = Auth
  const swipeRef = useRef(null)
  const places = appContext.places
  // const [currentIndex, setCurrentIndex] = useState(0)
  // const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const globalPadding = rs(12)
  const wrapperPadding = rs(12)

  const swipeLeft = async cardIndex => {
    if (!places[cardIndex]) return

    const placeSwiped = places[cardIndex]
    // try {
    //   await DataStore.save(
    //     new Vote({
    //       voteType: VoteType.NEGATIVE,
    //       placeID: placeSwiped.id,
    //       userID: user.attributes.id,
    //     }),
    //   )
    // } catch (error) {
    //   console.log(`Error saving nope vote: ${error}`)
    // } finally {
    //   console.warn('swiped NAH on: ', places[cardIndex].name)
    // }
    console.warn('swiped NAH on: ', places[cardIndex].name)
  }

  const swipeRight = async cardIndex => {
    console.warn('swipe YASS on: ', places[cardIndex].name)
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
        <Text style={tw`text-2xl text-center mt-4 font-bold`}>
          {appContext.feastName ? appContext.feastName : 'No Feast Context'}
        </Text>
        {places?.length ? (
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
            onSwipedLeft={cardIndex => swipeLeft(cardIndex)}
            onSwipedRight={cardIndex => swipeRight(cardIndex)}
            // onTapCard={setCurrentImageIndex(currentImageIndex + 1)}
            renderCard={card => {
              // return (
              //   <Animated.View
              //     style={[styles.cardContainer, styles.cardShadow]}>
              //     <Animated.View style={styles.cardInner}>
              //       <MainCard style={{ flex: 1 }} card={card} />
              //     </Animated.View>
              //   </Animated.View>
              // )
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
