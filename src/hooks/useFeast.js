import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeast = async (feastId, user) => {
  const { data } = await axios({
    url: `http://localhost:3000/api/feast/${feastId?.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data.feast.places
}

const useFeast = (feastId) => {
  // const [places, setPlaces] = useState([])
  const { user } = useAuthContext()

  const fallback = []
  const { data: places = fallback, refetch } = useQuery(
    ['places', feastId, user.id],
    () => fetchFeast(feastId, user),
    {
      // placeholderData: places,
      // onSuccess: (data) => {
      //   setPlaces(
      //     data.map((place) => ({
      //       ...place,
      //       votes: place.votes.length > 0 ? place.votes : [],
      //     })),
      //   )
      // },
      staleTime: 0,
      // cacheTime: 300000, // 5 minutes
      // refetchOnWindowFocus: false,
      // refetchOnMount: true,
      // refetchOnReconnect: false,
      // refetchInterval: 60000,
    },
  )
  return { places, refetch }
}
export default useFeast
