import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

export function ListItem({ item, onPress }) {
  return (
    <Pressable onPress={() => onPress(item)}>
      <View style={styles.item}>
        <View style={styles.firstRow}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.secondRow}>
          <Text>{item.createdAt}</Text>
        </View>
        <Pressable>
          <FontAwesome name="edit" size={24} color="black" />
        </Pressable>
        <Pressable>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 30,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  firstRow: {
    marginTop: 5,
    marginBottom: 5,
  },
  secondRow: {
    marginBottom: 10,
  },
  title: { fontWeight: 'bold' },
})
