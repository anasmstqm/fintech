"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap, DollarSign, Crown, Gem } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Pure British Racing Green Background */}
      <div className="absolute inset-0 gradient-investment opacity-95" />
      <div className="absolute inset-0 wealth-pattern" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 gradient-british-green rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-40 right-32 w-24 h-24 gradient-british-light rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-white"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium glass-effect text-white border border-white/30"
              >
                <Crown className="w-4 h-4 mr-2 text-yellow-300" />
                Premium Wealth Management
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                Build Wealth with{" "}
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Smart Investments
                </span>
              </h1>

              <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
                Join thousands of investors who trust WealthFlow to grow their wealth through intelligent investment
                strategies, real-time analytics, and expert guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 bg-white text-green-800 hover:bg-gray-50 font-semibold shadow-lg"
              >
                <Link href="/auth/signup">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur"
              >
                <Link href="/investments">
                  <Gem className="mr-2 h-4 w-4" />
                  View Investment Plans
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-white">$2.5B+</div>
                <div className="text-sm text-gray-300">Assets Under Management</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-300">Active Investors</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold text-white">12.5%</div>
                <div className="text-sm text-gray-300">Average Annual Return</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative glass-effect rounded-3xl shadow-2xl p-8 border border-white/20 british-glow">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Portfolio Overview</h3>
                  <div className="flex items-center text-emerald-300">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">+12.5%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Total Investment</span>
                    <span className="font-semibold text-white">$125,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Current Value</span>
                    <span className="font-semibold text-emerald-300">$140,625</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Total Profit</span>
                    <span className="font-semibold text-emerald-300">+$15,625</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <motion.div
                    className="text-center p-4 glass-effect rounded-xl border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-xs text-gray-300">Secure</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-4 glass-effect rounded-xl border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
                    <div className="text-xs text-gray-300">Fast</div>
                  </motion.div>
                  <motion.div
                    className="text-center p-4 glass-effect rounded-xl border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
                    <div className="text-xs text-gray-300">Profitable</div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 w-16 h-16 gradient-british-light rounded-full opacity-80 blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 w-12 h-12 gradient-british-green rounded-full opacity-80 blur-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
