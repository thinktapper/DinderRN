import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import axios from 'axios'
import { feastState } from '../context/FeastState'
import { useAuthContext } from '../context/AuthProvider'

// for when we need a query function for useQuery
async function addVoteOnServer(voteData, user) {
  const { data } = await axios({
    url: `${apiURL.remote}/api/vote`,
    method: 'post',
    data: { ...voteData },
    headers: { authorization: `Bearer ${user?.token}` },
  })
  return data.vote
}

export default function useVote() {
  const { user } = useAuthContext()
  const currentFeast = feastState.useValue()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    ({ voteData, user }) => addVoteOnServer(voteData, user),
    {
      onMutate: async (vote) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries([queryKeys.votes])

        // Snapshot the previous value
        const previousPlaces = queryClient.getQueryData([
          queryKeys.votes,
          queryKeys.places,
          currentFeast?.id,
        ])

        // Optimistically update to the new value
        queryClient.setQueryData(
          [queryKeys.votes, queryKeys.places, currentFeast?.id],
          (old) => [...old, vote]
        )
        // Return a context object with the snapshotted value
        return { previousPlaces }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newVote, context) => {
        queryClient.setQueryData(
          [queryKeys.votes, queryKeys.places, currentFeast?.id],
          context.previousPlaces
        )
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries([
          queryKeys.votes,
          queryKeys.places,
          currentFeast?.id,
        ])
      },
    }
  )

  return mutate
}
