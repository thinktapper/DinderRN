import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
// import {
//   CarouselContainer,
//   PreviousImage,
//   NextImage,
//   UpperPart,
//   Picture,
//   Container,
// } from "./styles";

import PersonalInfo from './components/PersonalInfo'
import Distance from './components/Distance'
import Pagination from './components/Pagination'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, {
  FadeIn,
  FadeOut,
  FlipOutYLeft,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  ZoomOut,
} from 'react-native-reanimated'

const springConfig = { mass: 0.2 }

function MainCard({ card, ...props }) {
  const { photos } = card
  const shouldShowPersonalInfo = true
  const [currentImage, setCurrentImage] = useState(0)
  const navigation = useNavigation()

  const rotation = useSharedValue(0)

  const openUserProfile = useCallback(() => {
    console.warn('openUserProfile')
    // navigation.navigate(SceneName.UserProfile, { user })
  }, [])

  const gotoPreviousImage = () => {
    if (currentImage !== 0) return setCurrentImage(index => index - 1)

    rotation.value = withSequence(
      withSpring(-0.5, springConfig),
      withSpring(0, springConfig),
    )
  }

  const gotoNextImage = () => {
    if (currentImage + 1 < pictures.length) {
      return setCurrentImage(index => index + 1)
    }
    rotation.value = withSequence(
      withSpring(0.5, springConfig),
      withSpring(0, springConfig),
    )
  }

  const transform = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 100 }, { rotateY: rotation.value + 'deg' }],
    }
  })

  return (
    <Animated.View {...props} style={[styles.container, transform]}>
      <Animated.Image
        entering={FadeIn}
        exiting={FadeOut}
        source={{ uri: photos[currentImage] }}
        style={styles.picture}
      />
      <View style={styles.upperPart}>
        <Distance />
        <Pagination pages={photos.length} currentPage={currentImage} />
        <View style={styles.carouselContainer}>
          <Pressable onPress={gotoPreviousImage} style={styles.previousImage} />
          <Pressable onPress={gotoNextImage} style={styles.nextImage} />
        </View>
      </View>
      {!!shouldShowPersonalInfo && (
        <TouchableOpacity activeOpacity={0.95} onPress={openUserProfile}>
          <PersonalInfo user={card} />
        </TouchableOpacity>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'white',
  },
  upperPart: {
    flex: 1,
  },
  carouselContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  previousImage: {
    flex: 1,
  },
  nextImage: {
    flex: 1,
  },
})

export default MainCard
