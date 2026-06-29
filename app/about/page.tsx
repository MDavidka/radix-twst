"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Globe,
  Leaf,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  Sparkles,
} from "lucide-react"

export default function AboutPage() {
  const [contactName, setContactName] = React.useState("")
  const [contactEmail, setContactEmail] = React.useState("")
  const [contactMsg, setContactMsg] = React.useState("")

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) {
      toast.error("Please fill in all contact form fields.")
      return
    }

    toast.success("Message sent successfully! Our mobile specialists will contact you within 2 hours.")
    setContactName("")
    setContactEmail("")
    setContactMsg("")
  }

  const stores = [
    {
      city: "New York Flagship",
      address: "767 Fifth Avenue, New York, NY 10153",
      phone: "+1 (212) 555-0199",
      hours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 7:00 PM",
    },
    {
      city: "London Regent St.",
      address: "235 Regent St, London W1B 2EL, UK",
      phone: "+44 20 7555 0143",
      hours: "Mon - Sat: 10:00 AM - 8:00 PM | Sun: 12:00 PM - 6:00 PM",
    },
    {
      city: "Tokyo Ginza",
      address: "2-11 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
      phone: "+81 3 5555 0188",
      hours: "Daily: 10:00 AM - 9:00 PM",
    },
  ]

  const values = [
    {
      icon: Leaf,
      title: "100% Carbon Neutral",
      description: "We offset the carbon footprint of every device manufactured and shipped. Our packaging is 100% plastic-free and recyclable.",
    },
    {
      icon: Globe,
      title: "Recycled Titanium",
      description: "Our structural frames are forged from 75% recycled aerospace-grade titanium, reducing mining impact and electronic waste.",
    },
    {
      icon: ShieldCheck,
      title: "Ethical Sourcing",
      description: "We source our battery cells, neural chips, and camera elements from audited, fair-labor partners across the globe.",
    },
  ]

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="relative py-20 bg-muted/10 border-b border-border text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10 space-y-6">
          <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 font-medium border border-border">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Our Story
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Redefining the Premium Mobile Experience
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Phonix was founded on a simple premise: premium mobile technology shouldn't cost the Earth. We engineer cutting-edge smartphones that combine structural durability, next-generation AI, and ethical sourcing.
          </p>
        </div>
      </section>

      {/* Brand Values */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            How we build, ship, and support our devices sets us apart.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((val, idx) => {
            const Icon = val.icon
            return (
              <Card key={idx} className="bg-card/40 border-border">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center border border-border mb-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-bold">{val.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Retail Stores */}
      <section id="retail" className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Global Showrooms</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Visit our physical flagships to hold titanium in your hands and meet our specialists.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stores.map((store, idx) => (
            <Card key={idx} className="bg-card/20 border-border">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{store.city}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <p className="leading-relaxed">{store.address}</p>
                <Separator className="border-border/50" />
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-xs line-clamp-1">{store.hours}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Card className="bg-card/30 border border-border p-6 sm:p-10 rounded-2xl">
          <div className="grid gap-10 md:grid-cols-12 items-center">
            {/* Left Info */}
            <div className="md:col-span-5 space-y-4">
              <h3 className="text-xl font-bold">Get in Touch</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Have a question about bulk enterprise orders, developer APIs, or retail appointments? Send us a message!
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@phonix.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+1 (800) 555-0100</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                    <Input
                      placeholder="Your Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="bg-background border-border h-10"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="bg-background border-border h-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                  <Textarea
                    placeholder="How can our mobile specialists help you?"
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="bg-background border-border min-h-[120px] resize-none"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-10 gap-2">
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
