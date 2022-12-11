import axios from 'axios'
import { AUTH_URL } from '@env'

export const authApi = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const refreshAccessToken = async () => {
  const response = await authApi.get('/refresh')
  return response.data
}

export const signUpUser = async (user) => {
  const response = await authApi.post('/signup', user)
  return response.data
}

export const loginUser = async (user) => {
  const response = await authApi.post('/login', user)
  return response.data
}

export const logoutUser = async () => {
  const response = await authApi.get('/logout')
  return response.data
}

export const getMe = async () => {
  const response = await authApi.get('/me')
  return response.data
}
