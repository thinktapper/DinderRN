import React from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
// import { Container, Content, DistanceText } from "./styles";
import Location from '../../../../../assets/images/Location.svg'

function Distance() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Image source={Location} width={14} height={14} fill={'black'} /> */}
        <Text style={styles.distanceText}>9mi</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderRadius: 5,
    marginBottom: 'auto',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  content: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  distanceText: {
    marginLeft: 5,
    marginBottom: 3,
    flexGrow: 0,
    color: 'black',
    fontWeight: '600',
  },
})

export default Distance
