"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { phones } from "@/lib/data"
import { SectionHero } from "@/components/sections/hero"
import { SectionStats } from "@/components/sections/stats"
import { SectionFeatures } from "@/components/sections/features"
import { SectionTestimonials } from "@/components/sections/testimonials"
import { SectionFaq } from "@/components/sections/faq"
import { SectionNewsletter } from "@/components/sections/newsletter"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Check,
  Sparkles,
  Smartphone,
  ArrowRight,
  Calculator,
} from "lucide-react"

export default function HomePage() {
  const mounted = useMounted()
  const addToCart = useStore((state) => state.addToCart)

  // Customizer State
  const customizerPhones = phones.filter((p) => p.featured)
  const [selectedPhone, setSelectedPhone] = React.useState(customizerPhones[0])
  const [selectedColor, setSelectedColor] = React.useState(customizerPhones[0].colors[0])
  const [selectedStorage, setSelectedStorage] = React.useState(customizerPhones[0].storage[0])

  // Update customizer selections when phone changes
  React.useEffect(() => {
    setSelectedColor(selectedPhone.colors[0])
    setSelectedStorage(selectedPhone.storage[0])
  }, [selectedPhone])

  const customizerPrice = selectedPhone.basePrice + selectedStorage.priceModifier

  const handleCustomizerAddToCart = () => {
    addToCart(selectedPhone, selectedColor.name, selectedStorage.size, 1, customizerPrice)
    toast.success(`Added customized ${selectedPhone.name} to your cart!`, {
      description: `${selectedColor.name} • ${selectedStorage.size} • $${customizerPrice}`,
    })
  }

  // Trade-in State
  const [tradeBrand, setTradeBrand] = React.useState("")
  const [tradeModel, setTradeModel] = React.useState("")
  const [tradeCondition, setTradeCondition] = React.useState("")
  const [tradeInEstimation, setTradeInEstimation] = React.useState<number | null>(null)
  const setStoreTradeIn = useStore((state) => state.setTradeIn)

  const handleCalculateTradeIn = () => {
    if (!tradeBrand || !tradeModel || !tradeCondition) {
      toast.error("Please fill in all fields to calculate value.")
      return
    }

    // Realistic valuation logic
    let baseValue = 0
    if (tradeBrand === "apple") {
      if (tradeModel.includes("14")) baseValue = 500
      else if (tradeModel.includes("13")) baseValue = 380
      else if (tradeModel.includes("12")) baseValue = 260
      else baseValue = 150
    } else if (tradeBrand === "samsung") {
      if (tradeModel.includes("23")) baseValue = 450
      else if (tradeModel.includes("22")) baseValue = 320
      else if (tradeModel.includes("21")) baseValue = 200
      else baseValue = 120
    } else {
      baseValue = 180
    }

    let multiplier = 1
    if (tradeCondition === "excellent") multiplier = 1.1
    else if (tradeCondition === "good") multiplier = 0.9
    else multiplier = 0.6

    const finalValue = Math.round(baseValue * multiplier)
    setTradeInEstimation(finalValue)
    setStoreTradeIn(`${tradeBrand.toUpperCase()} ${tradeModel}`, tradeCondition, finalValue)

    toast.success(`Trade-in estimated at $${finalValue}!`, {
      description: "Credit saved. It will be applied automatically at checkout.",
    })
  }

  // Store features list
  const storeFeatures = [
    {
      icon: Truck,
      title: "Free Express Shipping",
      description: "Get your device delivered to your door in 1-3 business days with carbon-neutral shipping.",
    },
    {
      icon: ShieldCheck,
      title: "2-Year Warranty",
      description: "We back our phones with an industry-leading 2-year warranty covering all hardware defects.",
    },
    {
      icon: RefreshCw,
      title: "30-Day Risk-Free Returns",
      description: "Not in love with your new phone? Send it back within 30 days for a zero-hassle full refund.",
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Connect with our dedicated mobile specialists anytime via live chat or phone support.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <SectionHero
        badge="Titanium Design. Infinite AI."
        title="The Absolute Peak of Mobile Performance"
        description="Discover our hand-forged titanium collection. Enabled with next-generation AI platforms, pro-grade camera sensors, and blazing-fast charging capabilities."
        primaryCta={{ label: "Explore Catalog", href: "/phones" }}
        secondaryCta={{ label: "Our Story", href: "/about" }}
      />

      {/* Stats Section */}
      <SectionStats />

      {/* Try It: Live Interactive Phone Customizer */}
      <section className="py-20 border-b border-border bg-background relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 font-medium border border-border">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Interactive Experience
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Customize Your Next Device
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Select a model, tailor the titanium finish, choose your storage size, and see your customized device immediately.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left: Dynamic Image Preview */}
            <div className="lg:col-span-7 flex justify-center">
              <Card className="w-full max-w-[550px] aspect-[4/3] rounded-2xl bg-card/40 border border-border flex items-center justify-center p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <img
                  src={selectedPhone.images[selectedColor.name]?.[0] || Object.values(selectedPhone.images)[0]?.[0]}
                  alt={selectedPhone.name}
                  className="object-contain max-h-[85%] max-w-[85%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-border text-xs">
                    {selectedColor.name}
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Right: Customizer Controls */}
            <div className="lg:col-span-5">
              <Card className="bg-card border border-border p-6 shadow-xl">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-2xl font-bold">{selectedPhone.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1.5">
                    {selectedPhone.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-6">
                  {/* Step 1: Select Model */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      1. Select Model
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {customizerPhones.map((phone) => (
                        <button
                          key={phone.id}
                          onClick={() => setSelectedPhone(phone)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all ${
                            selectedPhone.id === phone.id
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          }`}
                        >
                          {phone.brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Color */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      2. Titanium Color
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {selectedPhone.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative flex items-center justify-center h-9 w-9 rounded-full border transition-all ${
                            selectedColor.name === color.name
                              ? "border-primary scale-110 ring-2 ring-primary/20"
                              : "border-border hover:border-muted-foreground"
                          }`}
                          title={color.name}
                        >
                          <span className={`h-6 w-6 rounded-full ${color.bgClass} block`} />
                          {selectedColor.name === color.name && (
                            <Check className="h-3 w-3 text-background absolute" />
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      Selected finish: <span className="font-semibold text-foreground">{selectedColor.name}</span>
                    </p>
                  </div>

                  {/* Step 3: Select Storage */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      3. Storage Capacity
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {selectedPhone.storage.map((storeOption) => (
                        <button
                          key={storeOption.size}
                          onClick={() => setSelectedStorage(storeOption)}
                          className={`py-2.5 px-3 rounded-lg border text-left flex flex-col justify-between h-16 transition-all ${
                            selectedStorage.size === storeOption.size
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border bg-muted/10 text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                          }`}
                        >
                          <span className="text-sm font-bold text-foreground">
                            {storeOption.size}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {storeOption.priceModifier === 0
                              ? "Included"
                              : `+$${storeOption.priceModifier}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <Separator className="my-6" />

                <CardFooter className="p-0 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Customized Price</p>
                    <p className="text-2xl font-bold text-foreground mt-0.5">
                      ${customizerPrice}
                    </p>
                  </div>
                  <Button onClick={handleCustomizerAddToCart} size="lg" className="flex-1">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <SectionFeatures features={storeFeatures} />

      {/* Interactive Trade-In Program Estimator */}
      <section className="py-20 border-b border-border bg-card/20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Info */}
            <div className="space-y-6">
              <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 font-medium border border-border">
                <Calculator className="h-3.5 w-3.5 text-primary" />
                Phonix Trade-In
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Upgrade Smart. Get Paid Instantly.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Recycle your current smartphone and get up to **$550** in instant credit towards your new Phonix titanium flagship. We send you a prepaid box, you send us your device. It's that simple.
              </p>
              <div className="space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Instant valuation in less than 60 seconds</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Free prepaid shipping box and label provided</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Credit applied directly to your checkout total</span>
                </div>
              </div>
            </div>

            {/* Right: Calculator Widget */}
            <div>
              <Card className="bg-card border border-border p-6 shadow-xl">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-xl font-bold">Estimate Your Device Value</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    Select your device details to calculate your instant credit.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  {/* Brand */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Device Brand
                    </label>
                    <Select value={tradeBrand} onValueChange={setTradeBrand}>
                      <SelectTrigger className="bg-background border-border h-10">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border">
                        <SelectItem value="apple">Apple iPhone</SelectItem>
                        <SelectItem value="samsung">Samsung Galaxy</SelectItem>
                        <SelectItem value="google">Google Pixel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Model */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Device Model
                    </label>
                    <Select value={tradeModel} onValueChange={setTradeModel} disabled={!tradeBrand}>
                      <SelectTrigger className="bg-background border-border h-10">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border">
                        {tradeBrand === "apple" && (
                          <>
                            <SelectItem value="iphone-14-pro">iPhone 14 Pro / Pro Max</SelectItem>
                            <SelectItem value="iphone-13-pro">iPhone 13 Pro / Pro Max</SelectItem>
                            <SelectItem value="iphone-12-pro">iPhone 12 Pro / Pro Max</SelectItem>
                          </>
                        )}
                        {tradeBrand === "samsung" && (
                          <>
                            <SelectItem value="galaxy-s23-ultra">Galaxy S23 Ultra</SelectItem>
                            <SelectItem value="galaxy-s22-ultra">Galaxy S22 Ultra</SelectItem>
                            <SelectItem value="galaxy-s21-ultra">Galaxy S21 Ultra</SelectItem>
                          </>
                        )}
                        {tradeBrand === "google" && (
                          <>
                            <SelectItem value="pixel-7-pro">Pixel 7 Pro</SelectItem>
                            <SelectItem value="pixel-6-pro">Pixel 6 Pro</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Device Condition
                    </label>
                    <Select value={tradeCondition} onValueChange={setTradeCondition}>
                      <SelectTrigger className="bg-background border-border h-10">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border">
                        <SelectItem value="excellent">Excellent (Flawless, no scratches)</SelectItem>
                        <SelectItem value="good">Good (Minor wear, light scratches)</SelectItem>
                        <SelectItem value="fair">Fair (Scratches, minor dents, fully functional)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estimation Display */}
                  {mounted && tradeInEstimation !== null && (
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center animate-in fade-in duration-300">
                      <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">Estimated Credit</p>
                      <p className="text-3xl font-bold text-emerald-400 mt-1">${tradeInEstimation}</p>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        This credit has been automatically attached to your session.
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-0 pt-6">
                  <Button onClick={handleCalculateTradeIn} className="w-full h-10">
                    Calculate Valuation
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <SectionTestimonials />

      {/* FAQ Section */}
      <SectionFaq />

      {/* Newsletter Section */}
      <SectionNewsletter />
    </>
  )
}
