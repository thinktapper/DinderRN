import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native'
import tw from 'twrnc'
import { useUserFeasts } from '../hooks/useFeasts'
import Feast from '../components/Feast'
import { ListItem } from '../components/ListItem'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { Divider } from 'native-base'
import { useAppContext } from '../context/AppProvider'

const FeastScreen = ({ navigation }) => {
  const ctx = useAppContext()
  const { feasts, isLoading, error } = useUserFeasts()

  const onListItemPress = useCallback(
    (feast) => {
      // ctx.handleChangeFeast(feast)
      navigation.navigate('Home', {
        feast,
      })
    },
    [navigation],
  )

  const renderItem = useCallback(
    ({ item }) => {
      return <ListItem item={item} onPress={onListItemPress} />
    },
    [onListItemPress],
  )

  if (isLoading) return <LoadingIndicator />
  if (error) return console.log(error)

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Feasts</Text>

        <Pressable
          onPress={() => navigation.navigate('NewFeast')}
          style={styles.button}>
          <Text>Create new</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text>Cancel</Text>
        </Pressable>

        <FlatList
          data={feasts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
        />

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
      </View>
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
