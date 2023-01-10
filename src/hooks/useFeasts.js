import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthProvider'
import { queryKeys } from '../lib/constants'
import axios from 'axios'

async function getOrganizedFeasts(user) {
  if (!user) return null

  const { data } = await axios({
    url: 'http://localhost:3000/api/user/feasts',
    method: 'get',
    headers: { authorization: `Bearer ${user.token}` },
  })
  return data.feasts
}

export function useUserFeasts() {
  const { user } = useAuthContext()

  // const fallback = []
  const {
    data: feasts,
    isLoading,
    error,
  } = useQuery(
    [queryKeys.feasts, queryKeys.user],
    () => getOrganizedFeasts(user),
    { enabled: !!user },
  )
  return { feasts, isLoading, error }
}

// export function usePrefetchFeasts() {
//   const queryClient = useQueryClient()
//   queryClient.prefetchQuery([queryKeys.feasts], getOrganizedFeasts)
// }
