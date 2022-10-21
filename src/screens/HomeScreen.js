import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>I am the HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  )
}
export default HomeScreen
