import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { width, rs } from '../utils/ResponsiveScreen'

const CardImageSteps = ({
  images,
  currentImageIndex,
  globalPadding,
  wrapperPadding,
}) => {
  const widthCalc =
    (width -
      (wrapperPadding * 2 + globalPadding * 2) -
      rs(5) * images.length -
      1) /
    images.length
  const styles = useMemo(
    () => createStyles(widthCalc, globalPadding),
    [widthCalc, globalPadding],
  )

  return (
    <View style={styles.wrapper}>
      {images.map((_, index) => {
        return (
          <View
            key={index}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.stepIndicator,
              backgroundColor: currentIndex === index ? '#EE61A1' : 'white',
              marginRight: Math.max(images.length - 1) === index ? 0 : rs(5),
            }}
          />
        )
      })}
    </View>
  )
}

const createStyles = (widthCalc, globalPadding) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      zIndex: 1,
      borderTopStartRadius: 15,
      borderTopEndRadius: 15,
      left: 0,
      right: 0,
      paddingHorizontal: globalPadding,
      paddingTop: globalPadding,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    stepIndicator: {
      height: 3,
      width: widthCalc,
      borderRadius: 999,
    },
  })

export default CardImageSteps
