"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { DashboardStats } from "@/components/dashboard-stats"
import { PortfolioChart } from "@/components/portfolio-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { InvestmentRecommendations } from "@/components/investment-recommendations"
import { AIInvestmentChat } from "@/components/ai-investment-chat"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Activity, ExternalLink } from "lucide-react"

const quickInvestmentOptions = [
  {
    name: "Vanguard S&P 500",
    url: "https://investor.vanguard.com/investment-products/etfs/profile/voo",
    description: "Low-cost index fund",
  },
  {
    name: "Fidelity Total Market",
    url: "https://www.fidelity.com/mutual-funds/investing/overview",
    description: "Diversified portfolio",
  },
  {
    name: "Schwab International",
    url: "https://www.schwab.com/investment-products",
    description: "Global diversification",
  },
]

export default function DashboardPage() {
  const { user, loading } = useSupabase()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("Demo User")
  const [authChecked, setAuthChecked] = useState(false)

  const checkAuthAndSetName = useCallback(() => {
    if (loading || authChecked) return

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check for demo session first
    if (typeof window !== "undefined") {
      const demoSession = localStorage.getItem("demoSession")
      if (demoSession) {
        try {
          const sessionData = JSON.parse(demoSession)
          if (sessionData.isAuthenticated && sessionData.user) {
            console.log("Demo session found:", sessionData.user.firstName)
            setDisplayName(sessionData.user.firstName || "Demo User")
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
        try {
          const userData = JSON.parse(demoUser)
          console.log("Demo user found:", userData.firstName)
          setDisplayName(userData.firstName || "Demo User")
          setAuthChecked(true)
          return
        } catch (e) {
          console.error("Error parsing demo user:", e)
        }
      }
    }

    // Only redirect if Supabase is configured and no user/demo session
    if (isSupabaseConfigured && !user) {
      console.log("No demo session found, redirecting to login")
      router.push("/auth/login")
      return
    }

    // Set default name and mark as checked
    if (user?.user_metadata?.first_name) {
      setDisplayName(user.user_metadata.first_name)
    }

    setAuthChecked(true)
  }, [user, loading, router, authChecked])

  useEffect(() => {
    checkAuthAndSetName()
  }, [checkAuthAndSetName])

  const handleInvestClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

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
          <h1 className="text-3xl font-bold">Welcome back, {displayName}!</h1>
          <p className="text-muted-foreground mt-2">Here's an overview of your investment portfolio</p>
        </div>

        <DashboardStats />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <PortfolioChart />
            <RecentTransactions />
          </div>
          <div className="space-y-8">
            <InvestmentRecommendations />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Quick Investment Actions
                </CardTitle>
                <CardDescription>Start investing with top platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickInvestmentOptions.map((option, index) => (
                  <Button
                    key={index}
                    className="w-full justify-between bg-transparent"
                    variant="outline"
                    size="lg"
                    onClick={() => handleInvestClick(option.url)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{option.name}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                ))}
                <Button className="w-full" size="lg" onClick={() => handleInvestClick("https://www.etrade.com/")}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Open E*TRADE Account
                </Button>
              </CardContent>
            </Card>

            {/* AI Investment Chat */}
            <AIInvestmentChat />
          </div>
        </div>
      </div>
    </div>
  )
}
