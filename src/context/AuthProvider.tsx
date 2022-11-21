import React, { createContext, useContext, useState, useEffect } from 'react'
import { get, createUrl, isStoredJwt, setStoredJwt } from '../utils/http'
import { supabase } from '../utils/supabase'
import { Session } from '@supabase/supabase-js'
import { Alert } from 'react-native'
import axios from 'axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const me = async () => {
    return isStoredJwt()
      ? (await get(createUrl('/me')).catch(() => null))?.data
      : null
  }

  const login = async (username, password) => {
    const result = (await axios.post(
      'https://dinder-is-served-init.onrender.com/login',
    ),
    { username, password }).catch(() => null)?.data
    if (!result) {
      return Alert.alert('Could not login')
    }
    setStoredJwt(result.token)
    return result
    // return me()
    // setUser(result.username)
  }

  const signup = async (username, password, email) => {
    const result = (await axios.post(
      'https://dinder-is-served-init.onrender.com/user',
    ),
    { username, password, email }).catch(() => null)?.data
    if (!result) {
      return Alert.alert('Could not signup')
    }
    setStoredJwt(result.token)
    // setUser(result)
    // return me()
    return result
  }
  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, me }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
