import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/components/supabase-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WealthFlow - Professional Investment Platform | Anas Mustaqueem",
  description:
    "Advanced fintech investment platform built with Next.js, React, and TypeScript. Created by Anas Mustaqueem.",
  keywords: "fintech, investment platform, portfolio management, React, Next.js, TypeScript, Anas Mustaqueem",
  authors: [{ name: "Anas Mustaqueem" }],
  creator: "Anas Mustaqueem",
  publisher: "Anas Mustaqueem",
  robots: "index, follow",
  openGraph: {
    title: "WealthFlow - Investment Platform by Anas Mustaqueem",
    description: "Professional fintech platform for smart investing",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="author" content="Anas Mustaqueem" />
        <meta name="developer" content="Anas Mustaqueem" />
        <meta name="creator" content="Anas Mustaqueem" />
        <meta name="application-name" content="WealthFlow" />
        <meta name="theme-color" content="#1a5f4a" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            {children}
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
