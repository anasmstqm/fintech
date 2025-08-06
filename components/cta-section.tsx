"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Crown, Gem } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const benefits = [
  "No minimum investment required",
  "Zero account maintenance fees",
  "Instant portfolio diversification",
  "24/7 premium customer support",
  "Mobile app included",
]

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Pure British Racing Green Background */}
      <div className="absolute inset-0 gradient-premium opacity-95" />
      <div className="absolute inset-0 wealth-pattern" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-20 h-20 gradient-british-green rounded-full opacity-30 blur-lg"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [180, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-16 h-16 gradient-british-light rounded-full opacity-30 blur-lg"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-white"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-white border border-white/30">
                <Crown className="w-4 h-4 mr-2 text-yellow-300" />
                Premium Wealth Experience
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Start Your{" "}
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Investment Journey?
                </span>
              </h2>

              <p className="text-xl text-gray-100 leading-relaxed">
                Join thousands of smart investors who have already started building their wealth with WealthFlow. Get
                started today with as little as $1.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 bg-white text-green-800 hover:bg-gray-50 font-semibold shadow-lg"
              >
                <Link href="/auth/signup">
                  <Gem className="mr-2 h-5 w-5" />
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur"
              >
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-effect backdrop-blur-lg rounded-3xl p-8 border border-white/20 british-glow">
              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
                <Crown className="w-6 h-6 mr-2 text-yellow-300" />
                Premium Benefits:
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="p-1 bg-white/20 rounded-full">
                      <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    </div>
                    <span className="text-gray-100 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
