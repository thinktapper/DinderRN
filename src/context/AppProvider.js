import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from '../context/AuthProvider'
import getFeastPlaces from '../hooks/useFeastPlaces'
import { activeColor, color } from '../lib/constants'
import axios from 'axios'

const storageKey = 'app-data'
const feastDetails = 'feast-data'

const AppContext = createContext({})

const setAppData = async (newData) => {
  try {
    await AsyncStorage.setItem(feastDetails, JSON.stringify(newData))
  } catch (err) {
    console.log(`Oops saving async data: ${err}`)
  }
}
const getAppData = async () => {
  try {
    const data = await AsyncStorage.getItem(feastDetails)
    if (data) {
      return JSON.parse(data)
    }
    return null
  } catch (err) {
    console.log(`Oops getting async data: ${err}`)
    return null
  }
}

export const AppProvider = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState('Home')
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext()
  const [currentFeast, setCurrentFeast] = useState(null)
  const [places, setPlaces] = useState([])

  async function getFeastPlaces(feast, user) {
    if (!feast || !user) return null

    const { data } = await axios({
      url: `http://localhost:3000/api/feast/${feast.id}`,
      method: 'get',
      headers: { authorization: `Bearer ${user.token}` },
    })

    setPlaces(data.feast.places)

    // return data.success ? data.feast : null
    // return data.feast.places
  }

  const handleChangeFeast = (feast) => {
    setLoading(true)
    try {
      const feastPlaces = getFeastPlaces(feast, user)
      setCurrentFeast(feast)
      setPlaces(feast.places)

      setAppData(feast)
      setLoading(false)
      return feast
    } catch (err) {
      console.warn(`Error saving feast change locally: ${err.message}`)
      setLoading(false)
    }
  }

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData()
      if (data) {
        setCurrentFeast(data.currentFeast)
        setPlaces(data.places)
      }
    }

    getDataFromStorage().then(() => {
      console.log('Data retrieved from storage')
    })
  }, [])

  const values = {
    color,
    activeColor,
    activeScreen,
    setActiveScreen,
    currentFeast,
    setCurrentFeast,
    places,
    setPlaces,
    handleChangeFeast,
    loading,
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
