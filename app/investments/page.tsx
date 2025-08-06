"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { InvestmentPlans } from "@/components/investment-plans"
import { useSupabase } from "@/components/supabase-provider"

export default function InvestmentsPage() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)

  const checkAuth = useCallback(() => {
    if (loading || authChecked) return

    // Check for demo session first
    if (typeof window !== "undefined") {
      const demoSession = localStorage.getItem("demoSession")
      if (demoSession) {
        try {
          const sessionData = JSON.parse(demoSession)
          if (sessionData.isAuthenticated) {
            console.log("Demo session authenticated for investments page")
            setAuthChecked(true)
            return
          }
        } catch (e) {
          console.error("Error parsing demo session:", e)
          localStorage.removeItem("demoSession")
        }
      }

      // Check for demo user as fallback
      const demoUser = localStorage.getItem("demoUser")
      if (demoUser) {
        console.log("Demo user found for investments page")
        setAuthChecked(true)
        return
      }
    }

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Only redirect if Supabase is configured and no user/demo session
    if (isSupabaseConfigured && !user) {
      console.log("No authentication found, redirecting to login")
      router.push("/auth/login")
      return
    }

    setAuthChecked(true)
  }, [user, loading, router, authChecked])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Investment Plans</h1>
          <p className="text-muted-foreground mt-2">Choose from our carefully curated investment opportunities</p>
        </div>
        <InvestmentPlans />
      </div>
    </div>
  )
}
