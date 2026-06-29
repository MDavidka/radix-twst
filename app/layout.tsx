import type { Metadata } from "next"
import "@/app/globals.css"
import { SectionNavbar } from "@/components/sections/navbar"
import { SectionFooter } from "@/components/sections/footer"
import { ChatWidget } from "@/components/sections/chat-widget"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "PHONIX — Premium Mobile Store",
  description: "Experience next-generation titanium smartphones, high-performance processors, and advanced mobile AI solutions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col font-sans">
        <SectionNavbar />
        <main className="flex-1">
          {children}
        </main>
        <SectionFooter />
        <ChatWidget />
        <Toaster position="bottom-left" closeButton theme="dark" />
      </body>
    </html>
  )
}
