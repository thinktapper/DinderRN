import { Alert } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const createFeast = async (values, user) => {
  const response = await axios({
    url: 'http://localhost:3000/api/feast',
    method: 'post',
    headers: { authorization: `Bearer ${user?.token}` },
    data: { values },
  })
  console.warn('createFeast:', JSON.stringify(response))

  // return data.feast
  // return response.data.feast
}

export function useCreateFeast() {
  const { user } = useAuthContext()

  return useMutation({
    mutationFn: ({ ...values }) => createFeast(values, user),
  })
  //   {
  //     onSuccess: (newFeast) => {
  //       // queryClient.setQueryData(['feasts'], newFeast)
  //       queryClient.invalidateQueries('feasts')
  //       console.log('success, you created a feast: ', newFeast)
  //       Alert.alert('Feast info saved successfully')
  //     },
  //     onError: (error) => {
  //       console.log('error', error)
  //       Alert.alert('Error', 'There was an error saving your feast')
  //     },
  //   },
  // )

  // return mutate
}
