import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react'
import * as SecureStore from 'expo-secure-store'
// import { queryClient } from '../lib/queryClient'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { apiURL } from '../lib/constants'
import { SECURE_SECRET } from '@env'

// const SECURE_AUTH_STORAGE_KEY = SECURE_SECRET

const authClient = axios.create({ baseURL: 'http://localhost:3000' })

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(null)
  const [isSignOut, setIsSignOut] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)
  const value = {
    user,
    splashLoading,
    login,
    logout,
    signup,
    updateUser,
    authRequest,
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

  async function authRequest({ ...options }) {
    authClient.defaults.headers.common['authorization'] = `Bearer ${user.token}`
    // const onSuccess = (response) => response
    // const onError = (error) => {
    //   return error
    // }

    try {
      const response = await authClient(options)
      return response
    } catch (error) {
      return error
    }
  }

  async function login(values) {
    // authServerCall('/login', username, password)
    const { username, password } = values
    setSplashLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      })
      if ('user' in response.data && 'token' in response.data.user) {
        // update stored user data
        await setStoredUser(response.data.user)
        setUser(response.data.user)
        console.debug(`User ${response.data.user.username} logged in`)
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
        url: `${apiURL.local}/signup`,
        method: 'post',
        data: {
          email,
          username,
          image,
          password,
        },
      })

      if ('user' in data && 'token' in data.user) {
        // setIsSignOut(false)
        setUser(data.user)

        // update stored user data
        await setStoredUser(data.user)
        console.debug(`User ${data.user.username} signed up`)
      }

      setSplashLoading(false)
    } catch (err) {
      console.error(err)
      setSplashLoading(false)
    }
  }

  async function updateUser(values) {
    // setIsSignOut(true)
    try {
      const response = await axios({
        url: 'http://localhost:3000/api/user/update',
        method: 'put',
        data: { ...values },
        headers: {
          // prettier-ignore
          'authorization': `Bearer ${user.token}`,
        },
      })
      // console.log(JSON.stringify(response))
      if ('user' in response.data && 'token' in response.data.user) {
        // setIsSignOut(false)
        setUser(response.data.user)
        // update stored user data
        await setStoredUser(response.data.user)
        console.debug(`User ${response.data.user.username} updated`)
      }
      return response
    } catch (err) {
      console.error(`Error updating user: ${err}`)
    }
  }

  async function logout() {
    // setIsSignOut(true)
    try {
      const response = await axios({
        url: 'http://localhost:3000/logout',
        method: 'post',
        headers: {
          // prettier-ignore
          'authorization': `Bearer ${user.token}`,
        },
      })
      // console.log(JSON.stringify(response))
      if (response.data.success) {
        setUser(null)
        // remove stored user data
        await clearStoredUser()
        // if (message === 'Success, User logged out') {
        //   console.debug(message)
        // }
      } else {
        console.log('Error logging out')
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
      // userInfo = JSON.parse(userInfo)
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
    //     // === 'Success, User logged out') {
    //     console.debug(message)
    //   } else {
    //     console.log('Error logging out')
    //     throw new Error('Error logging out')
    //   }
    // }

    // reset()
  }, [])

  // const authContext = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     updateUser,
  //     signup,
  //     logout,
  //     splashLoading,
  //     isSignOut,
  //     setIsSignOut,
  //   }),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [login, updateUser, signup, logout],
  // )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
