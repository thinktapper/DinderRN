import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Alert } from 'react-native'
import { supabase } from '../lib/supabase'
// import { Session } from '@supabase/supabase-js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Create state values for user data and loading
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get session data if there is an active session
    const session = supabase.auth.getSession()

    // If there is a session, set the user data
    setUser(session?.user ?? null)
    setLoading(false)

    // Listen for changes to the session
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // Cleanup the useEffect hook
    return () => {
      listener?.unsubscribe()
    }
  }, [])

  // Create auth functions
  const signUp = async ({ data: email, password }) => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }

  const signIn = async ({ data: email, password }) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }

  const value = {
    signUp: data => signUp(data),
    signIn: data => signIn(data),
    signOut: () => supabase.auth.signOut(),
    loading,
    user,
  }

  // Use cached memoized value
  // const memoedValue = useMemo(
  //   () => ({
  //     signUp: data => supabase.auth.signUp(data),
  //     signIn: data => supabase.auth.signIn(data),
  //     signOut: () => supabase.auth.signOut(),
  //     user,
  //   }),
  //   [user, loading, error]
  // )

  // Use provider to pass down the values
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
