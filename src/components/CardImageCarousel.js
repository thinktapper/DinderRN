import React, { useCallback } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native'
import tw from 'twrnc'
import { width } from '../utils/ResponsiveScreen'

const CardImageCarousel = ({
  images,
  swipeRef,
  setCurrentIndex,
  currentIndex,
  wrapperPadding,
}) => {
  // const changeImageHandler = useCallback(
  //   ({ nativeEvent }) => {
  //     if (nativeEvent.pageX > (width - wrapperPadding * 2) / 2) {
  //       if (currentIndex < images.length - 1) {
  //         setCurrentIndex(prevIndex => prevIndex + 1)
  //       }
  //     } else {
  //       if (currentIndex > 0) {
  //         setCurrentIndex(prevIndex => prevIndex - 1)
  //       }
  //     }
  //   },
  //   [currentIndex],
  // )
  const gotoPreviousImage = () => {
    if (currentIndex !== 0) return setCurrentIndex(index => index - 1)
  }
  const gotoNextImage = () => {
    if (currentIndex + 1 < images.length) {
      return setCurrentIndex(index => index + 1)
    }
  }

  return (
    <View style={styles.carouselContainer}>
      <Image
        resizeMode="cover"
        source={{
          uri: images[currentIndex],
        }}
        style={tw`absolute top-0 h-full w-full rounded-xl`}
      />
      <Pressable onPress={gotoPreviousImage} style={styles.previousImage} />
      <Pressable onPress={gotoNextImage} style={styles.nextImage} />
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
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

export default CardImageCarousel
