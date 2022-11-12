import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GOOGLE_API } from '@env'

const storageKey = 'my-app-data'

const setAppData = async newData => {
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
  const [feastName, setFeastName] = useState('')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [radius, setRadius] = useState(1)
  const [places, setPlaces] = useState([])

  const getCoords = details => {
    // console.warn(details)
    try {
      setLat(details.geometry.location.lat)
      setLong(details.geometry.location.lng)
    } catch (error) {
      console.warn(`Could not set coords: ${error}`)
    }
    // } finally {
    //   console.warn(`Latitude set to: ${lat}, Longitude set to: ${long}`)
    // }
  }

  const handleGetPlaces = useCallback(async () => {
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

        // data.results.forEach(place => {
        //   arrPlaceDetails.push(
        //     fetch(
        //       `${googlePlacesBaseUrl}/details/json?place_id=${result.place_id}&fields=${fields}&key=${GOOGLE_API}`,
        //     ),
        //   )
        // })
        for (result of data.results) {
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

          console.log(`googlePlace (stringified): ${googlePlace}`)
          let place = {}
          let gallery = await googlePlace.photos?.map(
            photo =>
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

          place.placeID = googlePlace.place_id
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
        // TODO: save places to DataStore
        console.log(fetchedPlaces)
        // setPlaces(fetchedPlaces)
        return fetchedPlaces
      }
    } catch (error) {
      console.error(`Error fetching places from Google: ${error}`)
    }
  }, [])

  const handleSaveFeast = useCallback(async ({ newFeastName, newRadius }) => {
    setFeastName(newFeastName)
    setRadius(newRadius)

    try {
      const newPlaces = await handleGetPlaces()
      setPlaces(newPlaces)
      setAppData({ feastName: newFeastName, places: newPlaces })
    } catch (err) {
      console.log(`Error saving feast: ${err}`)
    }
  }, [])

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData()
      if (data) {
        setFeastName(data.feastName)
        setPlaces(data.places)
      }
    }

    getDataFromStorage()
  }, [])

  return (
    <AppContext.Provider
      value={{
        feastName,
        lat,
        long,
        radius,
        places,
        getCoords,
        handleGetPlaces,
        handleSaveFeast,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
