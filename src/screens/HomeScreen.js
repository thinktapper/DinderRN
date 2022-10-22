import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import tw from 'twrnc'
import { Auth } from 'aws-amplify'

const HomeScreen = () => {
  const navigation = useNavigation()
  const user = Auth.user

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={tw`absolute left-5 top-3`}>
          <Image
            source={{ uri: user?.image }}
            style={tw`h-10 w-10 rounded-full`}
          />
        </TouchableOpacity>
      </View>

      <Text>I am the HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}
      />
      <Button title="Logout" onPress={Auth.signOut} />
    </SafeAreaView>
  )
}
export default HomeScreen
