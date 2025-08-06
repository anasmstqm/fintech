"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, Clock, MessageSquare, HelpCircle, Code } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    contact: "support@wealthflow.com",
    availability: "24/7 Response",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our experts",
    contact: "+1 (555) 123-4567",
    availability: "Mon-Fri 9AM-6PM EST",
  },
  {
    icon: Code,
    title: "Developer Contact",
    description: "Contact the creator",
    contact: "Anas Mustaqueem",
    availability: "Platform Developer",
  },
]

const faqs = [
  {
    question: "Who created WealthFlow?",
    answer:
      "WealthFlow was created by Anas Mustaqueem, a full-stack developer specializing in fintech solutions. The entire platform was designed and developed using modern web technologies including Next.js, React, and TypeScript.",
  },
  {
    question: "How do I get started with investing?",
    answer:
      "Simply create an account, complete your investor profile, and you can start investing with as little as $1. Our AI will recommend suitable investment plans based on your goals and risk tolerance.",
  },
  {
    question: "What fees does WealthFlow charge?",
    answer:
      "We charge a transparent management fee of 0.75% annually on your invested assets. There are no hidden fees, account minimums, or transaction costs for standard investments.",
  },
  {
    question: "How secure are my investments?",
    answer:
      "Your investments are protected by bank-grade security, SIPC insurance up to $500,000, and we maintain strict regulatory compliance with all financial authorities.",
  },
  {
    question: "Can I withdraw my money anytime?",
    answer:
      "Yes, you can withdraw your funds at any time. Most withdrawals are processed within 1-3 business days, though some investment plans may have specific terms.",
  },
  {
    question: "How does the AI recommendation system work?",
    answer:
      "Our AI analyzes your financial goals, risk tolerance, investment timeline, and market conditions to recommend personalized investment strategies that align with your objectives.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions about investing or need help with your account? Our expert team is here to help you
              succeed.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Code className="w-4 h-4 mr-2" />
              Platform created by Anas Mustaqueem
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{info.description}</p>
                  <p className="font-medium mb-2">{info.contact}</p>
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {info.availability}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What can we help you with?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Quick answers to common questions about WealthFlow.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-sm">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    {index < faqs.length - 1 && <hr className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
