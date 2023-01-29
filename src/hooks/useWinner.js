import { feastState } from '../context/FeastState'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const fetchFeastPulse = async (currentFeast, user) => {
  const { data, status } = await axios({
    url: `http://localhost:3000/api/feast/pulse/${currentFeast?.id}`,
    method: 'get',
    headers: { authorization: `Bearer ${user?.token}` },
  })
  console.warn(
    'fetchFeastPulse axios result -> DATA:',
    JSON.stringify(data),
    'STATUS:',
    JSON.stringify(status),
  )

  return data.winningPlace
}

const useWinner = () => {
  const currentFeast = feastState.useValue()
  const [currentFeastWinner, setCurrentFeastWinner] = feastState.use()
  const { user } = useAuthContext()

  // const fallback = {}
  const { data: winner } = useQuery(
    [queryKeys.winner, currentFeast?.name, user.username],
    () => fetchFeastPulse(currentFeast, user),
    {
      onSuccess: (winner) => {
        setCurrentFeastWinner(winner)
        return winner
      },
      onError: (data, error) => {
        console.warn(`ERROR in useWinner hook: ${error}, DATA: ${data}`)
      },
    },
  )
}
export default useWinner
