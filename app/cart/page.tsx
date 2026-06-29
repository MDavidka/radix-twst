"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Calculator,
} from "lucide-react"

export default function CartPage() {
  const mounted = useMounted()

  // Zustand state
  const cart = useStore((state) => state.cart)
  const tradeInDevice = useStore((state) => state.tradeInDevice)
  const tradeInValue = useStore((state) => state.tradeInValue)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const clearCart = useStore((state) => state.clearCart)
  const resetTradeIn = useStore((state) => state.resetTradeIn)

  // Promo code state
  const [promoCode, setPromoCode] = React.useState("")
  const [discountPercent, setDiscountPercent] = React.useState(0)
  const [appliedPromo, setAppliedPromo] = React.useState("")

  // Cart math
  const cartSubtotal = mounted
    ? cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0)
    : 0

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setDiscountPercent(10)
      setAppliedPromo("SAVE10")
      setPromoCode("")
      toast.success("10% promo code applied successfully!")
    } else {
      toast.error("Invalid promo code. Try 'SAVE10' for 10% off.")
    }
  }

  const handleRemovePromo = () => {
    setDiscountPercent(0)
    setAppliedPromo("")
    toast.info("Promo code removed.")
  }

  const discountAmount = Math.round(cartSubtotal * (discountPercent / 100))
  const finalTotal = Math.max(0, cartSubtotal - discountAmount - tradeInValue)

  const handleQtyChange = (itemId: string, currentQty: number, delta: number) => {
    updateQuantity(itemId, currentQty + delta)
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
          <p className="text-sm text-muted-foreground font-medium">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md space-y-6">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto border border-border">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="text-muted-foreground text-sm">
            Looks like you haven't added any smartphones to your shopping cart yet.
          </p>
        </div>
        <Link href="/phones">
          <Button className="w-full">
            Browse Catalog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-10">Shopping Cart</h1>

      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <span className="text-sm font-semibold">
              {cart.length} unique {cart.length === 1 ? "item" : "items"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearCart()
                toast.info("Shopping cart cleared.")
              }}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-card/20 border border-border items-start sm:items-center justify-between"
              >
                {/* Item Details */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-lg bg-muted border border-border">
                    <AvatarImage
                      src={item.phone.images[item.selectedColor]?.[0] || Object.values(item.phone.images)[0]?.[0]}
                      alt={item.phone.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{item.phone.brand[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">
                      <Link href={`/phones/${item.phone.id}`} className="hover:underline">
                        {item.phone.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Finish: <span className="font-medium text-foreground">{item.selectedColor}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Storage: <span className="font-medium text-foreground">{item.selectedStorage}</span>
                    </p>
                    <p className="text-xs font-semibold text-primary mt-1">${item.finalPrice} each</p>
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-border/50 sm:border-t-0 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2.5 border border-border rounded-lg bg-background">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => handleQtyChange(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => handleQtyChange(item.id, item.quantity, 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-base font-bold w-20 text-right">
                      ${item.finalPrice * item.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        removeFromCart(item.id)
                        toast.success(`Removed ${item.phone.name} from cart.`)
                      }}
                      className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back link */}
          <Link href="/phones" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground pt-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card border border-border p-6 shadow-xl sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg font-bold">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              {/* Pricing breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${cartSubtotal}</span>
                </div>

                {/* Promo discount */}
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      Discount ({discountPercent}%)
                    </span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                {/* Trade-in credit */}
                {tradeInValue > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium border border-dashed border-emerald-500/20 bg-emerald-500/5 p-2 rounded-lg">
                    <span className="flex flex-col gap-0.5 text-xs">
                      <span className="flex items-center gap-1 font-bold">
                        <Calculator className="h-3.5 w-3.5" />
                        Trade-In Credit
                      </span>
                      <span className="text-muted-foreground font-normal line-clamp-1">
                        {tradeInDevice}
                      </span>
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span>-${tradeInValue}</span>
                      <button
                        onClick={() => {
                          resetTradeIn()
                          toast.info("Trade-in credit removed.")
                        }}
                        className="text-[10px] text-muted-foreground hover:text-destructive underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-500 font-semibold">Free</span>
                </div>
              </div>

              <Separator />

              {/* Promo input form */}
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-muted/40 p-2.5 rounded-lg border border-border">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Tag className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Promo: {appliedPromo}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={handleRemovePromo}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <Input
                    placeholder="Promo code (SAVE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-background h-9 text-xs border-border"
                  />
                  <Button type="submit" size="sm" variant="outline" className="h-9 text-xs">
                    Apply
                  </Button>
                </form>
              )}

              <Separator />

              {/* Grand Total */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-semibold">Estimated Total</p>
                  <p className="text-xs text-muted-foreground">Tax included</p>
                </div>
                <p className="text-2xl font-bold">${finalTotal}</p>
              </div>
            </CardContent>

            <CardFooter className="p-0 pt-6">
              <Link href="/checkout" className="w-full">
                <Button size="lg" className="w-full h-11">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
