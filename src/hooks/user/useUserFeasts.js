import { useQuery } from '@tanstack/react-query'
import { axiosInstance, getJWTHeader } from '../../utils/axiosInstance'
import { queryKeys } from '../../lib/constants'
import { useUser } from './useUser'

// query function
async function getUserFeasts(user) {
  if (!user) return null
  const { data } = await axiosInstance.get('/api/user/feasts', {
    headers: getJWTHeader(user),
  })
  return data.feasts
}

export function useUserFeasts() {
  const { user } = useUser()
  const fallback = []
  const { data: userFeasts = fallback } = useQuery(
    [queryKeys.feasts, queryKeys.user, user?.id],
    () => getUserFeasts(user),
    {
      enabled: Boolean(user),
    },
  )

  return { userFeasts }
}
