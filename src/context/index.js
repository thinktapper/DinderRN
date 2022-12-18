import React, { createContext, useContext, useReducer, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { SECURE_SECRET } from '@env'
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../lib/user-storage'

const initialState = {
  authUser: null,
}

const createInitialState = async () => {
  const initUser = await getStoredUser()
  return {
    authUser: initUser,
  }
}

const AuthContext = createContext({})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      }
    }
    case 'CLEAR_USER': {
      return {
        ...state,
        authUser: null,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const value = { state, dispatch }

  const initUser = async () => {
    const user = await getStoredUser()
    dispatch({ type: 'SET_USER', payload: user })
  }
  useEffect(() => {
    initUser()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// const useAuthContext = () => {
//   const ctx = useContext(AuthContext)

//   if (ctx) {
//     return ctx
//   }

//   throw new Error(`useAuthContext must be used within a AuthContextProvider`)
// }
const useAuthContext = () => useContext(AuthContext)

export { AuthContextProvider, useAuthContext }
