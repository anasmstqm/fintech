"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/components/supabase-provider"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [messageProcessed, setMessageProcessed] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Handle success messages from signup - only run once
  useEffect(() => {
    if (messageProcessed) return

    const message = searchParams.get("message")
    const emailParam = searchParams.get("email")

    if (message === "demo-signup-success") {
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Your demo account is ready. Please sign in with your credentials.",
      })

      // Pre-fill email if provided
      if (emailParam) {
        setEmail(decodeURIComponent(emailParam))
      }

      setMessageProcessed(true)
    } else if (message === "signup-success") {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account, then login here.",
      })

      setMessageProcessed(true)
    }
  }, [searchParams, toast, messageProcessed])

  const isValidEmail = useCallback((email: string) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email.trim().toLowerCase())
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: string[] = []

    if (!email.trim()) {
      newErrors.push("Email is required")
    } else if (!isValidEmail(email)) {
      newErrors.push("Please enter a valid email address")
    }

    if (!password.trim()) {
      newErrors.push("Password is required")
    } else if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters long")
    }

    return newErrors
  }, [email, password, isValidEmail])

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      if (errors.length > 0) {
        setErrors([])
      }
    },
    [errors.length],
  )

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      if (errors.length > 0) {
        setErrors([])
      }
    },
    [errors.length],
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login form submitted", { email, password: "***" })

    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      toast({
        title: "Please fix the following errors:",
        description: validationErrors[0],
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setErrors([])

    try {
      console.log("Starting demo mode login...")
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const cleanEmail = email.trim().toLowerCase()
      console.log("Attempting login for email:", cleanEmail)

      // First check multiple demo users (more comprehensive)
      const demoUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]")
      console.log(
        "Available demo users:",
        demoUsers.map((u: any) => ({ email: u.email, hasPassword: !!u.password })),
      )

      const matchingUser = demoUsers.find((user: any) => {
        console.log("Comparing:", { stored: user.email, input: cleanEmail, passwordMatch: user.password === password })
        return user.email === cleanEmail && user.password === password
      })

      if (matchingUser) {
        console.log("Multiple demo users - match found:", matchingUser.firstName)

        toast({
          title: `Welcome back, ${matchingUser.firstName}! 👋`,
          description: "Successfully signed in to your demo account.",
        })

        // Store current session
        const sessionData = {
          user: matchingUser,
          loginTime: new Date().toISOString(),
          isAuthenticated: true,
        }
        localStorage.setItem("demoSession", JSON.stringify(sessionData))
        console.log("Session stored:", sessionData)

        // Force redirect
        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
        return
      }

      // Fallback: Check single demo user
      const demoUser = localStorage.getItem("demoUser")
      if (demoUser) {
        const userData = JSON.parse(demoUser)
        console.log("Checking single demo user:", { email: userData.email, inputEmail: cleanEmail })

        if (userData.email === cleanEmail && userData.password === password) {
          console.log("Single demo user credentials match")

          toast({
            title: `Welcome back, ${userData.firstName}! 👋`,
            description: "Successfully signed in to your demo account.",
          })

          // Store current session
          const sessionData = {
            user: userData,
            loginTime: new Date().toISOString(),
            isAuthenticated: true,
          }
          localStorage.setItem("demoSession", JSON.stringify(sessionData))

          // Also add to demoUsers array for consistency
          const existingUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]")
          const updatedUsers = [...existingUsers.filter((u: any) => u.email !== cleanEmail), userData]
          localStorage.setItem("demoUsers", JSON.stringify(updatedUsers))

          // Force redirect
          setTimeout(() => {
            router.push("/dashboard")
          }, 500)
          return
        }
      }

      // If no match found, provide helpful error
      console.log("No matching demo user found")
      console.log(
        "Available emails:",
        demoUsers.map((u: any) => u.email),
      )

      setErrors(["Invalid email or password. Please check your credentials."])
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Make sure you've created an account first.",
        variant: "destructive",
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">WealthFlow</span>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your demo account to continue investing</CardDescription>

            {/* Demo Mode Notice */}
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-medium">Demo Platform Active</p>
                  <p>Use your signup credentials to access your demo account</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Error Display */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-red-800 dark:text-red-200">
                    <p className="font-medium mb-1">Please fix the following errors:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={errors.some((e) => e.includes("email") || e.includes("Email")) ? "border-red-500" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={errors.some((e) => e.includes("Password")) ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Create demo account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
