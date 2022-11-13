import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { width } from '../utils/ResponsiveScreen'

const CardImageCarousel = ({
  images,
  setCurrentImageIndex,
  currentImageIndex,
  wrapperPadding,
}) => {
  const changeImageHandler = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.pageX > (width - wrapperPadding * 2) / 2) {
        if (currentImageIndex < images.length - 1) {
          setCurrentImageIndex(prevIndex => prevIndex + 1)
        }
      } else {
        if (currentImageIndex > 0) {
          setCurrentImageIndex(prevIndex => prevIndex - 1)
        }
      }
    },
    [currentImageIndex],
  )

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={1}
      onPress={changeImageHandler}>
      <Image
        resizeMode="cover"
        source={{
          uri: images[currentImageIndex],
        }}
        style={styles.image}
      />
    </TouchableOpacity>
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
})

export default CardImageCarousel
