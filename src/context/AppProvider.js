import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from '../context/AuthProvider'
import { activeColor, color } from '../lib/constants'

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
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext()
  // const [activeScreen, setActiveScreen] = useState('Home')

  const values = {
    color,
    activeColor,
    loading,
  }

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
