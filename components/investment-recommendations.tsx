"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Shield, Zap, ExternalLink } from "lucide-react"

const recommendations = [
  {
    title: "Tech Growth Fund",
    description: "High-growth technology stocks with strong fundamentals",
    expectedReturn: "15-18%",
    riskLevel: "Medium",
    minInvestment: 1000,
    icon: Zap,
    reason: "Based on your risk profile and growth objectives",
    investmentUrl: "https://www.schwab.com/",
  },
  {
    title: "Dividend Aristocrats",
    description: "Stable companies with consistent dividend payments",
    expectedReturn: "8-12%",
    riskLevel: "Low",
    minInvestment: 500,
    icon: Shield,
    reason: "Perfect for steady income generation",
    investmentUrl: "https://investor.vanguard.com/",
  },
  {
    title: "Emerging Markets",
    description: "Diversified exposure to developing economies",
    expectedReturn: "12-16%",
    riskLevel: "High",
    minInvestment: 2000,
    icon: TrendingUp,
    reason: "Matches your appetite for higher returns",
    investmentUrl: "https://www.etrade.com/",
  },
]

export function InvestmentRecommendations() {
  const handleInvestClick = (url: string, title: string) => {
    // Open investment platform in new tab
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          AI Recommendations
        </CardTitle>
        <CardDescription>Personalized investment suggestions based on your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-primary/10 rounded">
                  <rec.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
              <Badge
                variant={rec.riskLevel === "Low" ? "secondary" : rec.riskLevel === "Medium" ? "default" : "destructive"}
              >
                {rec.riskLevel}
              </Badge>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Expected Return:</span>
              <span className="font-medium text-green-600">{rec.expectedReturn}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Min Investment:</span>
              <span className="font-medium">${rec.minInvestment.toLocaleString()}</span>
            </div>

            <p className="text-xs text-muted-foreground italic">{rec.reason}</p>

            <Button size="sm" className="w-full" onClick={() => handleInvestClick(rec.investmentUrl, rec.title)}>
              <ExternalLink className="w-3 h-3 mr-2" />
              Invest Now
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
