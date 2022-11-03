import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
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
// import Card from '../components/TinderCard'
import { Auth, DataStore } from 'aws-amplify'
import users from '../../assets/data/users'
// import AnimatedStack from '../components/AnimatedStack'
import ProfileScreen from './ProfileScreen'
import Swiper from 'react-native-deck-swiper'

const HomeScreen = ({ places }) => {
  // const { lat, long } = props.params
  const [activeScreen, setActiveScreen] = useState('Home')
  const color = '#b5b5b5'
  const activeColor = '#F76C6B'
  const navigation = useNavigation()
  const { user, signOut } = Auth
  // const [places, setPlaces] = useState([])
  const swipeRef = useRef(null)

  // useEffect(() => {
  //   // fetch data from API
  // }, [])

  const onSwipeLeft = card => {
    console.warn('swipe left', card.name)
  }

  const onSwipeRight = card => {
    console.warn('swipe right: ', card.name)
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* <View style={tw`flex-1 justify-center items-center`}> */}
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
      {/* </View> */}

      {/* End Header */}

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={places}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  color: '#4DED30',
                },
              },
            },
          }}
          backgroundColor={'#4FD0E9'}
          onSwipedLeft={onSwipeLeft}
          onSwipedRight={onSwipeRight}
          renderCard={card =>
            card ? (
              <View
                key={card.id}
                style={tw`relative bg-white h-3/4 rounded-xl`}>
                <Image
                  source={{ uri: card.image }}
                  style={tw`absolute top-0 h-full w-full rounded-xl`}
                />
                <View
                  style={[
                    tw`absolute bottom-0 bg-white w-full flex-row justify-around items-stretch h-20 px-8 py-2 rounded-b-xl`,
                    styles.cardShadow,
                  ]}>
                  <View>
                    <Text style={tw`text-xl font-bold`}>{card.name}</Text>
                    <Text style={tw`w-9/12`}>{card.bio}</Text>
                  </View>
                  <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
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
          }
        />
      </View>

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
})

export default HomeScreen
