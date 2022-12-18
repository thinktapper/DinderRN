import React, { useCallback, useEffect } from 'react'

export const useDebounce = (fn, delay, deps) => {
  const callback = useCallback(fn, deps)

  useEffect(() => {
    // Call the memoized version of callback after the delay
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback])
}
