import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  const values = {
    feast,
    setFeast,
  }

  // useEffect(() => {
  //   const getDataFromStorage = async () => {
  //     const data = await getAppData()
  //     if (data) {
  //       setFeastName(data.feastName)
  //       setFeastAddress(data.feastAddress)
  //       setPlaces(data.places)
  //     }
  //   }

  //   getDataFromStorage().then(() => {
  //     console.log('Data retrieved from storage')
  //   })
  // }, [])

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
