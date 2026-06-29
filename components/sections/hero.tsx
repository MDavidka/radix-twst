import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

interface SectionHeroProps {
  badge?: string
  title?: string
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageUrl?: string
}

export function SectionHero({
  badge = "The Future in Titanium",
  title = "Next-Generation Mobile Power",
  description = "Experience the absolute pinnacle of performance, design, and intelligence. Forged in aerospace-grade titanium and powered by the latest neural processors.",
  primaryCta = { label: "Explore Store", href: "/phones" },
  secondaryCta = { label: "Learn About Us", href: "/about" },
  imageUrl = "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80",
}: SectionHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 border-b border-border bg-background">
      {/* Background glow effects - keeping it clean and subtle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="flex flex-col items-start gap-6 text-left max-w-xl">
            <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 font-medium border border-border">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {badge}
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
              <Link href={primaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={secondaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  {secondaryCta.label}
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Preview Container */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
              <img
                src={imageUrl}
                alt="Premium Smartphone Preview"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-border bg-background/80 backdrop-blur-md">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Featured Model</p>
                <h3 className="text-base font-bold text-foreground mt-0.5">iPhone 15 Pro Max</h3>
                <p className="text-sm font-semibold text-primary mt-1">Starting at $1,199</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
