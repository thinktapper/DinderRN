import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useAppContext } from '../context/AppProvider'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const navigation = useNavigation()
  const { color, activeColor } = useAppContext()
  const [activeScreen, setActiveScreen] = React.useState('Feasts')

  return (
    <View style={tw`flex-row justify-around w-full p-2.5`}>
      <TouchableOpacity
        onPress={() => {
          setActiveScreen('Home')
          navigation.navigate('Home')
        }}>
        <Fontisto
          name="tinder"
          size={30}
          color={activeScreen === 'Home' ? activeColor : color}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setActiveScreen('Feasts')
          navigation.navigate('Feasts')
        }}>
        <MaterialCommunityIcons
          name="star-four-points"
          size={30}
          color={activeScreen === 'Feasts' ? activeColor : color}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setActiveScreen('Winner')
          navigation.navigate('Winner')
        }}>
        <Ionicons
          name="ios-chatbubbles"
          size={30}
          color={activeScreen === 'Winner' ? activeColor : color}
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
  )
}

export default Header
