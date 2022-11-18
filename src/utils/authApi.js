import axios from 'axios'
import { API_URL } from '@env'

export const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const refreshAccessToken = async () => {
  const response = await authApi.get('/refresh')
  return response.data
}

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.message
    if (errMessage.includes('Invalid session') && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessToken()
      return authApi(originalRequest)
    }
    return Promise.reject(error)
  },
)

export const getMe = async () => {
  const response = await authApi.get('/me')
  return response.data
}
