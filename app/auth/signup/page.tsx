"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useSupabase } from "@/components/supabase-provider"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const isValidEmail = (email: string) => {
    // More comprehensive email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email.trim().toLowerCase())
  }

  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.firstName.trim()) {
      newErrors.push("First name is required")
    } else if (formData.firstName.trim().length < 2) {
      newErrors.push("First name must be at least 2 characters")
    }

    if (!formData.lastName.trim()) {
      newErrors.push("Last name is required")
    } else if (formData.lastName.trim().length < 2) {
      newErrors.push("Last name must be at least 2 characters")
    }

    if (!formData.email.trim()) {
      newErrors.push("Email is required")
    } else if (!isValidEmail(formData.email)) {
      newErrors.push("Please enter a valid email address (e.g., user@example.com)")
    }

    if (!formData.password) {
      newErrors.push("Password is required")
    } else if (formData.password.length < 8) {
      newErrors.push("Password must be at least 8 characters long")
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.push("Password must contain at least one uppercase letter, one lowercase letter, and one number")
    }

    if (!formData.confirmPassword) {
      newErrors.push("Please confirm your password")
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match")
    }

    if (!acceptTerms) {
      newErrors.push("Please accept the terms and conditions")
    }

    return newErrors
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup form submitted", { ...formData, password: "***", confirmPassword: "***" })

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
      // Check if Supabase is configured
      const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      console.log("Supabase configured:", isSupabaseConfigured)

      // Always use demo mode for now to avoid Supabase email validation issues
      console.log("Using demo mode signup...")

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clean and validate email
      const cleanEmail = formData.email.trim().toLowerCase()

      // Store demo user data in localStorage
      const demoUserData = {
        email: cleanEmail,
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        id: `demo-${Date.now()}`,
        created_at: new Date().toISOString(),
      }

      console.log("Storing demo user:", { ...demoUserData, password: "***" })

      // Store as single user (for backward compatibility)
      localStorage.setItem("demoUser", JSON.stringify(demoUserData))

      // Store in users array (for multiple accounts)
      const existingUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]")
      const updatedUsers = [...existingUsers.filter((u: any) => u.email !== cleanEmail), demoUserData]
      localStorage.setItem("demoUsers", JSON.stringify(updatedUsers))

      console.log("Demo users stored:", updatedUsers.length)

      toast({
        title: "Account Created Successfully! 🎉",
        description: `Welcome ${formData.firstName}! Your demo account has been created. You can now sign in.`,
      })

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setAcceptTerms(false)

      // Redirect to login with success message
      setTimeout(() => {
        router.push("/auth/login?message=demo-signup-success&email=" + encodeURIComponent(cleanEmail))
      }, 1000)
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Signup Failed",
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
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Join thousands of smart investors today</CardDescription>

            {/* Demo Mode Notice */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Demo Platform:</strong> Create your demo investment account to explore all features
              </p>
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

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.some((e) => e.includes("First name")) ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.some((e) => e.includes("Last name")) ? "border-red-500" : ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.some((e) => e.includes("email") || e.includes("Email")) ? "border-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground">Use any valid email format for your demo account</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password * (min 8 characters)</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                <p className="text-xs text-muted-foreground">Must contain uppercase, lowercase, and number</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.some((e) => e.includes("confirm") || e.includes("match")) ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className={errors.some((e) => e.includes("terms")) ? "border-red-500" : ""}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating your account...
                  </div>
                ) : (
                  "Create Demo Account"
                )}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
