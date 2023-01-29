import React from 'react'
import { View, Text } from 'react-native'
import { useIsFetching } from '@tanstack/react-query'

const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching()

  return isFetching ? (
    <View>
      <Text>Queries are fetching in the background.. 🤫</Text>
    </View>
  ) : null
}

export default GlobalLoadingIndicator
