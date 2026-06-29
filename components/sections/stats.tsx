import { Card, CardContent } from "@/components/ui/card"

export interface Stat {
  value: string
  label: string
}

interface SectionStatsProps {
  stats?: Stat[]
}

export function SectionStats({
  stats = [
    { value: "150K+", label: "Happy Customers Worldwide" },
    { value: "4.9★", label: "Average Customer Rating" },
    { value: "100%", label: "Carbon-Neutral Shipping" },
    { value: "24/7", label: "Expert Support Coverage" },
  ],
}: SectionStatsProps) {
  return (
    <section className="py-16 border-b border-border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/40 border-none shadow-none text-center">
              <CardContent className="p-6">
                <p className="text-4xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
