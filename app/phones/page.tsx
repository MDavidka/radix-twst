"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { useMounted } from "@/hooks/useMounted"
import { phones, Phone } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Search, Heart, GitCompare, Star, ShoppingCart, SlidersHorizontal, RotateCcw } from "lucide-react"

function CatalogContent() {
  const mounted = useMounted()
  const searchParams = useSearchParams()
  const initialBrand = searchParams.get("brand") || ""

  // Store state
  const wishlist = useStore((state) => state.wishlist)
  const compareList = useStore((state) => state.compareList)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const toggleCompare = useStore((state) => state.toggleCompare)
  const addToCart = useStore((state) => state.addToCart)

  // Filters State
  const [search, setSearch] = React.useState("")
  const [selectedBrand, setSelectedBrand] = React.useState(initialBrand)
  const [maxPrice, setMaxPrice] = React.useState(1500)
  const [sortBy, setSortBy] = React.useState("featured")

  // Reset filters
  const handleReset = () => {
    setSearch("")
    setSelectedBrand("")
    setMaxPrice(1500)
    setSortBy("featured")
    toast.success("Filters have been reset.")
  }

  // Brand list with counts
  const brands = React.useMemo(() => {
    const list = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"]
    return list.map((b) => ({
      name: b,
      count: phones.filter((p) => p.brand === b).length,
    }))
  }, [])

  // Filtered and Sorted list
  const filteredPhones = React.useMemo(() => {
    return phones
      .filter((phone) => {
        const matchesSearch =
          phone.name.toLowerCase().includes(search.toLowerCase()) ||
          phone.brand.toLowerCase().includes(search.toLowerCase()) ||
          phone.description.toLowerCase().includes(search.toLowerCase())
        
        const matchesBrand = selectedBrand === "" || phone.brand === selectedBrand
        const matchesPrice = phone.basePrice <= maxPrice

        return matchesSearch && matchesBrand && matchesPrice
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.basePrice - b.basePrice
        if (sortBy === "price-desc") return b.basePrice - a.basePrice
        if (sortBy === "rating") return b.rating - a.rating
        // default: featured first, then new
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      })
  }, [search, selectedBrand, maxPrice, sortBy])

  const handleQuickAdd = (phone: Phone, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const defaultColor = phone.colors[0].name
    const defaultStorage = phone.storage[0].size
    const price = phone.basePrice

    addToCart(phone, defaultColor, defaultStorage, 1, price)
    toast.success(`Added ${phone.name} to cart!`, {
      description: `${defaultColor} • ${defaultStorage} • $${price}`,
    })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      {/* Page Title */}
      <div className="space-y-3 mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Devices</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          Browse our curated line-up of premium unlocked smartphones. Fully protected by our 2-year warranty.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Filters Sidebar */}
        <aside className="lg:col-span-3 space-y-6 border border-border bg-card/20 p-5 rounded-xl sticky top-24">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="mr-1.5 h-3 w-3" />
              Reset
            </Button>
          </div>

          <Separator />

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Model, specs, brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background h-10 border-border"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Brand
            </label>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedBrand("")}
                className={`w-full text-left py-1.5 px-2.5 rounded-md text-sm font-medium flex items-center justify-between transition-colors ${
                  selectedBrand === ""
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                }`}
              >
                <span>All Brands</span>
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-border">
                  {phones.length}
                </Badge>
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-md text-sm font-medium flex items-center justify-between transition-colors ${
                    selectedBrand === brand.name
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  }`}
                >
                  <span>{brand.name}</span>
                  <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-border">
                    {brand.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3.5">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span>Max Price</span>
              <span className="text-foreground font-semibold">${maxPrice}</span>
            </div>
            <Slider
              defaultValue={[maxPrice]}
              max={1500}
              min={700}
              step={50}
              onValueChange={(val) => setMaxPrice(val[0])}
              className="py-1"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>$700</span>
              <span>$1,500</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Catalog Grid */}
        <main className="lg:col-span-9 space-y-6">
          {/* Sorting and Results count Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border border-border bg-card/10 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPhones.length}</span> of{" "}
              {phones.length} devices
            </p>
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Sort By
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background border-border h-9 text-sm">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border">
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Empty State */}
          {filteredPhones.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border border-dashed border-border rounded-xl">
              <SlidersHorizontal className="h-12 w-12 text-muted-foreground/30 animate-bounce" />
              <div>
                <h3 className="font-semibold text-lg">No devices found</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  We couldn't find any phones matching your search criteria. Try resetting your filters.
                </p>
              </div>
              <Button onClick={handleReset} size="sm">
                Reset Filters
              </Button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhones.map((phone) => {
              const isWishlisted = mounted && wishlist.includes(phone.id)
              const isComparing = mounted && compareList.includes(phone.id)

              return (
                <Card key={phone.id} className="group bg-card/40 border border-border flex flex-col justify-between overflow-hidden relative hover:border-primary/40 transition-all duration-300">
                  {/* Absolute badging */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {phone.isNew && (
                      <Badge className="bg-primary text-primary-foreground text-[10px] tracking-wider font-bold">
                        NEW
                      </Badge>
                    )}
                    {phone.featured && (
                      <Badge variant="secondary" className="text-[10px] tracking-wider font-bold border border-border">
                        HOT
                      </Badge>
                    )}
                  </div>

                  {/* Absolute interaction buttons */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(phone.id)
                        toast.success(
                          isWishlisted ? "Removed from wishlist." : "Saved to wishlist!"
                        )
                      }}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4 transition-colors",
                          isWishlisted ? "text-destructive fill-destructive" : "text-muted-foreground"
                        )}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleCompare(phone.id)
                        toast.success(
                          isComparing ? "Removed from comparison." : "Added to comparison!"
                        )
                      }}
                    >
                      <GitCompare
                        className={cn(
                          "h-4 w-4 transition-colors",
                          isComparing ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </div>

                  {/* Product Image Link */}
                  <Link href={`/phones/${phone.id}`} className="block p-6 bg-muted/10 border-b border-border/50 relative overflow-hidden">
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <img
                        src={Object.values(phone.images)[0]?.[0]}
                        alt={phone.name}
                        className="object-contain max-h-[140px] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <CardHeader className="p-4 pb-1">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{phone.brand}</span>
                      <span className="flex items-center gap-1 font-semibold text-foreground">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        {phone.rating}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold mt-1 line-clamp-1">
                      <Link href={`/phones/${phone.id}`} className="hover:underline">
                        {phone.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1 min-h-[32px]">
                      {phone.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-2 pb-3">
                    {/* Swatches */}
                    <div className="flex gap-1.5">
                      {phone.colors.map((c) => (
                        <span
                          key={c.name}
                          className={cn("h-3 w-3 rounded-full border border-background", c.bgClass)}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </CardContent>

                  <Separator className="border-border/50" />

                  {/* Card Footer actions */}
                  <CardFooter className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting at</p>
                      <p className="text-lg font-bold">${phone.basePrice}</p>
                    </div>
                    <Button onClick={(e) => handleQuickAdd(phone, e)} size="sm" className="gap-1.5 h-9">
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function PhonesPage() {
  return (
    <React.Suspense
      fallback={
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <span className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
            <p className="text-sm text-muted-foreground font-medium">Loading catalog...</p>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </React.Suspense>
  )
}
