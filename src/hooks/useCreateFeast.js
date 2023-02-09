import { Alert } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import axios from 'axios'
import { apiURL } from '../lib/constants'
import { useAuthContext } from '../context/AuthProvider'

const createFeast = async (values, user) => {
  const response = await axios({
    url: `${apiURL.remote}/api/feast`,
    method: 'post',
    headers: { authorization: `Bearer ${user?.token}` },
    data: { values },
  })
}

export function useCreateFeast() {
  const { user } = useAuthContext()

  return useMutation({
    mutationFn: ({ ...values }) => createFeast(values, user),
  })
}
