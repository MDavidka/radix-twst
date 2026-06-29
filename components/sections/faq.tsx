import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FaqItem {
  question: string
  answer: string
}

interface SectionFaqProps {
  heading?: string
  subheading?: string
  faqs?: FaqItem[]
}

export function SectionFaq({
  heading = "Frequently Asked Questions",
  subheading = "Got questions? We've got answers about shipping, warranty, and trade-in.",
  faqs = [
    {
      question: "How does the instant trade-in program work?",
      answer: "Select your old phone model and condition on our trade-in page or during checkout. We'll give you an instant valuation. If you accept, we send you a prepaid shipping box. You send us your old phone, and we apply the credit directly to your purchase or refund it to your payment method once verified.",
    },
    {
      question: "What is your return and warranty policy?",
      answer: "We offer a 30-day risk-free return policy on all devices. If you aren't completely satisfied, return it for a full refund. Additionally, every phone sold on Phonix comes with a complimentary 2-year hardware warranty covering any manufacturing defects.",
    },
    {
      question: "Is shipping free, and how long does it take?",
      answer: "Yes, we offer free express shipping on all orders. Orders are typically processed within 24 hours, and delivery takes 1 to 3 business days depending on your location. Tracking information will be emailed as soon as the package ships.",
    },
    {
      question: "Are these phones unlocked and globally compatible?",
      answer: "Absolutely. Every smartphone sold on Phonix is 100% factory unlocked. They support both GSM and CDMA networks and are compatible with all major carriers globally (including 5G bands).",
    },
  ],
}: SectionFaqProps) {
  return (
    <section className="py-20 border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {subheading}
          </p>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg px-4 bg-card/30 hover:bg-card/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-base py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
