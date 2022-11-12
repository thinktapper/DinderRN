import React, { createContext } from 'react'
import { useContext } from 'react'

const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ lat: 0, long: 0, radius: 1 }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
