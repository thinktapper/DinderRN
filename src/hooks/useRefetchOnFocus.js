import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

export default function useRefreshOnFocus(refetch) {
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch]),
  )
}
