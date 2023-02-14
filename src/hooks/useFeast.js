import { feastState } from '../context/FeastState'
import { useQuery } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeast = async (currentFeast, user) => {
  const { data } = await axios({
    url: `${apiURL.remote}/api/feast/${currentFeast.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data.feast.places
}

const getFeastPulse = async (currentFeast, user) => {
  const response = await axios(
    `${apiURL.remote}/api/feast/pulse/${currentFeast.id}`,
    {
      method: 'GET',
      // prettier-ignore
      headers: { 'authorization': `Bearer ${user?.token}` },
    }
  )

  // console.warn(
  //   'getFeastPulse result: STATUS =>',
  //   JSON.stringify(response.status),
  //   'DATA =>',
  //   JSON.stringify(response.data),
  // )
  // if (!response.success) {
  //   console.error(`Network response was not ok -> ${response}`)
  // }

  return response.data.places
}

const useFeast = () => {
  const currentFeast = feastState.useValue()
  const { user } = useAuthContext()

  const fallback = []
  const { data: places = fallback } = useQuery(
    [queryKeys.places, currentFeast?.name],
    () => getFeastPulse(currentFeast, user),
    {
      enabled: !!currentFeast.id,
      // staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
      // staleTime: 300000, // 5 minutes
      // cacheTime: Infinity,
    }
  )

  return places
}
export default useFeast
