import { Alert } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const createFeast = async (values, user) => {
  const { data } = await axios({
    url: 'http://localhost:3000/api/feast',
    method: 'post',
    headers: { authorization: `Bearer ${user?.token}` },
    data: { ...values },
  })

  return data.feast
}

export function useCreateFeast() {
  const { user } = useAuthContext()

  const { mutate } = useMutation((values) => createFeast(values, user), {
    onSuccess: (newFeast) => {
      // queryClient.setQueryData(['feasts'], newFeast)
      queryClient.invalidateQueries('feasts')
      console.log('success, you created a feast')
      Alert.alert('Feast info saved successfully')
    },
  })

  return mutate
}
