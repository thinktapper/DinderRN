import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import tw from 'twrnc'
import { feastState } from '../context/FeastState'
import useWinner from '../hooks/useWinner'

const WinnerScreen = ({ navigation, route }) => {
  const currentFeast = feastState.useValue()
  // const currentFeastWinner = feastState.useValue()
  let winner = useWinner()
  if (winner == undefined || winner == null) {
    const currentFeastWinner = feastState.useValue()
    winner = currentFeastWinner
  }

  return (
    <View style={[tw`h-full bg-red-500 pt-20`, { opacity: 0.89 }]}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
          style={tw`h-20 w-full`}
          source={{ uri: 'https://links.papareact.com/mg9' }}
        />
      </View>

      <Text style={tw`text-white text-center mt-5`}>
        {winner.name
          ? `${winner.name} wins best place to eat!`
          : 'TBD RESTAURANT wins best place to eat.'}
      </Text>

      <View style={tw`flex-row justify-evenly mt-5`}>
        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{
            uri: currentFeast.image
              ? currentFeast.image
              : 'https://loremflickr.com/640/480/food',
          }}
        />
        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{
            uri: winner.photos ? winner.photos[1] : currentFeast.image,
          }}
        />
      </View>

      <Pressable
        style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}
        onPress={() => navigation.goBack()}>
        <Text style={tw`text-center`}>Share result</Text>
      </Pressable>
    </View>
  )
}

export default WinnerScreen
