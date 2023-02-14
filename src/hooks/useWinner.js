import { feastState } from '../context/FeastState'
import { useQuery } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

const getFeastPulse = async (currentFeast, user) => {
  const response = await axios(
    `${apiURL.remote}/api/feast/pulse/${currentFeast.id}`,
    {
      method: 'GET',
      // prettier-ignore
      headers: { 'authorization': `Bearer ${user?.token}` },
    }
  )

  return response.data
}

const useWinner = () => {
  const { user } = useAuthContext()
  const currentFeast = feastState.useValue()
  const [currentFeastWinner, setCurrentFeastWinner] = feastState.use()

  const fallback = 'No winner yet'
  const { data: pulse = fallback } = useQuery(
    [queryKeys.winner, currentFeast.id],
    () => getFeastPulse(currentFeast, user),
    // { enabled: !!feastId },
    { enabled: !!currentFeast }
  )

  return pulse
}
export default useWinner
