"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Portfolio Manager",
    company: "Goldman Sachs",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "WealthFlow has transformed how I manage my personal investments. The AI insights are incredibly accurate and have helped me achieve a 15% annual return.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    company: "StartupXYZ",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "As a busy entrepreneur, I needed a platform that could handle my investments automatically. WealthFlow delivers exactly that with exceptional results.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    company: "Wealth Partners",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "I recommend WealthFlow to all my clients. The platform is intuitive, secure, and consistently outperforms traditional investment methods.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Retired Executive",
    company: "Fortune 500",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "After 30 years in finance, I can confidently say WealthFlow is the future of investment management. Outstanding platform and support.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold">
            Trusted by <span className="text-primary">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See what our clients say about their experience with WealthFlow and how we've helped them achieve their
            financial goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center space-x-3 pt-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
