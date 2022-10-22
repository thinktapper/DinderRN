import React, { useEffect, useState } from 'react'
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

const ROTATION = 60
const SWIPE_VELOCITY = 800

const AnimatedStack = props => {
  const { data, renderItem, onSwipeLeft, onSwipeRight } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(currentIndex + 1)
  const currentProfile = data[currentIndex]
  const nextProfile = data[nextIndex]

  const { width: screenWidth } = useWindowDimensions()
  const hiddenTranslateX = 2 * screenWidth
  const translateX = useSharedValue(0)
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg'
  )
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }))
  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.5, 1]
    ),
  }))
  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, hiddenTranslateX / 5], [0, 1]),
  }))
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -hiddenTranslateX / 5], [0, 1]),
  }))

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      console.warn('Touch started')
      ctx.startX = translateX.value
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX
    },
    onEnd: event => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0)
        return
      }

      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
      )

      const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft
      onSwipe && runOnJS(onSwipe)(currentProfile)
      console.warn('Touch ended')
    },
  })

  useEffect(() => {
    translateX.value = 0
    setNextIndex(currentIndex + 1)
  }, [currentIndex, translateX])

  // const onSwipeLeft = ({ data: user }) => {
  //   console.warn('swipe left', user.name)
  // }

  // const onSwipeRight = ({ data: user }) => {
  //   console.warn('swipe right: ', user.name)
  // }

  return (
    <View style={tw`flex-1 justify-center items-center w-full`}>
      {nextProfile && (
        <View
          style={tw`absolute top-0 left-0 bottom-0 right-0 justify-center items-center`}>
          <Animated.View
            style={[
              tw`w-11/12 h-5/6 justify-center items-center`,
              nextCardStyle,
            ]}>
            {renderItem({ item: nextProfile })}
          </Animated.View>
        </View>
      )}
      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[tw`w-11/12 h-5/6 justify-center items-center`, cardStyle]}>
            <Animated.Image
              source={Like}
              style={[
                tw`absolute w-150 h-150 top-2.5 z-1 elevation-1`,
                { left: 10 },
                likeStyle,
              ]}
              resizeMode="contain"
            />
            <Animated.Image
              source={Nope}
              style={[
                tw`absolute w-150 h-150 top-2.5 z-1 elevation-1`,
                { right: 10 },
                nopeStyle,
              ]}
              resizeMode="contain"
            />
            {renderItem({ item: currentProfile })}
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  )
}

export default AnimatedStack
