import axios from 'axios'
import { API_URL } from '@env'
import { useAuthContext } from '../context'
import { clearStoredUser } from '../lib/user-storage'

const client = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
})

export const useRequest = async ({ ...options }) => {
  const authContext = useAuthContext()
  const token = authContext.state.authUser.token
  client.defaults.headers.common.Authorization = `Bearer ${token}`
  client.defaults.headers.common['Content-Type'] = 'application/json'
  const onSuccess = (response) => response
  const onError = (error) => {
    console.warn(`Error making user authenticated request: ${error}`)
    return error
  }

  try {
    const response = await client(options)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

// export const refreshAccessToken = async () => {
//   const response = await authApi.get('/refresh')
//   return response.data
// }

export const getMe = async () => {
  const response = await client.get('/user/me')
  return response.data
}

export const logout = async () => {
  const response = await useRequest({ url: '/user/logout' })
  console.warn(response)
  if (response.status === 'OK') {
    clearStoredUser()
    useAuthContext.dispatch({ type: 'CLEAR_USER' })
  }
  return response.data
}
