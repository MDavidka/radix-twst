"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const AccordionContext = React.createContext<{
  activeValue: string | null
  setActiveValue: (value: string | null) => void
}>({
  activeValue: null,
  setActiveValue: () => {},
})

export function Accordion({
  children,
  className,
  type = "single",
  collapsible = true,
}: {
  children: React.ReactNode
  className?: string
  type?: "single"
  collapsible?: boolean
}) {
  const [activeValue, setActiveValue] = React.useState<string | null>(null)

  return (
    <AccordionContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  return (
    <div className={cn("border-b border-border", className)} data-value={value}>
      {children}
    </div>
  )
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { activeValue, setActiveValue } = React.useContext(AccordionContext)
  
  // Find current item's value by looking at parent dataset
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [itemValue, setItemValue] = React.useState<string>("")

  React.useEffect(() => {
    const parent = triggerRef.current?.closest("[data-value]")
    if (parent) {
      setItemValue(parent.getAttribute("data-value") || "")
    }
  }, [])

  const isOpen = activeValue === itemValue

  const handleToggle = () => {
    setActiveValue(isOpen ? null : itemValue)
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleToggle}
      className={cn(
        "flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </button>
  )
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { activeValue } = React.useContext(AccordionContext)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [itemValue, setItemValue] = React.useState<string>("")

  React.useEffect(() => {
    const parent = contentRef.current?.closest("[data-value]")
    if (parent) {
      setItemValue(parent.getAttribute("data-value") || "")
    }
  }, [])

  const isOpen = activeValue === itemValue

  if (!isOpen) return null

  return (
    <div
      ref={contentRef}
      className={cn(
        "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}
