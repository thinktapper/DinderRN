import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedGestureHandler,
  interpolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Like from '../../../assets/images/LIKE.png'
import Nope from '../../../assets/images/nope.png'
import tw from 'twrnc'
import Card from '../TinderCard'
import users from '../../../assets/data/users'

const AnimatedStack = props => {
  const translateX = useSharedValue(0)
  const cardStyle = useAnimatedStyle(() => {
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  })

  
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Animated.View style={[tw`w-full h-full justify-center items-center`, cardStyle]}>
        <Card user={users[2]} />
      </Animated.View>
    </View>
  )
}

export default AnimatedStack
