import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Award, Globe, Shield, Zap, Code, Linkedin, Github } from "lucide-react"

const founders = [
  {
    name: "Anas Mustaqueem",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=120&width=120&text=CEO",
    bio: "Full-Stack Developer and Fintech Entrepreneur. Creator of WealthFlow platform with expertise in React, Next.js, and financial technology solutions.",
    linkedin: "#",
    github: "#",
    isFounder: true,
  },
  {
    name: "Sarah Johnson",
    role: "Chief Investment Officer",
    image: "/placeholder.svg?height=120&width=120&text=CIO",
    bio: "Former Goldman Sachs VP with 15+ years in investment banking. Harvard MBA, CFA charterholder.",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    image: "/placeholder.svg?height=120&width=120&text=CTO",
    bio: "Ex-Google Senior Engineer, Stanford CS PhD. Expert in AI/ML and financial technology systems.",
    linkedin: "#",
  },
]

const stats = [
  { icon: Users, label: "Active Investors", value: "50,000+" },
  { icon: TrendingUp, label: "Assets Under Management", value: "$2.5B+" },
  { icon: Award, label: "Average Annual Return", value: "12.5%" },
  { icon: Globe, label: "Countries Served", value: "25+" },
]

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Bank-grade security with full regulatory compliance and insurance protection for all investments.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Cutting-edge AI and machine learning technology to optimize investment strategies and returns.",
  },
  {
    icon: Users,
    title: "Client Success",
    description:
      "Dedicated to helping our clients achieve their financial goals through personalized investment solutions.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=600&width=1200&text=Modern+Financial+Office"
            alt="Modern financial office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 text-white">
            <h1 className="text-4xl lg:text-6xl font-bold">
              About <span className="text-yellow-300">WealthFlow</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              We're on a mission to democratize wealth building through intelligent investment technology, making
              sophisticated investment strategies accessible to everyone.
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
              <Code className="w-4 h-4 mr-2" />
              Built with Cutting-Edge Technology
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Our Mission</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At WealthFlow, we believe that everyone deserves access to sophisticated investment strategies that were
                once reserved for institutional investors and the ultra-wealthy.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform combines cutting-edge artificial intelligence with proven investment methodologies to
                deliver personalized, data-driven investment solutions that adapt to your unique financial goals and
                risk tolerance.
              </p>
              <div className="grid gap-6 mt-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors duration-300">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/placeholder.svg?height=600&width=500&text=Investment+Analytics+Dashboard"
                  alt="Investment analytics dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60 blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team brings decades of experience from top-tier financial institutions and technology companies.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card
                key={index}
                className={`text-center hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm hover:scale-105 ${
                  founder.isFounder ? "ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5" : ""
                }`}
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-xl">
                      <AvatarImage src={founder.image || "/placeholder.svg"} alt={founder.name} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/80 text-white">
                        {founder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {founder.isFounder && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">★</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{founder.name}</h3>
                  <div className="space-y-2 mb-4">
                    <Badge variant={founder.isFounder ? "default" : "secondary"} className="text-sm">
                      {founder.role}
                    </Badge>
                    {founder.isFounder && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Platform Creator
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{founder.bio}</p>

                  {founder.isFounder && (
                    <div className="flex justify-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Linkedin className="w-5 h-5 text-white" />
                      </div>
                      <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Github className="w-5 h-5 text-white" />
                      </div>
                      <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">From concept to industry leader</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary"></div>

            <div className="space-y-12">
              {[
                {
                  year: "2024",
                  title: "Platform Creation",
                  description:
                    "Conceptualized and developed WealthFlow as a comprehensive fintech investment platform using cutting-edge technology.",
                },
                {
                  year: "2024",
                  title: "Full-Stack Development",
                  description:
                    "Built the entire platform using Next.js, React, TypeScript, and Supabase with modern UI/UX design principles.",
                },
                {
                  year: "2024",
                  title: "Feature Implementation",
                  description:
                    "Implemented advanced features including AI recommendations, real-time analytics, and comprehensive investment tracking.",
                },
                {
                  year: "2024",
                  title: "Platform Launch",
                  description:
                    "Successfully launched WealthFlow with full authentication, investment plans, and portfolio management capabilities.",
                },
                {
                  year: "Future",
                  title: "Scaling & Growth",
                  description:
                    "Plans for expanding features, adding payment integration, and scaling to serve thousands of investors globally.",
                },
              ].map((milestone, index) => (
                <div key={index} className="flex items-center space-x-8 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {milestone.year}
                  </div>
                  <div className="flex-1 bg-gradient-to-r from-card/50 to-transparent p-6 rounded-2xl group-hover:from-card/80 transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-primary">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
