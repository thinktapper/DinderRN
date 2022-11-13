import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
// import { Container, Name, Age, Description } from "./styles";
// import Glassmorphism from "~components/Glassmorphism";

function PersonalInfo({ user }) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.name}>
          {user.name}
          <Text style={styles.age}>, {user.rating}</Text>
        </Text>
        <Text style={styles.description}>{user.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  container: {
    backgroundColor: 'white',
    padding: 25,
    paddingBottom: 50,
  },
  name: {
    color: 'black',
    fontWeight: 'extra-bold',
    fontSize: 24,
  },
  age: {
    color: 'black',
    fontWeight: 'semi-bold',
    fontSize: 24,
  },
  description: {
    color: 'black',
  },
})

export default PersonalInfo
