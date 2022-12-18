import axios from 'axios'
import { AUTH_URL } from '@env'
import { clearStoredUser } from '../lib/user-storage'
import { useAuthContext } from '../context'

export const authApi = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const refreshAccessToken = async () => {
  const response = await authApi.get('/refresh')
  return response.data
}

export const signUp = async (user) => {
  const response = await authApi.post('/signup', user)
  return response.data
}

export const login = async (user) => {
  const response = await authApi.post('/login', user)
  return response.data
}
