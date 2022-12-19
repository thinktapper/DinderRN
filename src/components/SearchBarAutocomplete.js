import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import { EvilIcons, MaterialIcons } from '@expo/vector-icons'
// import { width, height } from '../utils/ResponsiveScreen'
import { rs } from '../utils/ResponsiveScreen'
import tw from 'twrnc'

const SearchBarWithAutocomplete = (props) => {
  // const [inputSize, setInputSize] = useState({ width: width, height: height })
  // const width = rs(80)
  // const height = rs()

  const {
    value,
    style,
    onChangeText,
    onPredictionTapped,
    predictions,
    showPredictions,
  } = props
  // const { container, inputStyle } = styles
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style

  const inputBottomRadius = showPredictions
    ? {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }

  const _renderPredictions = (predictions) => {
    // const { predictionsContainer, predictionRow } = styles
    // const calculatedStyle = {
    //   width: inputSize.width,
    // }
    return (
      <FlatList
        style={styles.searchResultsContainer}
        data={predictions}
        keyExtractor={(item) => item.place_id}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() =>
                onPredictionTapped(item.place_id, item.description)
              }>
              {/* <View style={tw`flex-row`}> */}
              <Text style={tw`flex-1 text-black font-bold text-xl`}>
                {item.description}
              </Text>
              <MaterialIcons name="place" size={20} color="#e13a59" />
              {/* </View> */}
            </TouchableOpacity>
          )
        }}
        // keyboardShouldPersistTaps="handled"
      />
    )
  }

  return (
    <View style={styles.box}>
      <View style={styles.autocompleteContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="enter a city, state, or zip code"
          placeholderTextColor="#35383c"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        <EvilIcons name="search" size={30} color="#35383c" />
      </View>

      {showPredictions && _renderPredictions(predictions)}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    marginTop: 12,
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#e13959',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    // backgroundColor: '#cfcfcf',
    borderRadius: 20,
    color: 'black',
    fontSize: 16,
    // flex: 1,
    // width: rs(80),
    // height: 50,
    // color: '#212121',
    // lineHeight: 22,
    // fontSize: 16,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#35383c',
  },
  predictionsContainer: {
    backgroundColor: '#cfcfcf',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  predictionRow: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // marginBottom: 12,
    // borderRadius: 24,
    // paddingHorizontal: 24,
    // paddingVertical: 12,
    // backgroundColor: '#cfcfcf',
  },
  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  box: {
    flex: 1,
    alignItems: 'center',
  },
})

export default SearchBarWithAutocomplete
