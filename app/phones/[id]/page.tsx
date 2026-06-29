"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { phones, Phone, ColorOption, StorageOption, Review } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner"
import {
  Star,
  Heart,
  GitCompare,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react"

interface PhoneDetailPageProps {
  params: {
    id: string
  }
}

export default function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const mounted = useMounted()
  const phone = phones.find((p) => p.id === params.id)

  // Zustand state
  const wishlist = useStore((state) => state.wishlist)
  const compareList = useStore((state) => state.compareList)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const toggleCompare = useStore((state) => state.toggleCompare)
  const addToCart = useStore((state) => state.addToCart)

  // Interactive configurations
  const [selectedColor, setSelectedColor] = React.useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = React.useState<StorageOption | null>(null)
  const [quantity, setQuantity] = React.useState(1)
  const [activeImageIndex, setActiveImageIndex] = React.useState(0)

  // Reviews simulated state
  const [localReviews, setLocalReviews] = React.useState<Review[]>([])
  const [reviewName, setReviewName] = React.useState("")
  const [reviewRating, setReviewRating] = React.useState(5)
  const [reviewComment, setReviewComment] = React.useState("")

  // Set default configurations on load
  React.useEffect(() => {
    if (phone) {
      setSelectedColor(phone.colors[0])
      setSelectedStorage(phone.storage[0])
      setLocalReviews(phone.reviews)
    }
  }, [phone])

  // Handle color change
  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color)
    setActiveImageIndex(0) // Reset image index on color change
  }

  if (!phone) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold">Device Not Found</h1>
        <p className="text-muted-foreground">We couldn't find the smartphone you're looking for.</p>
        <Link href="/phones">
          <Button size="sm">Back to Catalog</Button>
        </Link>
      </div>
    )
  }

  // Ensure options are loaded
  const currentColor = selectedColor || phone.colors[0]
  const currentStorage = selectedStorage || phone.storage[0]

  // Image list for active color
  const imageList = phone.images[currentColor.name] || Object.values(phone.images)[0]
  const activeImage = imageList[activeImageIndex] || imageList[0]

  // Pricing math
  const finalPrice = phone.basePrice + currentStorage.priceModifier
  const totalItemPrice = finalPrice * quantity

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const handleAddToCart = () => {
    addToCart(phone, currentColor.name, currentStorage.size, quantity, finalPrice)
    toast.success(`Added ${quantity}x ${phone.name} to cart!`, {
      description: `${currentColor.name} • ${currentStorage.size} • $${totalItemPrice}`,
    })
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please fill in your name and comment.")
      return
    }

    const newReview: Review = {
      id: Math.random().toString(),
      user: reviewName,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      comment: reviewComment,
    }

    setLocalReviews((prev) => [newReview, ...prev])
    setReviewName("")
    setReviewComment("")
    setReviewRating(5)
    toast.success("Review submitted! Thank you for your feedback.")
  }

  const isWishlisted = mounted && wishlist.includes(phone.id)
  const isComparing = mounted && compareList.includes(phone.id)

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Back to Catalog Link */}
      <Link href="/phones" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Catalog</span>
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="bg-card/40 border border-border p-8 flex items-center justify-center relative aspect-square rounded-2xl overflow-hidden group">
            <img
              src={activeImage}
              alt={`${phone.name} in ${currentColor.name}`}
              className="object-contain max-h-[85%] max-w-[85%] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border border-border">
                {currentColor.name}
              </Badge>
            </div>
          </Card>

          {/* Thumbnails */}
          {imageList.length > 1 && (
            <div className="flex gap-3 justify-center">
              {imageList.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-20 w-20 rounded-lg p-2 border bg-card/50 flex items-center justify-center overflow-hidden transition-all ${
                    activeImageIndex === index
                      ? "border-primary scale-105 ring-1 ring-primary/20"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${phone.name} view ${index + 1}`}
                    className="object-contain max-h-full max-w-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Configuration & Purchase Details */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="outline" className="border-border text-xs font-semibold uppercase tracking-wider">
                {phone.brand}
              </Badge>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{phone.rating}</span>
                <span className="text-muted-foreground font-normal">
                  ({localReviews.length} customer reviews)
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {phone.name}
            </h1>

            <p className="text-2xl font-bold text-foreground">
              ${finalPrice}
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {phone.longDescription}
            </p>
          </div>

          <Separator />

          {/* Color Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Finish
            </h3>
            <div className="flex flex-wrap gap-3">
              {phone.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color)}
                  className={`group relative flex items-center justify-center h-10 w-10 rounded-full border transition-all ${
                    currentColor.name === color.name
                      ? "border-primary scale-110 ring-2 ring-primary/20"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  title={color.name}
                >
                  <span className={`h-7 w-7 rounded-full ${color.bgClass} block`} />
                  {currentColor.name === color.name && (
                    <Check className="h-3.5 w-3.5 text-background absolute" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">
              Selected: <span className="font-semibold text-foreground">{currentColor.name}</span>
            </p>
          </div>

          {/* Storage Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Storage
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {phone.storage.map((storeOption) => (
                <button
                  key={storeOption.size}
                  onClick={() => setSelectedStorage(storeOption)}
                  className={`py-3 px-4 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                    currentStorage.size === storeOption.size
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-muted/10 text-muted-foreground hover:bg-muted/20 hover:text-foreground"
                  }`}
                >
                  <span className="text-base font-bold text-foreground">
                    {storeOption.size}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {storeOption.priceModifier === 0
                      ? "Base Price"
                      : `+$${storeOption.priceModifier}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Quantity & Actions
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Quantity Changer */}
              <div className="flex items-center justify-between border border-border rounded-xl h-11 px-3 bg-muted/10 sm:w-[130px]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => handleQtyChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => handleQtyChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button onClick={handleAddToCart} size="lg" className="flex-1 h-11 gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart — ${totalItemPrice}</span>
              </Button>
            </div>

            {/* Wishlist & Compare toggles */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2 h-10 border-border"
                onClick={() => {
                  toggleWishlist(phone.id)
                  toast.success(
                    isWishlisted ? "Removed from wishlist." : "Saved to wishlist!"
                  )
                }}
              >
                <Heart className={cn("h-4 w-4", isWishlisted ? "text-destructive fill-destructive" : "")} />
                <span>{isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2 h-10 border-border"
                onClick={() => {
                  toggleCompare(phone.id)
                  toast.success(
                    isComparing ? "Removed from comparison." : "Added to comparison!"
                  )
                }}
              >
                <GitCompare className={cn("h-4 w-4", isComparing ? "text-primary" : "")} />
                <span>{isComparing ? "Comparing" : "Compare Device"}</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Small Trust Signals */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1.5">
              <Truck className="h-5 w-5 text-muted-foreground mx-auto" />
              <p className="text-xs font-semibold">Free Express</p>
              <p className="text-[10px] text-muted-foreground">1-3 Business Days</p>
            </div>
            <div className="space-y-1.5">
              <ShieldCheck className="h-5 w-5 text-muted-foreground mx-auto" />
              <p className="text-xs font-semibold">2-Year Warranty</p>
              <p className="text-[10px] text-muted-foreground">Complimentary Coverage</p>
            </div>
            <div className="space-y-1.5">
              <RotateCcw className="h-5 w-5 text-muted-foreground mx-auto" />
              <p className="text-xs font-semibold">30-Day Returns</p>
              <p className="text-[10px] text-muted-foreground">Risk-Free Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Features Accordion */}
      <div className="mt-20 grid gap-12 lg:grid-cols-12">
        {/* Specs Accordion */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Technical Specifications</h2>
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="display" className="border border-border rounded-xl px-4 bg-card/20">
              <AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">Display</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {phone.specs.display}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="processor" className="border border-border rounded-xl px-4 bg-card/20">
              <AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">Processor</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {phone.specs.processor}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="camera" className="border border-border rounded-xl px-4 bg-card/20">
              <AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">Camera System</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {phone.specs.camera}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="battery" className="border border-border rounded-xl px-4 bg-card/20">
              <AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">Battery & Charging</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {phone.specs.battery}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dimensions" className="border border-border rounded-xl px-4 bg-card/20">
              <AccordionTrigger className="font-semibold text-sm hover:no-underline py-4">Dimensions & Weight</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                <div className="space-y-1">
                  <p><span className="font-semibold text-foreground">Dimensions:</span> {phone.specs.dimensions}</p>
                  <p><span className="font-semibold text-foreground">Weight:</span> {phone.specs.weight}</p>
                  <p><span className="font-semibold text-foreground">Operating System:</span> {phone.specs.os}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Highlighted Features */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Key Features</h2>
          <Card className="bg-card/30 border border-border p-6 rounded-2xl">
            <ul className="space-y-4">
              {phone.features.map((feat, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-foreground font-medium leading-normal">{feat}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-20 border-t border-border pt-16 grid gap-12 lg:grid-cols-12">
        {/* Reviews List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
            <Badge variant="secondary" className="border border-border">
              {localReviews.length} Reviews
            </Badge>
          </div>

          {localReviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review this device!</p>
          ) : (
            <div className="space-y-4">
              {localReviews.map((rev) => (
                <Card key={rev.id} className="bg-card/20 border border-border p-5 rounded-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={rev.avatar} alt={rev.user} />
                        <AvatarFallback>{rev.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-bold">{rev.user}</h4>
                        <p className="text-xs text-muted-foreground">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="lg:col-span-5">
          <Card className="bg-card border border-border p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Write a Review</span>
            </h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              {/* Rating */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Your Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewRating(stars)}
                      className="text-muted-foreground hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          stars <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Your Name
                </label>
                <Input
                  placeholder="e.g. John Doe"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="bg-background border-border h-10"
                  required
                />
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Your Feedback
                </label>
                <Textarea
                  placeholder="Share your experience with this smartphone..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="bg-background border-border min-h-[100px] resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-10 mt-2">
                Submit Review
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
