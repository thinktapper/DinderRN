import React from 'react'
import { Text } from 'react-native'
import Card from './Card'

export default function Feast({ feastData }) {
  const cardContents = (
    <Text>{`Location: ${feastData.location.lat}, ${feastData.location.long}`}</Text>
  )

  return (
    <Card
      feastName={feastData.name}
      createdAt={feastData.createdAt}
      cardContents={cardContents}
    />
  )
}
