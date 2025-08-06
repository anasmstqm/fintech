"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, Sparkles, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const GEMINI_API_KEY = "AIzaSyCVcl44EMkMPiNqJfAS_u72tEGe_--OA0g"
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`

const quickSuggestions = [
  "What should I invest in as a beginner?",
  "How to diversify my portfolio?",
  "Best ETFs for long-term growth?",
  "Should I invest in tech stocks now?",
]

export function AIInvestmentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Investment Advisor. I can help you with investment strategies, portfolio diversification, market analysis, and personalized recommendations. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      const prompt = `You are an expert AI Investment Advisor for WealthFlow, a premium investment platform. 

User Question: ${userMessage}

Please provide helpful, accurate investment advice. Focus on:
- Investment strategies and portfolio diversification
- Market analysis and trends  
- Risk management
- Specific investment recommendations (ETFs, stocks, bonds)
- Financial planning tips

Keep responses concise but informative (max 200 words). Use a professional tone. If asked about specific stocks, provide balanced analysis including risks.

Response:`

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
            stopSequences: [],
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error Details:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        })
        throw new Error(`API request failed: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response:", data)

      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text
      } else {
        console.error("Unexpected API response structure:", data)
        return "I apologize, but I couldn't generate a response. Please try rephrasing your question."
      }
    } catch (error) {
      console.error("Gemini API Error:", error)

      // Provide fallback responses for common investment questions
      const fallbackResponses: { [key: string]: string } = {
        beginner:
          "For beginners, I recommend starting with low-cost index funds like S&P 500 ETFs (VOO, SPY). These provide instant diversification across 500 large US companies. Start with 70% stocks, 30% bonds, and invest consistently over time. Consider opening accounts with Vanguard, Fidelity, or Schwab for low fees.",
        diversify:
          "Diversification reduces risk by spreading investments across different asset classes. Consider: 60% US stocks (large, mid, small cap), 20% international stocks, 15% bonds, 5% REITs or commodities. Use ETFs for easy diversification: VTI (total stock market), VTIAX (international), BND (bonds).",
        etf: "Best long-term ETFs include: VTI (Total Stock Market), VOO (S&P 500), VEA (Developed Markets), VWO (Emerging Markets), BND (Total Bond Market). These have low expense ratios (0.03-0.10%) and provide broad market exposure.",
        tech: "Tech stocks are volatile but offer growth potential. Consider diversified tech ETFs like QQQ (Nasdaq 100) or VGT (Technology Sector) rather than individual stocks. Tech is currently facing headwinds from interest rates and regulation, so dollar-cost average your entries.",
      }

      const lowerMessage = userMessage.toLowerCase()
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          return response
        }
      }

      return "I'm experiencing technical difficulties connecting to the AI service. However, I can still help! For general investment advice: start with low-cost index funds, diversify across asset classes, invest regularly, and consider your risk tolerance. Popular platforms include Vanguard, Fidelity, and Schwab."
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const aiResponse = await callGeminiAPI(textToSend)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI Investment Advisor
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Online
          </Badge>
        </CardTitle>
        <CardDescription>Get personalized investment advice powered by AI</CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-0">
          <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 bg-transparent"
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about investments, portfolio strategy..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()} size="sm">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
