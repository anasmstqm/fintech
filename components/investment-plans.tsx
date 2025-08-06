"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Shield, Zap, Target, Clock, Users, ExternalLink } from "lucide-react"

const investmentPlans = [
  {
    id: 1,
    name: "Conservative Growth",
    description: "Low-risk investment focused on steady, long-term growth with capital preservation.",
    expectedReturn: "6-8%",
    minInvestment: 500,
    duration: "12 months",
    riskLevel: "Low",
    icon: Shield,
    features: ["Capital Protection", "Steady Returns", "Low Volatility"],
    currentInvestors: 2847,
    totalRaised: 12500000,
    targetAmount: 15000000,
    category: "Bonds & Fixed Income",
    investmentUrl: "https://www.vanguard.com/",
    image: "/images/conservative-bonds.png",
  },
  {
    id: 2,
    name: "Balanced Portfolio",
    description: "Diversified mix of stocks and bonds designed for moderate growth with balanced risk.",
    expectedReturn: "10-12%",
    minInvestment: 1000,
    duration: "18 months",
    riskLevel: "Medium",
    icon: Target,
    features: ["Diversified Assets", "Professional Management", "Quarterly Rebalancing"],
    currentInvestors: 1923,
    totalRaised: 8750000,
    targetAmount: 12000000,
    category: "Mixed Assets",
    investmentUrl: "https://www.fidelity.com/",
    image: "/images/balanced-portfolio.png",
  },
  {
    id: 3,
    name: "Tech Growth Fund",
    description: "High-growth technology stocks with potential for significant returns and higher volatility.",
    expectedReturn: "15-20%",
    minInvestment: 2000,
    duration: "24 months",
    riskLevel: "High",
    icon: Zap,
    features: ["High Growth Potential", "Tech Focus", "Active Management"],
    currentInvestors: 1456,
    totalRaised: 15600000,
    targetAmount: 20000000,
    category: "Technology Stocks",
    investmentUrl: "https://www.schwab.com/",
    image: "/images/tech-growth.png",
  },
  {
    id: 4,
    name: "Dividend Champions",
    description: "Portfolio of dividend-paying stocks from established companies with consistent payouts.",
    expectedReturn: "8-10%",
    minInvestment: 750,
    duration: "12 months",
    riskLevel: "Low",
    icon: TrendingUp,
    features: ["Regular Dividends", "Blue Chip Stocks", "Income Focus"],
    currentInvestors: 3241,
    totalRaised: 18900000,
    targetAmount: 25000000,
    category: "Dividend Stocks",
    investmentUrl: "https://investor.vanguard.com/",
    image: "/images/dividend-stocks.png",
  },
  {
    id: 5,
    name: "Emerging Markets",
    description: "Exposure to high-growth emerging market economies with significant upside potential.",
    expectedReturn: "12-18%",
    minInvestment: 1500,
    duration: "36 months",
    riskLevel: "High",
    icon: TrendingUp,
    features: ["Global Diversification", "High Growth Markets", "Currency Exposure"],
    currentInvestors: 892,
    totalRaised: 6200000,
    targetAmount: 10000000,
    category: "International",
    investmentUrl: "https://www.etrade.com/",
    image: "/images/emerging-markets.png",
  },
  {
    id: 6,
    name: "ESG Sustainable",
    description: "Environmentally and socially responsible investments with strong governance practices.",
    expectedReturn: "9-11%",
    minInvestment: 1000,
    duration: "24 months",
    riskLevel: "Medium",
    icon: Shield,
    features: ["ESG Compliant", "Sustainable Focus", "Impact Investing"],
    currentInvestors: 1678,
    totalRaised: 9800000,
    targetAmount: 15000000,
    category: "ESG/Sustainable",
    investmentUrl: "https://www.tdameritrade.com/",
    image: "/images/esg-sustainable.png",
  },
]

export function InvestmentPlans() {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleInvestClick = (url: string, planName: string) => {
    // Open investment platform in new tab
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Premium Investment Opportunities
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Carefully curated investment plans designed by financial experts to maximize your wealth potential
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {investmentPlans.map((plan) => {
          const progressPercentage = (plan.totalRaised / plan.targetAmount) * 100

          return (
            <Card
              key={plan.id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm hover:scale-[1.02] overflow-hidden"
            >
              {/* Investment Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={plan.image || "/placeholder.svg"}
                  alt={plan.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className={getRiskColor(plan.riskLevel)}>{plan.riskLevel} Risk</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2">
                    <plan.icon className="w-6 h-6" />
                    <span className="font-semibold">{plan.category}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="space-y-4">
                <div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {plan.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Expected Return</span>
                    <div className="font-bold text-lg text-green-600">{plan.expectedReturn}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Duration</span>
                    <div className="font-semibold flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {plan.duration}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Min Investment</span>
                    <div className="font-bold text-lg">${plan.minInvestment.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Investors</span>
                    <div className="font-semibold flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {plan.currentInvestors.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${(plan.totalRaised / 1000000).toFixed(1)}M raised</span>
                    <span>${(plan.targetAmount / 1000000).toFixed(1)}M target</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Key Features:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full group-hover:shadow-lg transition-all duration-300"
                  size="lg"
                  onClick={() => handleInvestClick(plan.investmentUrl, plan.name)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-16 text-center space-y-6 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl">
        <h3 className="text-2xl font-bold">Ready to Start Your Investment Journey?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of smart investors who have already started building their wealth with our curated investment
          opportunities.
        </p>
        <Button size="lg" className="px-8">
          Get Started Today
        </Button>
      </div>
    </div>
  )
}
