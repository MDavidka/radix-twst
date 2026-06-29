"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, X, Send, Sparkles, Smartphone } from "lucide-react"
import { phones } from "@/lib/data"

interface Message {
  id: string
  sender: "user" | "ai"
  text: string
  timestamp: Date
  recommendation?: {
    id: string
    name: string
    price: number
    image: string
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi! I'm Phonix AI, your personal mobile assistant. Ask me anything about our phone lineup, cameras, battery life, or prices!",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: query,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput("")
    setIsTyping(true)

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = generateAIResponse(query)
      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (query: string): Message => {
    const q = query.toLowerCase()
    let text = ""
    let recommendation: Message["recommendation"] = undefined

    // Helper to find specific phone
    const findPhone = (id: string) => phones.find((p) => p.id === id)

    if (q.includes("camera") || q.includes("photo") || q.includes("lens") || q.includes("megapixel")) {
      const phone = findPhone("xiaomi-14-ultra") || phones[0]
      text = `If photography is your top priority, I highly recommend the **${phone.name}**. It's co-engineered with Leica and features a revolutionary 1-inch main camera sensor for unmatched low-light performance and professional depth-of-field control.`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    } else if (q.includes("cheap") || q.includes("budget") || q.includes("affordable") || q.includes("lowest price")) {
      const phone = findPhone("oneplus-12") || phones[3]
      text = `The **${phone.name}** offers the absolute best value-to-performance ratio. Starting at just $${phone.basePrice}, it packs the flagship Snapdragon 8 Gen 3 processor, a gorgeous 2K display, and hyper-fast 100W charging.`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    } else if (q.includes("battery") || q.includes("charge") || q.includes("charging") || q.includes("mah")) {
      const phone = findPhone("oneplus-12") || phones[3]
      text = `For ultimate battery endurance and charging speeds, the **${phone.name}** is king. It features a massive 5,400mAh battery and charges from 0 to 100% in just 26 minutes with its 100W SUPERVOOC fast charger (included in the box!).`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    } else if (q.includes("apple") || q.includes("iphone") || q.includes("ios")) {
      const phone = findPhone("iphone-15-pro") || phones[0]
      text = `Our flagship Apple device is the **${phone.name}**. Built with aerospace-grade titanium and powered by the A17 Pro chip, it's incredibly durable and handles any task with ease.`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    } else if (q.includes("samsung") || q.includes("galaxy") || q.includes("s24")) {
      const phone = findPhone("galaxy-s24-ultra") || phones[1]
      text = `The **${phone.name}** is our most advanced Android device. It comes with a built-in S Pen and features Galaxy AI, which unlocks features like Circle to Search and Live Call Translation.`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    } else if (q.includes("google") || q.includes("pixel")) {
      const phone = findPhone("pixel-8-pro") || phones[2]
      text = `The **${phone.name}** is built with Google's custom Tensor G3 chip and offers unmatched photo-editing AI features like Best Take, Magic Eraser, and stock Android experience.`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    } else {
      // Default fallback
      const phone = findPhone("iphone-15-pro") || phones[0]
      text = `I can help you find your perfect phone! Many of our customers love the **${phone.name}** for its premium titanium build, or the **Galaxy S24 Ultra** for its built-in AI capabilities. What features matter most to you?`
      recommendation = {
        id: phone.id,
        name: phone.name,
        price: phone.basePrice,
        image: Object.values(phone.images)[0]?.[0] || "",
      }
    }

    return {
      id: Math.random().toString(),
      sender: "ai",
      text,
      timestamp: new Date(),
      recommendation,
    }
  }

  const quickPrompts = [
    "Best Camera Phone? 📸",
    "Cheapest Flagship? 💸",
    "Longest Battery Life? 🔋",
    "Compare iPhone & Samsung ⚔️",
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <Card className="w-[350px] sm:w-[380px] h-[500px] shadow-2xl border-border bg-card flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <CardHeader className="bg-muted/50 py-3 px-4 border-b border-border flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Phonix AI Assistant</CardTitle>
                <p className="text-xs text-emerald-500 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online & Ready
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-4 overflow-hidden">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <Avatar className="h-8 w-8 bg-muted border border-border">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="space-y-2">
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted/40 border border-border text-foreground rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      </div>

                      {/* Phone Recommendation Card */}
                      {msg.recommendation && (
                        <div className="border border-border rounded-lg p-2.5 bg-card/60 flex items-center gap-3 animate-in fade-in-50 duration-300">
                          <img
                            src={msg.recommendation.image}
                            alt={msg.recommendation.name}
                            className="h-12 w-12 rounded bg-muted object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold truncate">
                              {msg.recommendation.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              From ${msg.recommendation.price}
                            </p>
                          </div>
                          <Link href={`/phones/${msg.recommendation.id}`} onClick={() => setIsOpen(false)}>
                            <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                              View
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 max-w-[85%]">
                    <Avatar className="h-8 w-8 bg-muted border border-border">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/40 border border-border p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt.replace(/[📸💸🔋⚔️]/g, "").trim())}
                  className="text-xs bg-muted/40 hover:bg-muted border border-border px-2.5 py-1 rounded-full text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input */}
          <CardFooter className="p-3 border-t border-border bg-muted/20">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex w-full items-center gap-2"
            >
              <Input
                placeholder="Ask Phonix AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 h-9 bg-background"
              />
              <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl flex items-center justify-center p-0"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
