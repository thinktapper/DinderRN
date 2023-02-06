import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { newRidgeState } from 'react-ridge-state'
import { produce } from 'immer'

const appStorageKey = 'app-feast'
export const feastState = newRidgeState(
  // initial state
  {
    currentFeast: null,
    selectedFeast: null,
    currentFeastWinner: null,
  },
  // {
  //   onSet: async (newState) => {
  //     try {
  //       await AsyncStorage.setItem(appStorageKey, JSON.stringify(newState))
  //     } catch (e) {
  //       console.warn('Error saving state', e)
  //     }
  //   },
  // },
)

// setInitialState fetches data from localStorage
async function setInitialState() {
  try {
    const item = await AsyncStorage.getItem(appStorageKey)
    if (item) {
      const initialState = JSON.parse(item)
      feastState.set(initialState)
    }
  } catch (e) {
    console.warn('Error loading state', e)
  }
}

// run function as application starts
// setInitialState()
