import React from 'react'
import Animated from 'react-native-reanimated'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
// import { Container, Content, Dot } from "./styles";

function Pagination({ pages, currentPage }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {Array.from({ length: pages }).map((_, index) => {
          const active = index === currentPage

          const style = useAnimatedStyle(() => {
            const size = withTiming(active ? 8 : 6, { duration: 200 })
            return { width: size, height: size }
          })

          return (
            <Animated.View
              key={index}
              active={active}
              style={[style, styles.dot, { opacity: active ? 1 : 0.6 }]}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 'auto',
    alignSelf: 'flex-end',
    width: 24,
  },
  content: {
    padding: 5,
    marginBottom: 'auto',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: 'black',
    // opacity: { active: 1, inactive: 0.6 },
    borderRadius: 5,
    margin: 3,
  },
})

export default Pagination
