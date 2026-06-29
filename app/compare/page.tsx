"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { phones } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { GitCompare, Trash2, ShoppingCart, Star, Check, Smartphone, ArrowRight } from "lucide-react"

export default function ComparePage() {
  const mounted = useMounted()

  // Zustand state
  const compareList = useStore((state) => state.compareList)
  const toggleCompare = useStore((state) => state.toggleCompare)
  const clearCompare = useStore((state) => state.clearCompare)
  const addToCart = useStore((state) => state.addToCart)

  // Resolve compared phones
  const comparedPhones = phones.filter((p) => compareList.includes(p.id))

  const handleQuickAdd = (phone: any) => {
    const defaultColor = phone.colors[0].name
    const defaultStorage = phone.storage[0].size
    const price = phone.basePrice

    addToCart(phone, defaultColor, defaultStorage, 1, price)
    toast.success(`Added ${phone.name} to cart!`, {
      description: `${defaultColor} • ${defaultStorage} • $${price}`,
    })
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
          <p className="text-sm text-muted-foreground font-medium">Loading comparison...</p>
        </div>
      </div>
    )
  }

  if (comparedPhones.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md space-y-6">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto border border-border">
          <GitCompare className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">No devices selected</h1>
          <p className="text-muted-foreground text-sm">
            Add up to 3 smartphones from our catalog to compare their specifications side-by-side.
          </p>
        </div>
        <Link href="/phones">
          <Button className="w-full">
            Browse Devices
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight">Compare Devices</h1>
          <p className="text-muted-foreground text-sm">
            Review side-by-side hardware, camera, battery, and feature comparisons.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clearCompare} className="h-9 border-border text-xs">
          Clear Comparison
        </Button>
      </div>

      {/* Comparison Grid */}
      <div className="grid gap-6 md:grid-cols-4 items-stretch">
        {/* Specifications Categories Column (hidden on small screens, shown as labels on desktop) */}
        <div className="hidden md:flex flex-col justify-between py-6 text-muted-foreground text-xs font-bold uppercase tracking-wider space-y-12">
          <div className="h-[240px] flex items-end pb-4">
            <span>Model Overview</span>
          </div>
          <div className="py-2 border-b border-border/50">Base Price</div>
          <div className="py-2 border-b border-border/50">Display</div>
          <div className="py-2 border-b border-border/50">Processor</div>
          <div className="py-2 border-b border-border/50">Camera System</div>
          <div className="py-2 border-b border-border/50">Battery & Power</div>
          <div className="py-2 border-b border-border/50">OS & Software</div>
          <div className="py-2 border-b border-border/50">Dimensions</div>
          <div className="py-2 border-b border-border/50">Weight</div>
          <div className="py-2">Unique Features</div>
        </div>

        {/* Compared Phones Columns */}
        {comparedPhones.map((phone) => (
          <Card key={phone.id} className="bg-card/30 border border-border flex flex-col justify-between relative overflow-hidden">
            {/* Remove button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive z-10"
              onClick={() => {
                toggleCompare(phone.id)
                toast.success(`Removed ${phone.name} from comparison.`)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <CardHeader className="p-5 pb-4 space-y-4">
              {/* Image */}
              <div className="h-32 flex items-center justify-center bg-muted/10 rounded-lg border border-border/50 p-4">
                <img
                  src={Object.values(phone.images)[0]?.[0]}
                  alt={phone.name}
                  className="object-contain max-h-full max-w-full"
                />
              </div>

              {/* Title */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{phone.brand}</p>
                <CardTitle className="text-base font-bold line-clamp-1">{phone.name}</CardTitle>
                <div className="flex items-center gap-1 text-xs font-semibold">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span>{phone.rating}</span>
                  <span className="text-muted-foreground font-normal">({phone.reviewCount})</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 pt-0 space-y-6 flex-1 text-sm">
              {/* Mobile-only section headers */}
              
              {/* Price */}
              <div className="space-y-1 border-b border-border/50 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Base Price
                </span>
                <p className="text-lg font-bold">${phone.basePrice}</p>
              </div>

              {/* Display */}
              <div className="space-y-1 border-b border-border/50 pb-3 min-h-[60px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Display
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.display}</p>
              </div>

              {/* Processor */}
              <div className="space-y-1 border-b border-border/50 pb-3 min-h-[48px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Processor
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.processor}</p>
              </div>

              {/* Camera */}
              <div className="space-y-1 border-b border-border/50 pb-3 min-h-[60px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Camera System
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.camera}</p>
              </div>

              {/* Battery */}
              <div className="space-y-1 border-b border-border/50 pb-3 min-h-[48px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Battery & Power
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.battery}</p>
              </div>

              {/* OS */}
              <div className="space-y-1 border-b border-border/50 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  OS & Software
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.os}</p>
              </div>

              {/* Dimensions */}
              <div className="space-y-1 border-b border-border/50 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Dimensions
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.dimensions}</p>
              </div>

              {/* Weight */}
              <div className="space-y-1 border-b border-border/50 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Weight
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">{phone.specs.weight}</p>
              </div>

              {/* Unique Features */}
              <div className="space-y-2 min-h-[140px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:hidden block">
                  Unique Features
                </span>
                <ul className="space-y-1.5">
                  {phone.features.slice(0, 3).map((feat: string, index: number) => (
                    <li key={index} className="flex gap-1.5 text-xs text-muted-foreground leading-snug">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-4">
                <Button onClick={() => handleQuickAdd(phone)} className="w-full gap-2 h-10">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Quick Buy</span>
                </Button>
                <Link href={`/phones/${phone.id}`} className="block text-center mt-2.5">
                  <span className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors">
                    View Full Details
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Filler Columns if there are fewer than 3 phones compared */}
        {[...Array(3 - comparedPhones.length)].map((_, idx) => (
          <div
            key={idx}
            className="hidden md:flex flex-col items-center justify-center border border-dashed border-border rounded-xl p-6 text-center bg-card/5 min-h-[400px]"
          >
            <Smartphone className="h-10 w-10 text-muted-foreground/20 mb-3" />
            <p className="text-sm font-semibold text-muted-foreground">Add Another Device</p>
            <p className="text-xs text-muted-foreground/70 mt-1 mb-4">
              Compare specifications with another smartphone from our lineup.
            </p>
            <Link href="/phones">
              <Button size="sm" variant="outline" className="border-border">
                Add Device
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
