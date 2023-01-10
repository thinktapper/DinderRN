import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import tw from 'twrnc'
import CardImageSteps from '../components/CardImageSteps'
import CardImageCarousel from '../components/CardImageCarousel'

const PlaceCard = (props) => {
  const {
    card,
    swipeRef,
    // currentIndex,
    // setCurrentIndex,
    globalPadding,
    wrapperPadding,
  } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  if (card.photos.length < 1) {
    card.photos = ['https://links.papareact.com/6gb']
  }
  return (
    <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
      <CardImageSteps
        images={card.photos}
        currentIndex={currentIndex}
        globalPadding={globalPadding}
        wrapperPadding={wrapperPadding}
      />
      <CardImageCarousel
        images={card.photos}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        wrapperPadding={wrapperPadding}
      />
      {/* </View> */}
      <View
        style={[
          tw`absolute bottom-0 bg-white w-full flex-row justify-center items-center h-20 px-4 py-2 rounded-b-xl`,
          styles.cardShadow,
          styles.truncate,
        ]}>
        <View style={tw`flex-1`}>
          <Text style={[tw`text-xl`, styles.truncate]}>{card.name}</Text>
          <Text style={tw`text-lg text-slate-500`}>
            {card.rating} ⭐️ ({card.ratingsTotal})
          </Text>
        </View>
        <Text style={tw`text-2xl font-semibold`}>{card.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.41,

    elevation: 2,
  },
  imageTextContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 80,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageTextName: {
    fontSize: 25,
  },
  imageTextAge: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  imageTextJob: {
    color: 'grey',
    // fontSize: 20,
    marginTop: 5,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})

export default PlaceCard
