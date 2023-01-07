import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../context/AuthProvider'
import { queryKeys } from '../lib/constants'
import axios from 'axios'

export default async function getFeastPlaces(feast, user) {
  if (!feast || !user) return null

  const { data } = await axios({
    url: `http://localhost:3000/api/feast/${feast.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user.token}` },
  })

  // return data.success ? data.feast : null
  return data.feast
}

export function useFeastPlaces(feast) {
  const { user } = useAuthContext()
  // const id = feast?.id

  const fallback = {
    feast: {
      id: '',
      places: [],
    },
  }
  const { data: feastPlaces = fallback } = useQuery(
    [queryKeys.places, feast?.id],
    () => getFeastPlaces(feast, user),
    {
      enabled: !!user,
    },
  )

  return feastPlaces
}
