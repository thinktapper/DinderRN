import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import tw from 'twrnc'
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  Fontisto,
} from '@expo/vector-icons'
import Card from '../components/TinderCard'
import { Auth } from 'aws-amplify'
import users from '../../assets/data/users'
import AnimatedStack from '../components/AnimatedStack'

const HomeScreen = () => {
  const navigation = useNavigation()
  const user = Auth.user

  return (
    <SafeAreaView>
      <View style={tw`items-center relative`}>
        <TouchableOpacity style={tw`absolute left-5 top-3`}>
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={tw`h-10 w-10 rounded-full`}
            />
          ) : (
            <FontAwesome name="user" size={24} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../../assets/images/flame-square.png')}
            style={tw`h-14 w-14`}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 justify-center items-center`}>
        <AnimatedStack
          data={users}
          renderItem={({ item }) => <Card user={item} />}
        />
      </View>
      {/* <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}
      /> */}
      {/* <Button title="Logout" onPress={Auth.signOut} /> */}
    </SafeAreaView>
  )
}
export default HomeScreen
