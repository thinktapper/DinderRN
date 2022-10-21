import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vaybumsbdqkykxhazlhh.supabase.co'
const supbaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZheWJ1bXNiZHFreWt4aGF6bGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNzYxNzgsImV4cCI6MTk4MTk1MjE3OH0.XDKjbMHaUyAOQRhRKZ-liTu5zEG3Hzeq0pOzMaiSqsc'

export const supabase = createClient(supabaseUrl, supbaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
