import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const Card = props => {
  const { name, image, bio } = props.user
  return (
    <View
      style={tw`w-full h-full bg-[#fefefe] shadow-black shadow-offset-[0px]/[5px] shadow-opacity-36 shadow-radius-[6.68px] elevation-11`}>
      <ImageBackground
        source={{ uri: image }}
        style={tw`w-full h-full overflow-hidden justify-end`}>
        <View style={tw`p-2.5`}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fefefe',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',

    justifyContent: 'flex-end',
  },
  cardInner: {
    padding: 10,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 18,
    color: 'white',
    lineHeight: 25,
  },
})
export default Card
