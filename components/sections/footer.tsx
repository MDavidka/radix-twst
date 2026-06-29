import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Smartphone, Github, Twitter, Instagram, Mail } from "lucide-react"

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SectionFooterProps {
  brand?: string
  columns?: FooterColumn[]
}

export function SectionFooter({
  brand = "PHONIX",
  columns = [
    {
      title: "Shop",
      links: [
        { label: "All Phones", href: "/phones" },
        { label: "Apple Store", href: "/phones?brand=Apple" },
        { label: "Samsung Store", href: "/phones?brand=Samsung" },
        { label: "Google Store", href: "/phones?brand=Google" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Sustainability", href: "/about#sustainability" },
        { label: "Retail Stores", href: "/about#retail" },
        { label: "Careers", href: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/about#contact" },
        { label: "FAQs", href: "/" },
        { label: "Warranty & Returns", href: "/" },
        { label: "Trade-In Program", href: "/" },
      ],
    },
  ],
}: SectionFooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-xl text-foreground">
              <Smartphone className="h-6 w-6 text-primary" />
              <span>{brand}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              We design and curate the ultimate mobile store experience, featuring premium titanium structures, high-performance processors, and advanced imaging platforms.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Github className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><Mail className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 border-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {brand} Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
