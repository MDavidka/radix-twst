"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useStore, CartItem } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Smartphone,
  ShoppingBag,
  Heart,
  GitCompare,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"

interface NavLink {
  label: string
  href: string
}

interface SectionNavbarProps {
  brand?: string
  links?: NavLink[]
}

export function SectionNavbar({
  brand = "PHONIX",
  links = [
    { label: "Catalog", href: "/phones" },
    { label: "Compare", href: "/compare" },
    { label: "About", href: "/about" },
  ],
}: SectionNavbarProps) {
  const pathname = usePathname()
  const mounted = useMounted()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // Zustand state
  const cart = useStore((state) => state.cart)
  const wishlist = useStore((state) => state.wishlist)
  const compareList = useStore((state) => state.compareList)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const addToCart = useStore((state) => state.addToCart)

  // Get full phone objects for wishlist
  const { phones } = require("@/lib/data")
  const wishlistedPhones = phones.filter((p: any) => wishlist.includes(p.id))

  // Cart math
  const cartItemsCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0
  const cartSubtotal = mounted
    ? cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0)
    : 0

  const handleQtyChange = (itemId: string, currentQty: number, delta: number) => {
    updateQuantity(itemId, currentQty + delta)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wider text-xl text-foreground">
            <Smartphone className="h-6 w-6 text-primary animate-pulse" />
            <span>{brand}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Compare Badge */}
          {mounted && compareList.length > 0 && (
            <Link href="/compare">
              <Button variant="ghost" size="icon" className="relative" title="Compare devices">
                <GitCompare className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                  {compareList.length}
                </Badge>
              </Button>
            </Link>
          )}

          {/* Wishlist Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" title="Wishlist">
                <Heart className="h-5 w-5" />
                {mounted && wishlist.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-background border-l border-border">
              <SheetHeader className="pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  <span>My Wishlist</span>
                </SheetTitle>
                <SheetDescription>
                  Your saved items. They will remain here until you remove them.
                </SheetDescription>
              </SheetHeader>

              {!mounted || wishlistedPhones.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center gap-4">
                  <Heart className="h-12 w-12 text-muted-foreground/30" />
                  <div>
                    <h3 className="font-semibold text-lg">Your wishlist is empty</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Browse our catalog and save your favorite devices.
                    </p>
                  </div>
                  <Link href="/phones" passHref>
                    <Button size="sm">Explore Phones</Button>
                  </Link>
                </div>
              ) : (
                <ScrollArea className="h-[calc(100vh-12rem)] py-4">
                  <div className="space-y-4">
                    {wishlistedPhones.map((phone: any) => (
                      <div key={phone.id} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card/50 border border-border">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 rounded-md bg-muted">
                            <AvatarImage
                              src={Object.values(phone.images)[0]?.[0] || ""}
                              alt={phone.name}
                              className="object-cover"
                            />
                            <AvatarFallback>{phone.brand[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{phone.name}</h4>
                            <p className="text-xs text-muted-foreground">{phone.brand}</p>
                            <p className="text-sm font-semibold mt-0.5">${phone.basePrice}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Link href={`/phones/${phone.id}`}>
                            <Button size="xs" variant="outline" className="text-xs h-8 px-2">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive self-end"
                            onClick={() => toggleWishlist(phone.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </SheetContent>
          </Sheet>

          {/* Shopping Cart Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" title="Shopping Cart">
                <ShoppingBag className="h-5 w-5" />
                {mounted && cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-background border-l border-border flex flex-col h-full">
              <SheetHeader className="pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span>Shopping Cart</span>
                </SheetTitle>
                <SheetDescription>
                  Review your items before checking out.
                </SheetDescription>
              </SheetHeader>

              {!mounted || cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
                  <div>
                    <h3 className="font-semibold text-lg">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Looks like you haven't added anything to your cart yet.
                    </p>
                  </div>
                  <Link href="/phones" passHref>
                    <Button size="sm">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <ScrollArea className="flex-1 -mx-6 px-6 py-4">
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-card/50 border border-border">
                          <Avatar className="h-16 w-16 rounded-md bg-muted">
                            <AvatarImage
                              src={item.phone.images[item.selectedColor]?.[0] || Object.values(item.phone.images)[0]?.[0]}
                              alt={item.phone.name}
                              className="object-cover"
                            />
                            <AvatarFallback>{item.phone.brand[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">{item.phone.name}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.selectedColor} • {item.selectedStorage}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 border border-border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-none"
                                  onClick={() => handleQtyChange(item.id, item.quantity, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-xs font-semibold w-5 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-none"
                                  onClick={() => handleQtyChange(item.id, item.quantity, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="text-sm font-semibold">
                                ${item.finalPrice * item.quantity}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive self-start"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="pt-4 border-t border-border space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${cartSubtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-emerald-500 font-medium">Free</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between text-base font-semibold">
                        <span>Estimated Total</span>
                        <span>${cartSubtotal}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <SheetTrigger asChild>
                        <Link href="/cart" className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Cart
                          </Button>
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link href="/checkout" className="flex-1">
                          <Button className="w-full">
                            Checkout
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </SheetTrigger>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block text-base font-medium py-2 transition-colors hover:text-foreground",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
