import React, { createContext, useContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
// import { me, login, signup } from '../utils/auth'
import * as SecureStore from 'expo-secure-store'
// import axios from 'axios'
// import { useQuery, useMutation } from 'react-query'
// import { getMe } from '../utils/authApi'
import { SECURE_SECRET } from '@env'

const SECURE_AUTH_STORAGE_KEY = SECURE_SECRET

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)

  async function getStoredUser() {
    const storedUser = await SecureStore.getItemAsync(SECURE_AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  }

  async function setStoredUser(user) {
    await SecureStore.setItemAsync(
      SECURE_AUTH_STORAGE_KEY,
      JSON.stringify(user),
    )
  }

  async function clearStoredUser() {
    await SecureStore.deleteItemAsync(SECURE_AUTH_STORAGE_KEY)
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
      value={{
        userInfo,
        splashLoading,
        isLoggedIn,
        getStoredUser,
        setStoredUser,
        clearStoredUser,
        // eslint-disable-next-line prettier/prettier
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
