"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface SectionNewsletterProps {
  heading?: string
  subheading?: string
}

export function SectionNewsletter({
  heading = "Join the Inner Circle",
  subheading = "Subscribe to receive exclusive launches, flash sales, and expert mobile insights. No spam, ever.",
}: SectionNewsletterProps) {
  const [email, setEmail] = React.useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }

    toast.success("Successfully subscribed! Check your inbox for your 10% discount code.")
    setEmail("")
  }

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Card className="bg-card/50 border border-border p-6 sm:p-10 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid gap-6 md:grid-cols-5 items-center">
            <div className="md:col-span-3 space-y-3">
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                {heading}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-muted-foreground">
                {subheading}
              </CardDescription>
            </div>
            <div className="md:col-span-2">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background h-10 border-border"
                  required
                />
                <Button type="submit" className="h-10 shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
