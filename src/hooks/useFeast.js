import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeast = async (feastId, user) => {
  const { data } = await axios({
    url: `http://localhost:3000/api/feast/${feastId}`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data
}

const useFeast = (feastId) => {
  const { user } = useAuthContext()
  useQuery(['feasts', feastId], () => fetchFeast(feastId, user))
}
export default useFeast
