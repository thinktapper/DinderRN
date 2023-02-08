import { feastState } from '../context/FeastState'
import { useQuery } from '@tanstack/react-query'
import { queryKeys, apiURL } from '../lib/constants'
import axios from 'axios'
import { useAuthContext } from '../context/AuthProvider'

// const fetchFeastPulse = async (currentFeast, user) => {
//   const { data, status } = await axios({
//     url: `http://localhost:3000/api/feast/pulse/${currentFeast?.id}`,
//     method: 'get',
//     headers: { authorization: `Bearer ${user?.token}` },
//   })
//   console.warn(
//     'fetchFeastPulse axios result -> DATA:',
//     JSON.stringify(data),
//     'STATUS:',
//     JSON.stringify(status),
//   )

//   return data.winningPlace
// }
const getFeastPulse = async (currentFeast, user) => {
  const response = await axios(
    `${apiURL.local}/api/feast/pulse/${currentFeast.id}`,
    {
      method: 'GET',
      // prettier-ignore
      headers: { 'authorization': `Bearer ${user?.token}` },
    },
  )

  // console.warn(
  //   'getFeastPulse from winner screen: STATUS =>',
  //   JSON.stringify(response.status),
  //   'DATA =>',
  //   JSON.stringify(response.data),
  // )
  // if (!response.success) {
  //   console.error(`Network response was not ok -> ${response}`)
  // }

  return response.data
}

const useWinner = () => {
  const { user } = useAuthContext()
  const currentFeast = feastState.useValue()
  const [currentFeastWinner, setCurrentFeastWinner] = feastState.use()

  // const fallback = {}
  // const { data: winner } = useQuery(
  //   [queryKeys.winner, currentFeast?.name, user.username],
  //   () => fetchFeastPulse(currentFeast, user),
  //   {
  //     onSuccess: (winner) => {
  //       setCurrentFeastWinner(winner)
  //       return winner
  //     },
  //     onError: (data, error) => {
  //       console.warn(`ERROR in useWinner hook: ${error}, DATA: ${data}`)
  //     },
  //   },
  // )
  const fallback = 'No winner yet'
  const { data: pulse = fallback } = useQuery(
    [queryKeys.winner, currentFeast.id],
    () => getFeastPulse(currentFeast, user),
    // { enabled: !!feastId },
    { enabled: !!currentFeast },
  )

  // if (pulse.winningPlace) {
  //   setCurrentFeastWinner(pulse.winningPlace)
  //   return pulse
  // } else {
  //   return 'No winner yet'
  // }
  return pulse
}
export default useWinner
