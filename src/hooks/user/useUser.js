import { useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance, getJWTHeader } from '../../utils/axiosInstance'
import { queryKeys } from '../../lib/constants'
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../lib/user-storage'

// query function
async function getUser(user, signal) {
  if (!user) return null
  const { data } = await axiosInstance.get('/api/user/me', {
    signal,
    headers: getJWTHeader(user),
  })
  return data.user
}

export async function useUser() {
  const queryClient = useQueryClient()

  // call useQuery to update user data from server
  const { data: user } = useQuery(
    [queryKeys.user],
    ({ signal }) => getUser(user, signal),
    {
      // populate initially with user in storage
      initialData: await getStoredUser(),
      onSuccess: (recieved) => {
        if (!recieved) {
          clearStoredUser()
        } else {
          setStoredUser(recieved)
        }
      },
    },
  )

  // intended to be called from useAuth
  function updateUser(newUser) {
    // update the user
    queryClient.setQueryData([queryKeys.user], newUser)

    setStoredUser(newUser)
  }

  // intended to be called from useAuth
  function clearUser() {
    // reset user to null
    queryClient.setQueryData([queryKeys.user], null)

    clearStoredUser()

    // remove user feasts query
    queryClient.removeQueries([queryKeys.feasts, queryKeys.user])
  }

  return { user, updateUser, clearUser }
}
