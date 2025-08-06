"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@supabase/supabase-js"

// Mock Supabase client for development
const createMockSupabaseClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Mock successful login
      if (email && password) {
        const mockUser = {
          id: "mock-user-id",
          email,
          user_metadata: { first_name: "Demo", last_name: "User" },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        return { data: { user: mockUser }, error: null }
      }
      return { data: { user: null }, error: { message: "Invalid credentials" } }
    },
    signUp: async ({ email, password, options }: any) => {
      // Mock successful signup
      if (email && password) {
        return { data: { user: null }, error: null }
      }
      return { data: { user: null }, error: { message: "Invalid data" } }
    },
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Mock auth state change
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      }
    },
  },
})

type SupabaseContext = {
  supabase: any
  user: User | null
  loading: boolean
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if Supabase environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const supabase =
    supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createMockSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.warn("Supabase not configured, using mock data")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [supabase.auth])

  return <Context.Provider value={{ supabase, user, loading }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}

export { SupabaseProvider }
