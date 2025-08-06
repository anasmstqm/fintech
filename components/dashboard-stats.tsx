"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, PieChart, Target } from "lucide-react"

const stats = [
  {
    title: "Total Portfolio Value",
    value: "$142,350",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Total Invested",
    value: "$125,000",
    change: "+$5,000",
    changeType: "positive" as const,
    icon: Target,
    description: "this month",
  },
  {
    title: "Total Profit/Loss",
    value: "+$17,350",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "overall return",
  },
  {
    title: "Active Investments",
    value: "12",
    change: "+2",
    changeType: "positive" as const,
    icon: PieChart,
    description: "investment plans",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div
                className={`flex items-center ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.changeType === "positive" ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </div>
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
