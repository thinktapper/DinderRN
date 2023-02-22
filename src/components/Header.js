import React from 'react'
import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../context/AuthProvider'
import { color, activeColor } from '../lib/constants'

const Header = () => {
  const navigation = useNavigation()
  const { user } = useAuthContext()
  const [activeScreen, setActiveScreen] = React.useState('Home')

  return (
    <View style={tw`flex-row items-center justify-between mx-2 -mt-3 p-5`}>
      <Pressable
        onPress={() => {
          setActiveScreen('Feasts')
          navigation.navigate('Feasts')
        }}
      >
        <MaterialIcons name="restaurant-menu" size={33} color={activeColor} />
        {/* <MaterialCommunityIcons
          name="star-four-points"
          size={30}
          color={activeColor}
          // color={activeScreen === 'Feasts' ? activeColor : color}
        /> */}
      </Pressable>
      <Pressable
        onPress={() => {
          setActiveScreen('Home')
          navigation.navigate('Home')
        }}
        style={tw`rounded-full`}
      >
        <Image
          style={tw`w-16 h-16`}
          source={require('../../assets/images/flamelogo.png')}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setActiveScreen('Profile')
          navigation.navigate('Profile')
        }}
      >
        {user.image ? (
          <Image
            source={{ uri: user.image }}
            style={tw`w-10 h-10 rounded-full`}
          />
        ) : (
          <FontAwesome
            name="user"
            size={30}
            color={activeScreen === 'Profile' ? activeColor : color}
          />
        )}
      </Pressable>
    </View>
  )
}

export default Header
