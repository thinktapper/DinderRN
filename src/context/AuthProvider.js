import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { Alert } from 'react-native'
// import { me, login, signup } from '../utils/auth'
import * as SecureStore from 'expo-secure-store'
import { request } from '../utils/authApi'
// import axios from 'axios'
// import { useQuery, useMutation } from 'react-query'
// import { getMe } from '../utils/authApi'
import { SECURE_SECRET } from '@env'

const SECURE_AUTH_STORAGE_KEY = SECURE_SECRET

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  // const [userInfo, setUserInfo] = useState(null)
  const [user, setUser] = useState(null)
  const [isSignOut, setIsSignOut] = useState(false)
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

  async function login(username, password) {
    // authServerCall('/login', username, password)
    setSplashLoading(true)
    try {
      const { data, status } = await request({
        url: '/login',
        method: 'post',
        data: {
          username,
          password,
        },
      })

      // if (status === 400) {
      //   console.warn('Error: ', data.message)
      //   return
      // }
      if ('user' in data && 'token' in data.user) {
        setIsSignOut(false)
        console.debug(`User ${data.user.username} logged in`)
      }

      // update stored user data
      await setStoredUser(data.user)
      setUser(data.user)
      setSplashLoading(false)
    } catch (err) {
      console.error(err)
      setSplashLoading(false)
    }
  }

  async function signup(email, username, password) {
    setSplashLoading(true)
    try {
      const { data, status } = await request({
        url: '/signup',
        method: 'post',
        data: {
          email,
          username,
          password,
        },
      })

      // if (status === 400) {
      //   console.warn('Error: ', data.message)
      //   return
      // }
      if ('user' in data && 'token' in data.user) {
        setIsSignOut(false)
        console.debug(`User ${data.user.username} signed up`)
      }

      setUser(data.user)
      // update stored user data
      await setStoredUser(data.user)
      setSplashLoading(false)
    } catch (err) {
      console.error(err)
      setSplashLoading(false)
    }
  }

  async function logout() {
    // setIsSignOut(true)
    setUser(null)
    // remove stored user data
    // clearUser()
    await clearStoredUser()
    console.debug('User logged out')
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true)
      let userInfo = await SecureStore.getItemAsync(SECURE_AUTH_STORAGE_KEY)
      userInfo = JSON.parse(userInfo)
      if (userInfo) {
        setUser(userInfo)
        setIsSignOut(false)
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

  const authContext = useMemo(
    () => ({
      user,
      login,
      signup,
      logout,
      splashLoading,
      isSignOut,
      setIsSignOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [login, signup, logout],
  )

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
