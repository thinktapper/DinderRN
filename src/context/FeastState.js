import React from 'react'
import { newRidgeState } from 'react-ridge-state'

const appStorageKey = 'app-feast'

// initial state
export const feastState = newRidgeState({
  currentFeast: null,
  selectedFeast: null,
  // currentFeastWinner: null,
})
