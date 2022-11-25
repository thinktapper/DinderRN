import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GOOGLE_API } from '@env'

const storageKey = 'app-data'

const setAppData = async (newData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData))
  } catch (err) {
    console.log(`Oops saving async data: ${err}`)
  }
}

const getAppData = async () => {
  try {
    const data = await AsyncStorage.getItem(storageKey)
    if (data) {
      return JSON.parse(data)
    }
    return null
  } catch (err) {
    console.log(`Oops getting async data: ${err}`)
    return null
  }
}

const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [feast, setFeast] = useState(null)
  const [feastName, setFeastName] = useState('')
  const [feastAddress, setFeastAddress] = useState(null)
  // const [lat, setLat] = useState(0)
  // const [long, setLong] = useState(0)
  const [location, setLocation] = useState({ lat: 0, long: 0 })
  const [radius, setRadius] = useState(1)
  const [places, setPlaces] = useState([])
  const [endsAt, setEndsAt] = useState(null)

  const getCoords = (details) => {
    try {
      // setLat(details.geometry.location.lat)
      // setLong(details.geometry.location.lng)
      setLocation({
        lat: details.geometry.location.lat,
        long: details.geometry.location.lng,
      })
      console.debug(`Coords set: ${location.lat}, ${location.long}`)
    } catch (err) {
      console.warn(`Could not set coords: ${err}`)
    }
  }

  const handleGetPlaces = useCallback(async () => {
    const { lat, long } = location
    const distance = radius * 1609.34
    const googlePlacesBaseUrl = 'https://maps.googleapis.com/maps/api/place'
    const searchUrl = `${googlePlacesBaseUrl}/textsearch/json?query=restaurants&locationbias=circle%3A${distance}%40${lat}%2C${long}&key=${GOOGLE_API}`
    const fields =
      'name,place_id,rating,user_ratings_total,price_level,photos,editorial_summary'
    const extraFields =
      'opening_hours,formatted_address,formatted_phone_number,website'

    // fetch data from Google Maps API
    try {
      const res = await fetch(searchUrl)
      const data = await res.json()
      if (res.ok) {
        let fetchedPlaces = []
        let arrPlaceDetails = []

        // get place details for each place
        for (let result of data.results) {
          arrPlaceDetails.push(
            fetch(
              `${googlePlacesBaseUrl}/details/json?place_id=${result.place_id}&fields=${fields}&key=${GOOGLE_API}`,
            ),
          )
        }

        const arrDetailsResults = await Promise.all(arrPlaceDetails)

        for (let pr of arrDetailsResults) {
          let data = await pr.json()
          let googlePlace = data.result
          let place = {}
          let gallery = await googlePlace.photos?.map(
            (photo) =>
              `${googlePlacesBaseUrl}/photo?maxwidth=600&photoreference=${photo.photo_reference}&key=${GOOGLE_API}`,
          )
          let summary = googlePlace.editorial_summary
            ? googlePlace.editorial_summary.overview
            : 'No description available'
          // Transform price level to dollar signs
          let pl = ''
          if (googlePlace.price_level) {
            for (let i = 0; i < googlePlace.price_level; i++) {
              pl += '$'
            }
          } else {
            pl = 'Price N/A'
          }
          // Transform rating to stars
          let starRating = ''
          if (googlePlace.rating) {
            for (let i = 0; i < googlePlace.rating; i++) {
              starRating += '★'
            }
          }

          place.googleID = googlePlace.place_id
          place.name = googlePlace.name
          place.price = pl
          place.rating = googlePlace.rating || 'No ratings'
          place.ratingsTotal = googlePlace.user_ratings_total || 'N/A'
          place.stars = starRating
          place.photos = gallery
          place.description = summary

          fetchedPlaces.push(place)
        }

        // Set fetchedPlaces array to state
        // console.log(fetchedPlaces)
        // setPlaces(fetchedPlaces)
        return fetchedPlaces
      }
    } catch (error) {
      console.error(`Error fetching places from Google: ${error}`)
    }
  }, [location, radius])

  // const handleSaveDataStore = async () => {
  //   // create a new feast in DataStore
  //   try {
  //     const { lat, long } = coords
  //     const user = await Auth.currentAuthenticatedUser()

  //     const newFeast = await DataStore.save(
  //       new Feast({
  //         name: feastName,
  //         endsAt: endsAt,
  //         lat: lat,
  //         long: long,
  //         radius: radius,
  //         userID: user.attributes.sub,
  //         // organizer: user.attributes.id,
  //       }),
  //     )
  //     console.log(`New feast created: ${{ newFeast }}`)
  //     setFeast(newFeast)
  //     // console.debug(`Feast set to: ${feast}`)

  //     // // fetch places from Google
  //     // const newPlaces = await handleGetPlaces()
  //     // setPlaces(newPlaces)

  //     // save places to DataStore
  //     for (let place of places) {
  //       await DataStore.save(
  //         new Place({
  //           googleID: place.googleID,
  //           name: place.name,
  //           price: place.price,
  //           rating: place.rating.toString(),
  //           ratingsTotal: place.ratingsTotal,
  //           stars: place.stars,
  //           photos: place.photos,
  //           description: place.description,
  //           feastID: newFeast.id,
  //         }),
  //       )
  //     }
  //     console.debug(`Places saved to DataStore`)

  //     // save feast to AsyncStorage
  //     await setAppData({
  //       feastName: feastName,
  //       feastAddress: feastAddress,
  //       places: places,
  //       endsAt: endsAt,
  //     })

  //     // return newFeast
  //     return newFeast
  //   } catch (err) {
  //     console.log(`Error saving new feast: ${err.message}`)
  //   }
  // }

  const handleSaveFeast = async ({
    newFeastName,
    newFeastAddress,
    newRadius,
    newEndsAt,
  }) => {
    try {
      setFeastName(newFeastName)
      setFeastAddress(newFeastAddress)
      setRadius(newRadius)
      setEndsAt(newEndsAt)
      console.debug('New feast variables set in state')

      // fetch places from Google
      const newPlaces = await handleGetPlaces()
      setPlaces(newPlaces)
      console.debug('Places fetched from Google and set to state')

      // create a new feast in DataStore
      // const DSResult = await handleSaveDataStore()
      // if (DSResult) {
      //   console.log(`New feast saved to DataStore: ${DSResult}`)
      // }
      return newPlaces
    } catch (err) {
      console.log(`Error saving feast: ${err.message}`)
    }
  }

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData()
      if (data) {
        setFeastName(data.feastName)
        setFeastAddress(data.feastAddress)
        setPlaces(data.places)
      }
    }

    getDataFromStorage().then(() => {
      console.log('Data retrieved from storage')
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        feast,
        feastName,
        feastAddress,
        location,
        endsAt,
        radius,
        places,
        getCoords,
        // handleGetPlaces,
        handleSaveFeast,
        // handleSaveDataStore,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
