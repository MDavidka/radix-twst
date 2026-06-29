import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Phone } from "./data"

export interface CartItem {
  id: string // Unique identifier combined: phoneId-colorName-storageSize
  phone: Phone
  quantity: number
  selectedColor: string
  selectedStorage: string
  finalPrice: number // basePrice + storageModifier
}

interface StoreState {
  cart: CartItem[]
  wishlist: string[] // Phone IDs
  compareList: string[] // Phone IDs (max 3)
  
  // Trade-in state
  tradeInDevice: string
  tradeInCondition: string
  tradeInValue: number

  // Cart actions
  addToCart: (phone: Phone, color: string, storage: string, quantity: number, finalPrice: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void

  // Wishlist actions
  toggleWishlist: (phoneId: string) => void
  
  // Compare actions
  toggleCompare: (phoneId: string) => void
  clearCompare: () => void

  // Trade-in actions
  setTradeIn: (device: string, condition: string, value: number) => void
  resetTradeIn: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      compareList: [],
      tradeInDevice: "",
      tradeInCondition: "",
      tradeInValue: 0,

      addToCart: (phone, color, storage, quantity, finalPrice) =>
        set((state) => {
          const itemId = `${phone.id}-${color.replace(/\s+/g, "-")}-${storage}`
          const existingIndex = state.cart.findIndex((item) => item.id === itemId)

          if (existingIndex > -1) {
            const updatedCart = [...state.cart]
            updatedCart[existingIndex].quantity += quantity
            return { cart: updatedCart }
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  id: itemId,
                  phone,
                  quantity,
                  selectedColor: color,
                  selectedStorage: storage,
                  finalPrice,
                },
              ],
            }
          }
        }),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (phoneId) =>
        set((state) => {
          const isWishlisted = state.wishlist.includes(phoneId)
          return {
            wishlist: isWishlisted
              ? state.wishlist.filter((id) => id !== phoneId)
              : [...state.wishlist, phoneId],
          }
        }),

      toggleCompare: (phoneId) =>
        set((state) => {
          const isComparing = state.compareList.includes(phoneId)
          if (isComparing) {
            return { compareList: state.compareList.filter((id) => id !== phoneId) }
          }
          if (state.compareList.length >= 3) {
            // Limit to 3 items
            return { compareList: [...state.compareList.slice(1), phoneId] }
          }
          return { compareList: [...state.compareList, phoneId] }
        }),

      clearCompare: () => set({ compareList: [] }),

      setTradeIn: (device, condition, value) =>
        set({ tradeInDevice: device, tradeInCondition: condition, tradeInValue: value }),

      resetTradeIn: () => set({ tradeInDevice: "", tradeInCondition: "", tradeInValue: 0 }),
    }),
    {
      name: "phonix-store-storage",
      skipHydration: true, // Let components manually hydrate or handle SSR safety
    }
  )
)
