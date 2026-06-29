export interface ColorOption {
  name: string
  hex: string
  bgClass: string
}

export interface StorageOption {
  size: string
  priceModifier: number
}

export interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
}

export interface Phone {
  id: string
  name: string
  brand: string
  description: string
  longDescription: string
  basePrice: number
  rating: number
  reviewCount: number
  images: { [colorName: string]: string[] } // Maps color name to array of image URLs
  colors: ColorOption[]
  storage: StorageOption[]
  specs: {
    display: string
    processor: string
    camera: string
    battery: string
    os: string
    weight: string
    dimensions: string
  }
  features: string[]
  reviews: Review[]
  featured?: boolean
  isNew?: boolean
}

export const phones: Phone[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip.",
    longDescription: "The iPhone 15 Pro Max is forged in titanium and features the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Its aerospace-grade titanium design is both exceptionally strong and remarkably light, with a stunning textured matte-glass back.",
    basePrice: 1199,
    rating: 4.9,
    reviewCount: 142,
    colors: [
      { name: "Natural Titanium", hex: "#8A8782", bgClass: "bg-[#8A8782]" },
      { name: "Blue Titanium", hex: "#2F4452", bgClass: "bg-[#2F4452]" },
      { name: "White Titanium", hex: "#F2F1ED", bgClass: "bg-[#F2F1ED]" },
      { name: "Black Titanium", hex: "#3C3D3A", bgClass: "bg-[#3C3D3A]" }
    ],
    storage: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 200 },
      { size: "1TB", priceModifier: 400 }
    ],
    images: {
      "Natural Titanium": [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1695048133031-b8417f300c59?auto=format&fit=crop&w=600&q=80"
      ],
      "Blue Titanium": [
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
      ],
      "White Titanium": [
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80"
      ],
      "Black Titanium": [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
      ]
    },
    specs: {
      display: "6.7-inch Super Retina XDR OLED, 120Hz ProMotion, Always-On display",
      processor: "A17 Pro chip with 6-core GPU",
      camera: "Pro camera system (48MP Main, 12MP Ultra Wide, 12MP 5x Telephoto)",
      battery: "Up to 29 hours video playback, MagSafe wireless charging up to 15W",
      os: "iOS 17 (Upgradable to iOS 18)",
      weight: "221 grams",
      dimensions: "159.9 x 76.7 x 8.25 mm"
    },
    features: [
      "Titanium design with Ceramic Shield front",
      "Action button for customizable shortcuts",
      "USB-C connector with USB 3 speeds (up to 10Gb/s)",
      "Roadside Assistance via satellite and Crash Detection"
    ],
    reviews: [
      { id: "1", user: "Alexander V.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", rating: 5, date: "2024-02-12", comment: "The titanium finish feels amazing in the hand. The camera zoom is incredible!" },
      { id: "2", user: "Marcus K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", rating: 5, date: "2024-02-28", comment: "A17 Pro handles console-level gaming with ease. Battery life easily lasts a day and a half." }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    description: "Welcome to the era of mobile AI, built with a durable titanium exterior.",
    longDescription: "The Galaxy S24 Ultra is the ultimate form of Galaxy Ultra, with a new titanium exterior and a 6.8-inch flat screen. It is an absolute powerhouse featuring Galaxy AI, which unlocks whole new levels of creativity, productivity, and possibility.",
    basePrice: 1299,
    rating: 4.8,
    reviewCount: 118,
    colors: [
      { name: "Titanium Gray", hex: "#7E7F81", bgClass: "bg-[#7E7F81]" },
      { name: "Titanium Yellow", hex: "#EAD6B5", bgClass: "bg-[#EAD6B5]" },
      { name: "Titanium Violet", hex: "#4C4556", bgClass: "bg-[#4C4556]" },
      { name: "Titanium Black", hex: "#2E2F31", bgClass: "bg-[#2E2F31]" }
    ],
    storage: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 120 },
      { size: "1TB", priceModifier: 360 }
    ],
    images: {
      "Titanium Gray": [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80"
      ],
      "Titanium Yellow": [
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80"
      ],
      "Titanium Violet": [
        "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
      ],
      "Titanium Black": [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
      ]
    },
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X, QHD+, 120Hz, HDR10+, 2600 nits peak brightness",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "Quad camera system (200MP Main, 50MP Periscope, 10MP Telephoto, 12MP Ultra Wide)",
      battery: "5000mAh, 45W wired charging (65% in 30 mins), 15W wireless charging",
      os: "Android 14 with One UI 6.1 (7 years of updates)",
      weight: "232 grams",
      dimensions: "162.3 x 79.0 x 8.6 mm"
    },
    features: [
      "Built-in S Pen with air actions",
      "Galaxy AI: Circle to Search, Live Translate, Note Assist",
      "Titanium frame with Corning Gorilla Armor glass",
      "IP68 dust and water resistance"
    ],
    reviews: [
      { id: "1", user: "Elena P.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", rating: 5, date: "2024-03-05", comment: "Galaxy AI is surprisingly useful, especially Circle to Search. S-Pen is as responsive as ever." },
      { id: "2", user: "David L.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", rating: 4, date: "2024-03-15", comment: "The flat screen is a massive upgrade over previous curved screens. Camera is extremely versatile." }
    ],
    featured: true,
    isNew: true
  },
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    description: "The all-pro phone engineered by Google, with the best of Google AI.",
    longDescription: "The Google Pixel 8 Pro is the all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera ever, and can even help you get more done, faster. It features a stunning polished aluminum frame and a matte back glass.",
    basePrice: 999,
    rating: 4.7,
    reviewCount: 94,
    colors: [
      { name: "Bay Blue", hex: "#A3C8E8", bgClass: "bg-[#A3C8E8]" },
      { name: "Porcelain", hex: "#F3EFE0", bgClass: "bg-[#F3EFE0]" },
      { name: "Obsidian", hex: "#2E2F30", bgClass: "bg-[#2E2F30]" }
    ],
    storage: [
      { size: "128GB", priceModifier: 0 },
      { size: "256GB", priceModifier: 60 },
      { size: "512GB", priceModifier: 180 }
    ],
    images: {
      "Bay Blue": [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
      ],
      "Porcelain": [
        "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80"
      ],
      "Obsidian": [
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
      ]
    },
    specs: {
      display: "6.7-inch Super Actua display, 120Hz, HDR10+, 2400 nits peak brightness",
      processor: "Google Tensor G3 with Titan M2 security coprocessor",
      camera: "Triple camera system (50MP Main, 48MP Ultra Wide with Macro Focus, 48MP 5x Telephoto)",
      battery: "5050mAh, 30W wired charging, fast wireless charging",
      os: "Android 14 (7 years of OS and security updates)",
      weight: "213 grams",
      dimensions: "162.6 x 76.5 x 8.8 mm"
    },
    features: [
      "Google AI features: Best Take, Magic Eraser, Audio Magic Eraser",
      "Fully upgraded camera sensors for better low-light performance",
      "Built-in temperature sensor on the back",
      "Car Crash Detection and Safety Check"
    ],
    reviews: [
      { id: "1", user: "Sophia M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", rating: 5, date: "2024-01-20", comment: "The photo editing AI is mind-blowing. Best Take has saved so many family pictures!" },
      { id: "2", user: "James R.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", rating: 4, date: "2024-02-14", comment: "Display is incredibly bright and clear even in direct sunlight. Great stock Android experience." }
    ],
    featured: false,
    isNew: false
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    description: "Redefined flagship specs, featuring the Trinity Engine and Hasselblad cameras.",
    longDescription: "The OnePlus 12 redefines the flagship smartphone experience. Packed with the Snapdragon 8 Gen 3, a custom 2K Oriental AMOLED display, and a 4th Gen Hasselblad Camera system, it delivers pure speed, power, and visual luxury.",
    basePrice: 799,
    rating: 4.6,
    reviewCount: 72,
    colors: [
      { name: "Flowy Emerald", hex: "#4C6B5B", bgClass: "bg-[#4C6B5B]" },
      { name: "Silky Black", hex: "#232426", bgClass: "bg-[#232426]" }
    ],
    storage: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 100 }
    ],
    images: {
      "Flowy Emerald": [
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
      ],
      "Silky Black": [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
      ]
    },
    specs: {
      display: "6.82-inch 2K Oriental AMOLED, 120Hz ProXDR, 4500 nits peak brightness",
      processor: "Snapdragon 8 Gen 3 with up to 16GB LPDDR5X RAM",
      camera: "Hasselblad Camera for Mobile (50MP Main, 64MP Periscope Telephoto, 48MP Ultra Wide)",
      battery: "5400mAh, 100W SUPERVOOC wired charging (100% in 26 mins), 50W AIRVOOC wireless",
      os: "OxygenOS based on Android 14",
      weight: "220 grams",
      dimensions: "164.3 x 75.8 x 9.15 mm"
    },
    features: [
      "100W ultra-fast charging - charger included in the box!",
      "Dual Cryo-velocity VC cooling system for intensive gaming",
      "Hasselblad Color Calibration for ultra-realistic photos",
      "Alert Slider for quick profile switching"
    ],
    reviews: [
      { id: "1", user: "Oliver T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", rating: 5, date: "2024-02-18", comment: "100W charging is a complete game-changer. I plug it in for 15 minutes and I'm set for the day." },
      { id: "2", user: "Amara S.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", rating: 4, date: "2024-03-02", comment: "The display is incredibly sharp and gets ridiculously bright. Hasselblad colors look very natural." }
    ],
    featured: true,
    isNew: false
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    description: "Co-engineered with Leica, featuring a 1-inch main camera sensor.",
    longDescription: "The Xiaomi 14 Ultra is a photographic masterpiece co-engineered with Leica. It features a revolutionary 1-inch LYT-900 main camera sensor with stepless variable aperture, providing unparalleled control over depth-of-field and low-light imaging.",
    basePrice: 1099,
    rating: 4.8,
    reviewCount: 46,
    colors: [
      { name: "Black (Vegan Leather)", hex: "#222222", bgClass: "bg-[#222222]" },
      { name: "White (Vegan Leather)", hex: "#EEEEEE", bgClass: "bg-[#EEEEEE]" }
    ],
    storage: [
      { size: "512GB", priceModifier: 0 }
    ],
    images: {
      "Black (Vegan Leather)": [
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80"
      ],
      "White (Vegan Leather)": [
        "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80"
      ]
    },
    specs: {
      display: "6.73-inch AMOLED, WQHD+, 120Hz, 3000 nits peak brightness, Xiaomi Shield Glass",
      processor: "Snapdragon 8 Gen 3",
      camera: "Leica Quad Camera System (50MP 1-inch Main, 50MP Floating Telephoto, 50MP Periscope, 50MP Ultra Wide)",
      battery: "5000mAh, 90W wired HyperCharge (100% in 33 mins), 80W wireless HyperCharge",
      os: "Xiaomi HyperOS based on Android 14",
      weight: "220 grams",
      dimensions: "161.4 x 75.3 x 9.2 mm"
    },
    features: [
      "Leica Summilux optical lens system",
      "1-inch flagship image sensor for supreme low-light performance",
      "Premium vegan leather back panel with high-strength aluminum frame",
      "Professional Photography Kit accessory available"
    ],
    reviews: [
      { id: "1", user: "Zhu L.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", rating: 5, date: "2024-03-10", comment: "If you care about photography, this is THE phone. The 1-inch sensor creates beautiful natural bokeh." },
      { id: "2", user: "Klaus M.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", rating: 4, date: "2024-03-22", comment: "Performance is stellar, charging is super fast. The vegan leather feels very premium and doesn't collect fingerprints." }
    ],
    featured: false,
    isNew: true
  }
]
