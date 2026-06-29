"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

const SelectContext = React.createContext<{
  selectedValue: string
  setSelectedValue: (val: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}>({
  selectedValue: "",
  setSelectedValue: () => {},
  open: false,
  setOpen: () => {},
})

export function Select({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode
  value: string
  onValueChange: (val: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <SelectContext.Provider
      value={{
        selectedValue: value,
        setSelectedValue: onValueChange,
        open,
        setOpen,
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, setOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { selectedValue } = React.useContext(SelectContext)
  return <span>{selectedValue || placeholder}</span>
}

export function SelectContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, setOpen } = React.useContext(SelectContext)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-50 slide-in-from-top-1",
          className
        )}
      >
        <div className="p-1">{children}</div>
      </div>
    </>
  )
}

export function SelectItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  const { selectedValue, setSelectedValue, setOpen } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  const handleSelect = () => {
    setSelectedValue(value)
    setOpen(false)
  }

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-left",
        className
      )}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      <span>{children}</span>
    </button>
  )
}
