"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  className?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
}

export function Slider({
  className,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [0],
  onValueChange,
}: SliderProps) {
  const [val, setVal] = React.useState(defaultValue[0])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setVal(value)
    onValueChange?.([value])
  }

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={handleChange}
        className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
      />
    </div>
  )
}
