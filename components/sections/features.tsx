import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface SectionFeaturesProps {
  heading?: string
  subheading?: string
  features: Feature[]
}

export function SectionFeatures({
  heading = "Why Shop With Phonix?",
  subheading = "We deliver a premium buying experience from checkout to unboxing.",
  features,
}: SectionFeaturesProps) {
  return (
    <section id="features" className="py-20 border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {subheading}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center border border-border mb-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
