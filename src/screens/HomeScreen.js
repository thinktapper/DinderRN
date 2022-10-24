import React, { useState } from 'react'
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
import { Auth } from 'aws-amplify'
import users from '../../assets/data/users'
// import AnimatedStack from '../components/AnimatedStack'
import ProfileScreen from './ProfileScreen'
import Swiper from 'react-native-deck-swiper'

const HomeScreen = () => {
  const [activeScreen, setActiveScreen] = useState('Home')
  const color = '#b5b5b5'
  const activeColor = '#F76C6B'
  const navigation = useNavigation()
  const { user, signOut } = Auth

  const onSwipeLeft = user => {
    console.warn('swipe left', user.name)
  }

  const onSwipeRight = user => {
    console.warn('swipe right: ', user.name)
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
            navigation.navigate('Chat')
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

      {/* <View style={tw`flex-1 justify-center items-center w-full`}>
          <AnimatedStack
            data={users}
            renderItem={({ item }) => <Card user={item} />}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />
        </View> */}

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={users}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          renderCard={card => (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image
                source={{ uri: card.image }}
                style={tw`absolute top-0 h-full w-full rounded-xl`}
              />
              <View
                style={[
                  tw`absolute bottom-0 bg-white w-full flex-row justify-around items-stretch h-20 px-6 py-2 rounded-b-xl`,
                  styles.cardShadow,
                ]}>
                <View>
                  <Text style={tw`text-xl font-bold`}>{card.name}</Text>
                  <Text style={tw`w-7/12`}>{card.bio}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          )}
        />
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
