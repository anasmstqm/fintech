"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, BarChart3, Brain, Lock, Smartphone, Globe, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized investment recommendations powered by advanced machine learning algorithms.",
    badge: "Smart",
    gradient: "gradient-british-green",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track your portfolio performance with live charts and comprehensive market analysis.",
    badge: "Analytics",
    gradient: "gradient-british-light",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your investments are protected with enterprise-level security and insurance coverage.",
    badge: "Secure",
    gradient: "gradient-british-dark",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    description: "Execute trades in milliseconds with our high-performance trading infrastructure.",
    badge: "Fast",
    gradient: "gradient-british-green",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Manage your investments on-the-go with our award-winning mobile application.",
    badge: "Mobile",
    gradient: "gradient-british-light",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Access investment opportunities across global markets and asset classes.",
    badge: "Global",
    gradient: "gradient-british-dark",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "24/7 support from certified financial advisors and investment specialists.",
    badge: "Support",
    gradient: "gradient-british-green",
  },
  {
    icon: Lock,
    title: "Regulatory Compliance",
    description: "Fully compliant with SEC regulations and industry best practices.",
    badge: "Compliant",
    gradient: "gradient-british-light",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-green-800 dark:text-white">Why Choose WealthFlow?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We combine cutting-edge technology with proven investment strategies to deliver exceptional results for our
            clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 ${feature.gradient} rounded-xl w-fit shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
