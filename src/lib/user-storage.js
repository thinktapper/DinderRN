import * as SecureStore from 'expo-secure-store'
import { SECURE_SECRET } from '@env'

// helpers for storing and retrieving user data
export async function getStoredUser() {
  const storedUser = await SecureStore.getItemAsync(SECURE_SECRET)
  return storedUser ? JSON.parse(storedUser) : null
}

export async function setStoredUser(user) {
  await SecureStore.setItemAsync(SECURE_SECRET, JSON.stringify(user))
}

export async function clearStoredUser() {
  await SecureStore.deleteItemAsync(SECURE_SECRET)
}
