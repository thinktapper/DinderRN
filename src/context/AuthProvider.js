import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Session } from '@supabase/supabase-js'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Alert } from 'react-native'

const AuthContext = createContext({
  user: null,
  session: Session,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Set user and session from storage
    const session = supabase.auth.session()
    setSession(session)
    setUser(!!session)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`)
        setSession(session)
        setUser(!!session)
      },
    )
    return () => {
      authListener.unsubscribe()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
