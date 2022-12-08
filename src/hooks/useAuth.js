import axios from 'axios'
import authApi, { axiosInstance } from '../utils/axiosInstance'
import { useUser } from './user/useUser'

export function useAuth() {
  const { updateUser, clearUser } = useUser()
  // async function authServerCall(urlEndpoint, username, password) {
  //   try {
  //     const { data, status } = await axiosInstance.post({
  //       url: urlEndpoint,
  //       data: { username, password },
  //       headers: { 'Content-Type': 'application/json' },
  //     })

  //     if (status === 400) {
  //       console.warn('Error: ', data.message)
  //       return
  //     }
  //     if ('user' in data && 'token' in data.user) {
  //       console.debug(`User ${data.user.username} logged in`)
  //     }

  //     // update stored user data
  //     updateUser(data.user)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  async function login(username, password) {
    // authServerCall('/login', username, password)
    try {
      const { data, status } = await authApi.post('/login', {
        username,
        password,
      })

      if (status === 400) {
        console.warn('Error: ', data.message)
        return
      }
      if ('user' in data && 'token' in data.user) {
        console.debug(`User ${data.user.username} logged in`)
      }

      // update stored user data
      updateUser(data.user)
    } catch (err) {
      console.error(err)
    }
  }
  async function signup(email, username, password) {
    // authServerCall('/signup', email, username, password)
    try {
      const { data, status } = await authApi.post('/signup', {
        email,
        username,
        password,
      })

      if (status === 400) {
        console.warn('Error: ', data.message)
        return
      }
      if ('user' in data && 'token' in data.user) {
        console.debug(`User ${data.user.username} signed up`)
      }

      // update stored user data
      updateUser(data.user)
    } catch (err) {
      console.error(err)
    }
  }

  function logout() {
    // remove stored user data
    clearUser()
    console.debug('User logged out')
  }

  // return the user object and auth methods
  return {
    login,
    signup,
    logout,
  }
}
