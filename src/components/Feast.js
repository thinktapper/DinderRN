import React from 'react'
import { Pressable, Text } from 'react-native'
import Card from './Card'
import { useNavigation } from '@react-navigation/native'

export default function Feast({ feastData }) {
  const navigation = useNavigation()
  const cardContents = (
    <Text>{`Location: ${feastData.location.lat}, ${feastData.location.long}`}</Text>
  )

  const handleChangeFeast = (feastData) => {
    navigation.navigate('Home', { feast: feastData.id })
  }

  return (
    <Pressable onPress={(feastData) => handleChangeFeast(feastData)}>
      <Card
        feastName={feastData.name}
        createdAt={feastData.createdAt}
        cardContents={cardContents}
      />
    </Pressable>
  )
}
