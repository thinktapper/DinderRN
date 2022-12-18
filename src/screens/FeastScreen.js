import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native'
import tw from 'twrnc'

const FeastScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.root}>
      {/* <View style={styles.container}> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Feasts</Text>
      </ScrollView>

      <Pressable
        onPress={() => navigation.navigate('NewFeast')}
        style={styles.button}>
        <Text>Create new feast</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text>Cancel</Text>
      </Pressable>
      {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    // alignContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  container: {
    padding: 10,
  },
  elementContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#F63A6E',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
})

export default FeastScreen
