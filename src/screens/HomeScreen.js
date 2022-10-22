import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import Card from '../components/TinderCard'
import { Auth } from 'aws-amplify'
import users from '../../assets/data/users'
import AnimatedStack from '../components/AnimatedStack'

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
      <View style={tw`flex-1 justify-center items-center`}>
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
              // <FontAwesome name="user" size={24} color="black" />
            )}
          </TouchableOpacity>
          <MaterialCommunityIcons
            name="star-four-points"
            size={30}
            color={color}
          />
          <TouchableOpacity onPress={() => setActiveScreen('Chat')}>
            <Ionicons
              name="ios-chatbubbles"
              size={30}
              color={activeScreen === 'Chat' ? activeColor : color}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveScreen('Profile')}>
            <FontAwesome
              name="user"
              size={30}
              color={activeScreen === 'Profile' ? activeColor : color}
            />
          </TouchableOpacity>
        </View>
        {/* End Header */}

        <View style={tw`flex-1 justify-center items-center w-full`}>
          <AnimatedStack
            data={users}
            renderItem={({ item }) => <Card user={item} />}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
export default HomeScreen
