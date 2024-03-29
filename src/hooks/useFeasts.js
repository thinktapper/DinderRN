import { useQuery } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeasts = async (user) => {
  const { data, status } = await axios({
    url: `${apiURL.remote}/api/user/feasts`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })

  // if (status !== 200) {
  //   return []
  // }
  return data.sortedFeasts
}

function useFeasts() {
  const { user } = useAuthContext()

  const fallback = []
  const {
    data: feasts = fallback,
    refetch,
    isLoading,
  } = useQuery([queryKeys.feasts, user.id], () => fetchFeasts(user), {
    enabled: !!user,
    // staleTime: 1000 * 60 * 60 * 24,
    // cacheTime: Infinity,
  })

  return { feasts, refetch, isLoading }
}
export default useFeasts
