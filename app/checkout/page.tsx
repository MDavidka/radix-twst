"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  Loader2,
  ShieldCheck,
} from "lucide-react"

export default function CheckoutPage() {
  const mounted = useMounted()
  const router = useRouter()

  // Zustand state
  const cart = useStore((state) => state.cart)
  const tradeInDevice = useStore((state) => state.tradeInDevice)
  const tradeInValue = useStore((state) => state.tradeInValue)
  const clearCart = useStore((state) => state.clearCart)

  // Checkout Form State
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [zip, setZip] = React.useState("")
  
  const [cardNumber, setCardNumber] = React.useState("")
  const [cardExpiry, setCardExpiry] = React.useState("")
  const [cardCvv, setCardCvv] = React.useState("")

  // Processing state
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false)
  const [orderNumber, setOrderNumber] = React.useState("")

  // Math
  const cartSubtotal = mounted
    ? cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0)
    : 0
  const finalTotal = Math.max(0, cartSubtotal - tradeInValue)

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic Validation
    if (!name || !email || !address || !city || !zip || !cardNumber || !cardExpiry || !cardCvv) {
      toast.error("Please fill in all shipping and payment details.")
      return
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }

    if (cardNumber.replace(/\s+/g, "").length < 16) {
      toast.error("Please enter a valid 16-digit card number.")
      return
    }

    // Start Simulation
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      const randOrderNum = "PHX-" + Math.floor(100000 + Math.random() * 90000)
      setOrderNumber(randOrderNum)
      setIsSuccessOpen(true)
      toast.success("Order placed successfully!")
    }, 2000)
  }

  const handleFinishSuccess = () => {
    setIsSuccessOpen(false)
    clearCart()
    router.push("/")
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
          <p className="text-sm text-muted-foreground font-medium">Preparing secure checkout...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0 && !isSuccessOpen) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md space-y-6">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto border border-border">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="text-muted-foreground text-sm">
            You cannot checkout with an empty cart. Browse our catalog to select your next device.
          </p>
        </div>
        <Link href="/phones">
          <Button className="w-full">
            Browse Devices
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Back link */}
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Cart</span>
      </Link>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-10">Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Shipping & Payment Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Shipping Address */}
          <Card className="bg-card/20 border border-border p-6 rounded-2xl">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>1. Shipping Details</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                Enter your delivery address. All phone orders receive free express shipping.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background border-border h-10"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Street Address</label>
                <Input
                  placeholder="123 Titanium Way, Suite 100"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-background border-border h-10"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
                  <Input
                    placeholder="Cupertino"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-background border-border h-10"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">ZIP / Postal Code</label>
                  <Input
                    placeholder="95014"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="bg-background border-border h-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="bg-card/20 border border-border p-6 rounded-2xl">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>2. Payment Details</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                All transactions are encrypted and 100% secure.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="bg-background border-border h-10 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expiration Date</label>
                  <Input
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="bg-background border-border h-10"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CVV</label>
                  <Input
                    type="password"
                    placeholder="123"
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="bg-background border-border h-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card border border-border p-6 shadow-xl sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-lg font-bold">Review Order</CardTitle>
            </CardHeader>

            {/* Cart summary list */}
            <CardContent className="p-0 space-y-4">
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-9 w-9 rounded bg-muted border border-border">
                        <AvatarImage
                          src={item.phone.images[item.selectedColor]?.[0] || Object.values(item.phone.images)[0]?.[0]}
                          alt={item.phone.name}
                        />
                        <AvatarFallback>{item.phone.brand[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-xs truncate max-w-[140px]">{item.phone.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          Qty: {item.quantity} • {item.selectedStorage}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-xs">${item.finalPrice * item.quantity}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Math totals */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${cartSubtotal}</span>
                </div>

                {tradeInValue > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Trade-In Credit</span>
                    <span>-${tradeInValue}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-500 font-semibold">Free</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-semibold">Total Amount</p>
                  <p className="text-xs text-muted-foreground">All taxes included</p>
                </div>
                <p className="text-2xl font-bold">${finalTotal}</p>
              </div>
            </CardContent>

            <CardFooter className="p-0 pt-6 flex flex-col gap-3">
              <Button type="submit" size="lg" className="w-full h-11" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <span>Place Order — ${finalTotal}</span>
                )}
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Secure 256-bit SSL checkout</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>

      {/* Success Dialog Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md bg-card border border-border text-center p-8 rounded-2xl">
          <DialogHeader className="flex flex-col items-center justify-center gap-4">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Thank you for shopping with Phonix. Your titanium smartphone is being prepared.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/30 border border-border rounded-xl p-4 my-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-bold text-foreground">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-semibold text-emerald-400">1 - 3 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="font-bold text-foreground">${finalTotal}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            A confirmation email has been sent to <span className="font-semibold text-foreground">{email}</span> with tracking information.
          </p>

          <Button onClick={handleFinishSuccess} className="w-full h-10">
            Return to Store Home
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
