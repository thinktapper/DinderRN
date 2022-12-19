import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthProvider'
import { queryKeys } from '../lib/constants'
import axios from 'axios'

async function getFeastDetails(feast, user) {
  if (!feast || !user) return null

  const { data } = await axios({
    url: `http://localhost:3000/api/feast/${feast.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user.token}` },
  })

  return data.feast
}

export function useFeastDetails(feast) {
  const { user } = useAuthContext()

  // const fallback = {}
  const { data: feastDetails } = useQuery(
    [queryKeys.places, feast.id],
    () => getFeastDetails(feast, user),
    {
      enabled: !!user,
    },
  )

  return feastDetails
}
