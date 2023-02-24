import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import * as SecureStore from 'expo-secure-store'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { apiURL } from '../lib/constants'
import { SECURE_SECRET } from '@env'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(null)
  // const [isSignOut, setIsSignOut] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)
  const value = {
    user,
    splashLoading,
    login,
    logout,
    signup,
    updateUser,
  }

  async function getStoredUser() {
    const storedUser = await SecureStore.getItemAsync(SECURE_SECRET)
    return storedUser ? JSON.parse(storedUser) : null
  }

  async function setStoredUser(user) {
    await SecureStore.setItemAsync(SECURE_SECRET, JSON.stringify(user))
  }

  async function clearStoredUser() {
    // setUser(null)
    queryClient.clear()
    await SecureStore.deleteItemAsync(SECURE_SECRET)
    return 'Success, User logged out'
  }

  async function login(values) {
    const { username, password } = values

    setSplashLoading(true)
    try {
      const response = await axios.post(`${apiURL.remote}/login`, {
        username,
        password,
      })

      // update stored user data
      if ('user' in response.data && 'token' in response.data.user) {
        await setStoredUser(response.data.user)
        setUser(response.data.user)
        // console.debug(`User ${response.data.user.username} logged in`)
      }
      setSplashLoading(false)
    } catch (err) {
      console.error(err)
      setSplashLoading(false)
    }
  }

  async function signup(email, username, image, password) {
    setSplashLoading(true)
    try {
      const { data, status } = await axios({
        url: `${apiURL.remote}/signup`,
        method: 'post',
        data: {
          email,
          username,
          image,
          password,
        },
      })

      if ('user' in data && 'token' in data.user) {
        setUser(data.user)

        // update stored user data
        await setStoredUser(data.user)
        // console.debug(`User ${data.user.username} signed up`)
      }

      setSplashLoading(false)
    } catch (err) {
      console.error(err)
      setSplashLoading(false)
    }
  }

  async function updateUser(values) {
    try {
      const response = await axios({
        url: `${apiURL.remote}/api/user/update`,
        method: 'put',
        data: { ...values },
        headers: {
          // prettier-ignore
          'authorization': `Bearer ${user.token}`,
        },
      })

      // update stored user data
      if ('user' in response.data && 'token' in response.data.user) {
        setUser(response.data.user)
        await setStoredUser(response.data.user)
      }
      return response
    } catch (err) {
      console.error(`Error updating user: ${err}`)
    }
  }

  async function logout() {
    try {
      const response = await axios({
        url: `${apiURL.remote}/logout`,
        method: 'post',
        headers: {
          // prettier-ignore
          'authorization': `Bearer ${user.token}`,
        },
      })
      // remove stored user data
      if (response.data.success) {
        setUser(null)
        await clearStoredUser()
      } else {
        throw new Error('Error logging out')
      }
    } catch (err) {
      console.error(`Error loggin out: ${err}`)
    }
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true)
      const userInfo = await getStoredUser()
      if (userInfo) {
        setUser(userInfo)
      }
      setSplashLoading(false)
    } catch (err) {
      console.log(`isLoggedIn error: ${err}`)
      setSplashLoading(false)
    }
  }

  useEffect(() => {
    isLoggedIn()
    // logout()

    // const reset = async () => {
    //   queryClient.clear()
    //   const message = await clearStoredUser()
    //   if (message.includes('Success')) {
    //     console.debug(message)
    //   } else {
    //     console.log('Error logging out')
    //     throw new Error('Error logging out')
    //   }
    // }

    // reset()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
