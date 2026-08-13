"use client"

import { supabase } from '@/lib/supabase'
import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

export interface UserProfile {
  id: string
  full_name: string | null
  target_country: string | null
  target_language: string | null
  language_level: string | null
  motivations: string[] | null
  interests: string[] | null
  onboarding_completed: boolean
  updated_at: string | null
}

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (s: Session | null) => {
    if (!s) {
      setProfile(null)
      return
    }
    const { error, data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', s.user.id)
      .maybeSingle()

    setProfile(error ? null : data)
  }

  const refreshProfile = async () => {
    await loadProfile(session)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getSession()
      const initialSession = data.session ?? null
      setSession(initialSession)
      await loadProfile(initialSession)
      setLoading(false)
    }

    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setLoading(true)
      setSession(newSession)
      loadProfile(newSession).finally(() => setLoading(false))
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
