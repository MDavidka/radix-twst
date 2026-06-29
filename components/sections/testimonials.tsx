import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export interface Testimonial {
  name: string
  role: string
  avatarUrl: string
  rating: number
  comment: string
  verifiedPurchase?: boolean
}

interface SectionTestimonialsProps {
  heading?: string
  subheading?: string
  testimonials?: Testimonial[]
}

export function SectionTestimonials({
  heading = "Loved by Tech Enthusiasts",
  subheading = "Read real feedback from customers who upgraded to a smarter mobile life.",
  testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Digital Designer",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      rating: 5,
      comment: "Ordering was incredibly smooth, and the phone arrived in perfect condition. The trade-in program gave me $450 for my old phone instantly!",
      verifiedPurchase: true,
    },
    {
      name: "Marcus Aurelius",
      role: "Software Architect",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      rating: 5,
      comment: "Phonix is easily the best marketplace to buy premium devices. Their specs comparison tool helped me choose the OnePlus 12, and I couldn't be happier.",
      verifiedPurchase: true,
    },
    {
      name: "Elena Rostova",
      role: "Content Creator",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      rating: 5,
      comment: "Their customer support is stellar. I had a question about my shipping address, and they resolved it in less than 2 minutes on the live chat widget.",
      verifiedPurchase: true,
    },
  ],
}: SectionTestimonialsProps) {
  return (
    <section className="py-20 border-b border-border bg-background">
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

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50 border-border flex flex-col justify-between">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
              </CardHeader>
              <CardContent className="pt-0 flex items-center justify-between border-t border-border/50 mt-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                {testimonial.verifiedPurchase && (
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold">
                    Verified
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
