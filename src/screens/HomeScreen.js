import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { useAuth } from '../lib/useAuth'

const HomeScreen = () => {
  const navigation = useNavigation()
  const { signOut } = useAuth()

  return (
    <View>
      <Text>I am the HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}
      />
      <Button title="Logout" onPress={signOut} />
    </View>
  )
}
export default HomeScreen
