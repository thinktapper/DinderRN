import React, { createContext, useContext, useState, useEffect } from 'react'
// import { get, post, createUrl, isStoredJwt, setStoredJwt } from '../utils/http'
// import { supabase } from '../utils/supabase'
// import { Session } from '@supabase/supabase-js'
import { Alert } from 'react-native'
// import { me, login, signup } from '../utils/auth'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

const SECURE_AUTH_STORAGE_KEY = 'WetSpot'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)

  const signup = (username, email, password) => {
    setIsLoading(true)
    axios
      .post('http://localhost:3000/signup', {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.type === 'success') {
          let userInfo = response.data
          setUserInfo(userInfo)
          const auth = JSON.stringify(userInfo)
          SecureStore.setItemAsync(SECURE_AUTH_STORAGE_KEY, auth)
          setIsLoading(false)
          console.log(userInfo)
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const login = (username, password) => {
    setIsLoading(true)
    axios
      .post('http://localhost:3000/login', {
        username,
        password,
      })
      .then((response) => {
        if (response.type === 'success') {
          let userInfo = response.data
          console.log(userInfo)
          setUserInfo(userInfo)
          const auth = JSON.stringify(userInfo)
          SecureStore.setItemAsync(SECURE_AUTH_STORAGE_KEY, auth)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        console.log(`login error: ${error}`)
        setIsLoading(false)
      })
  }

  const logout = () => {
    setIsLoading(true)
    axios
      .post(
        'http://localhost:3000/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then((response) => {
        console.log('logout response: ', response)
        SecureStore.deleteItemAsync(SECURE_AUTH_STORAGE_KEY)
        setUserInfo({})
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`logout error: ${error}`)
        setIsLoading(false)
      })
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true)
      let userInfo = await SecureStore.getItemAsync(SECURE_AUTH_STORAGE_KEY)
      userInfo = JSON.parse(userInfo)
      if (userInfo) {
        setUserInfo(userInfo)
      }
      setSplashLoading(false)
    } catch (err) {
      setSplashLoading(false)
      console.log(`isLoggedIn error: ${err}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider
      // eslint-disable-next-line prettier/prettier
      value={{ isLoading, userInfo, splashLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
