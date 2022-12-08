// import axios from 'axios'
// import { API_URL } from '@env'
// import { SECURE_SECRET } from '@env'
// import * as SecureStore from 'expo-secure-store'

// export const authApi = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// })

// authApi.defaults.headers.common['Content-Type'] = 'application/json'

// authApi.interceptors.request.use(
//   (config) => {
//     const { origin } = new URL(config.url)
//     const allowedOrigins = [API_URL]
//     const data = SecureStore.getItemAsync(SECURE_SECRET)
//     const accessToken = data ? JSON.parse(data) : null
//     if (allowedOrigins.includes(origin)) {
//       config.headers.authorization = `Bearer ${accessToken}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// authApi.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//     const errMessage = error.response.data.message
//     if (errMessage.includes('Invalid session') && !originalRequest._retry) {
//       originalRequest._retry = true
//       await refreshAccessToken()
//       return authApi(originalRequest)
//     }
//     return Promise.reject(error)
//   },
// )

// export const get = authApi.get
// export const patch = authApi.patch
// export const post = authApi.post

// export const refreshAccessToken = async () => {
//   const response = await authApi.get('/refresh')
//   return response.data
// }

// export const signUpUser = async (user) => {
//   const response = await authApi.post('/signup', user)
//   return response.data
// }

// export const loginUser = async (user) => {
//   const response = await authApi.post('/login', user)
//   return response.data
// }

// export const logoutUser = async () => {
//   const response = await authApi.get('/logout')
//   return response.data
// }

// export const getMe = async () => {
//   const response = await authApi.get('/me')
//   return response.data
// }
