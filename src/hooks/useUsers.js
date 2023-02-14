import { feastState } from '../context/FeastState'
import { useQuery } from '@tanstack/react-query'
import { apiURL, queryKeys } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchUsers = async (user) => {
  const { data } = await axios({
    url: `${apiURL.remote}/api/user/all`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data.users
}

const useUsers = () => {
  const { user } = useAuthContext()

  const fallback = []
  const { data: guests = fallback } = useQuery(
    [queryKeys.guests],
    () => fetchUsers(user),
    {
      enabled: !!user,
      // staleTime: 6000, //  min
      // cacheTime: 300000, // 5 minutes
    }
  )
  return guests
}
export default useUsers
