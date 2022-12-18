import axios from 'axios'
import { AUTH_URL } from '@env'

export function getJWTHeader(user) {
  return { Authorization: `Bearer ${user.token}` }
}

const config = { AUTH_URL }
export const axiosInstance = axios.create(config)

// const authApi = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// })

// authApi.defaults.headers.common['Content-Type'] = 'application/json'

// export default authApi
