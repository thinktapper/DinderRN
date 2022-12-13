import axios from 'axios'
import { AUTH_URL } from '@env'
import { useAuthContext as authContext } from '../context'

export const authApi = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'
if (authContext.state) {
  authApi.defaults.headers.common.Authorization = `Bearer ${authContext.state.authUser.token}`
}

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

export const logout = async () => {
  const response = await authApi.get('/logout')
  return response.data
}

export const getMe = async () => {
  const response = await authApi.get('/api/user/me')
  return response.data
}
