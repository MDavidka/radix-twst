import { useEffect, useState } from "react"
import { useStore } from "@/lib/store"

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Rehydrate Zustand store
    useStore.persist.rehydrate()
    setMounted(true)
  }, [])

  return mounted
}
