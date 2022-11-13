import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react'
import { Auth, Hub, DataStore } from 'aws-amplify'
import { User } from '../models/'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    // Create listener
    const listener = Hub.listen('datastore', async hubData => {
      const { event, data } = hubData.payload
      if (event === 'modelSynced' && data?.model?.name === 'User') {
        console.log('User Model has finished syncing')
        setUserLoading(false)
      }
    })

    return () => listener()
  }, [])

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const authUser = await Auth.currentAuthenticatedUser()

  //     const dbUsers = await DataStore.query(User, u =>
  //       u.sub('eq', authUser.attributes.sub),
  //     )

  //     if (!dbUsers || dbUsers.length === 0) {
  //       console.warn('This is a new user')
  //       return
  //     }
  //     const dbUser = dbUsers[0]
  //     setUser(dbUser)
  //     // setName(dbUser.name)
  //     // setBio(dbUser.bio)
  //   }
  //   getCurrentUser()
  // }, [])

  const handleSignIn = useCallback(async data => {
    // if (userLoading) {
    //   return
    // }

    setUserLoading(true)
    try {
      const response = await Auth.signIn(data.username, data.password)
      // console.log(response)
      return response
    } catch (error) {
      Alert.alert('Oops!', error.message)
    }
    setUserLoading(false)
  }, [])

  const handleSignOut = async () => {
    await DataStore.clear()
    Auth.signOut()
      .then(() => {
        setUser(null)
        Alert.alert('Signed Out')
      })
      .catch(err => console.log('Error signing out: ', err))
  }

  // Check user authentication status
  // const checkUser = useCallback(async () => {
  //   try {
  //     const authUser = await Auth.currentAuthenticatedUser({
  //       bypassCache: true,
  //     })
  //     if (authUser) {
  //       setUser(authUser)
  //     }
  //   } catch (error) {
  //     setUser(null)
  //   }
  // }, [])

  // useEffect(() => {
  //   checkUser()
  // }, [])

  // useEffect(() => {
  //   const listener = data => {
  //     if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
  //       checkUser()
  //     }
  //   }
  //   Hub.listen('auth', listener)
  //   return () => Hub.remove('auth', listener)
  // }, [])

  return (
    <AuthContext.Provider
      value={{ user, userLoading, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
