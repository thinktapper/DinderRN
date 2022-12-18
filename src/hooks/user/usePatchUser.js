import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { axiosInstance, getJWTHeader } from '../../utils/axiosInstance'
import { queryKeys } from '../../lib/constants'
import { useUser } from './useUser'

// When a server function is needed
async function patchUserOnServer(newData, originalData) {
  if (!newData) return null
  const { data } = await axiosInstance.put(
    '/api/user/update',
    { newData },
    {
      headers: getJWTHeader(originalData),
    },
  )
  return data.user
}

export function usePatchUser() {
  const queryClient = useQueryClient()
  const { user, updateUser } = useUser()

  const { mutate: patchUser } = useMutation(
    (newUserData) => patchUserOnServer(newUserData, user),
    {
      // onMutate returns context that is passed to onError
      onMutate: async (newData) => {
        // cancel any outgoing queries for user data, so old server data
        // doesn't overwrite our optimistic update
        queryClient.cancelQueries([queryKeys.user])

        // snapshot the previous user value
        const previousUserData = queryClient.getQueryData([queryKeys.user])

        // optimistically update the cache to the new user value
        updateUser(newData)

        // return the context object with the snapshotted value
        return { previousUserData }
      },
      onError: (err, newData, ctx) => {
        // roll back cache to saved value
        if (ctx.previousUserData) {
          updateUser(ctx.previousUserData)
          console.warn(`Update failed; restoring previous user values: ${err}`)
        }
      },
      onSuccess: (userData) => {
        if (user) {
          console.debug(`User updated: ${userData}`)
        }
      },
      onSettled: () => {
        // invalidate user query to ensure we're in sync with server data
        queryClient.invalidateQueries([queryKeys.user])
      },
    },
  )

  return patchUser
}
