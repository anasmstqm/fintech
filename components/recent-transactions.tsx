"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "investment",
    plan: "Growth Portfolio",
    amount: 5000,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    type: "dividend",
    plan: "Dividend Fund",
    amount: 250,
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: 3,
    type: "investment",
    plan: "Tech Stocks",
    amount: 3000,
    date: "2024-01-10",
    status: "completed",
  },
  {
    id: 4,
    type: "withdrawal",
    plan: "Savings Plan",
    amount: 1500,
    date: "2024-01-08",
    status: "pending",
  },
  {
    id: 5,
    type: "investment",
    plan: "Bond Portfolio",
    amount: 2500,
    date: "2024-01-05",
    status: "completed",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest investment activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "investment"
                      ? "bg-green-100 text-green-600"
                      : transaction.type === "dividend"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.type === "investment" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : transaction.type === "dividend" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.plan}</div>
                  <div className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-semibold ${transaction.type === "withdrawal" ? "text-red-600" : "text-green-600"}`}
                >
                  {transaction.type === "withdrawal" ? "-" : "+"}${transaction.amount.toLocaleString()}
                </div>
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
