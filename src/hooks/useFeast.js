import { feastState } from '../context/FeastState'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeast = async (currentFeast, user) => {
  const { data } = await axios({
    url: `http://localhost:3000/api/feast/${currentFeast?.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data.feast.places
}

const useFeast = () => {
  const currentFeast = feastState.useValue()
  const { user } = useAuthContext()

  const fallback = []
  const { data: places = fallback } = useQuery(
    ['places', currentFeast?.id, user.id],
    () => fetchFeast(currentFeast, user),
    {
      enabled: !!currentFeast,
      staleTime: 300000, // 5 minutes
      cacheTime: Infinity,
    },
  )
  return places
}
export default useFeast
