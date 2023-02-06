import { useQuery } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeasts = async (user) => {
  const { data } = await axios({
    url: `${apiURL.local}/api/user/feasts`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data.feasts
}

export function useFeasts() {
  const { user } = useAuthContext()

  const fallback = []
  const { data: feasts = fallback } = useQuery(
    [queryKeys.feasts, user.id],
    () => fetchFeasts(user),
    {
      enabled: !!user,
      // staleTime: 1000 * 60 * 60 * 24,
      // cacheTime: Infinity,
    },
  )

  return feasts
}
export default useFeasts
