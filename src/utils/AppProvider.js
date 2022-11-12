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
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&locationbias=circle%3A${distance}%40${lat}%2C${long}&key=${GOOGLE_API}`

    // fetch data from Google Maps API
    try {
      const res = await fetch(searchUrl)
      const data = await res.json()
      if (res.ok) {
        let fetchedPlaces = []
        for (let googlePlace of data.results) {
          let place = {}
          let pl = ''
          if (googlePlace.price_level) {
            for (let i = 0; i < googlePlace.price_level; i++) {
              pl += '$'
            }
          } else {
            pl = 'Price N/A'
          }

          place.placeID = googlePlace.place_id
          place.name = googlePlace.name
          place.types = googlePlace.types
          place.address =
            googlePlace.formatted_address || 'Address not available'
          place.open = googlePlace.opening_hours.open_now
          place.price = pl
          place.rating = googlePlace.rating || 'No ratings'
          place.ratingsTotal = googlePlace.user_ratings_total || 'N/A'
          place.photo = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${googlePlace.photos[0].photo_reference}&sensor=false&maxheight=500&maxwidth=500&key=${GOOGLE_API}`

          fetchedPlaces.push(place)
        }

        // Set fetchedPlaces array to state
        // TODO: save places to DataStore
        setPlaces(fetchedPlaces)
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
      setAppData({ feastName: newFeastName, places: newPlaces })
    } catch (err) {
      console.log(`Error saving feast: ${err}`)
    }

    // try {
    //   await appContext.handleGetPlaces()

    //   Alert.alert('Feast info saved successfully')
    // } catch (err) {
    //   console.log(`Error saving feast: ${err}`)
    // }
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
