import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '@env'

const apiURL = API_URL
const jwtKey = 'accessToken'

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url)
    const allowedOrigins = [apiURL]
    const accessToken = AsyncStorage.getItem(jwtKey)
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const createUrl = (endpoint) => new URL(endpoint, apiURL).href
export const isStoredJwt = () => Boolean(AsyncStorage.getItem(jwtKey))
export const setStoredJwt = (accessToken) =>
  AsyncStorage.setItem(jwtKey, accessToken)

export const get = axios.get
export const patch = axios.patch
export const post = axios.post
