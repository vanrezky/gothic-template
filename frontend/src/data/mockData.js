// Mock data for gothic-themed electronics store

export const brands = [
  { id: 1, name: "RavenTech", logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=80&fit=crop" },
  { id: 2, name: "ShadowCore", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=80&fit=crop" },
  { id: 3, name: "NightVision", logo: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=150&h=80&fit=crop" },
  { id: 4, name: "DarkStorm", logo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=150&h=80&fit=crop" },
  { id: 5, name: "VoidTech", logo: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=80&fit=crop" },
  { id: 6, name: "CrimsonEdge", logo: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=150&h=80&fit=crop" }
];

export const categories = [
  { id: 1, name: "Laptops", slug: "laptops", icon: "Laptop" },
  { id: 2, name: "Computers", slug: "computers", icon: "Monitor" },
  { id: 3, name: "Smartphones", slug: "smartphones", icon: "Smartphone" },
  { id: 4, name: "Smart Watches", slug: "smartwatches", icon: "Watch" },
  { id: 5, name: "Accessories", slug: "accessories", icon: "Headphones" }
];

export const products = [
  {
    id: 1,
    title: "RavenBook Pro X1",
    category: "laptops",
    brand: "RavenTech",
    price: 2499.99,
    oldPrice: 2899.99,
    discount: 14,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop"
    ],
    description: "Experience the darkness of power with our flagship laptop. Equipped with shadow-black aluminum chassis and crimson-lit keyboard.",
    specifications: {
      processor: "Intel Core i9-13900H",
      memory: "32GB DDR5 RAM",
      storage: "1TB NVMe SSD",
      graphics: "NVIDIA RTX 4070",
      display: "15.6\" 4K OLED"
    },
    sizes: ["13-inch", "15-inch", "17-inch"],
    colors: ["Midnight Black", "Crimson Red", "Shadow Gray"],
    stock: 15,
    isFlashSale: true,
    isNew: false
  },
  {
    id: 2,
    title: "ShadowCore Gaming Rig",
    category: "computers",
    brand: "ShadowCore",
    price: 3299.99,
    oldPrice: 3799.99,
    discount: 13,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=400&fit=crop"
    ],
    description: "Unleash the shadows with this beast of a gaming machine. RGB lighting meets gothic design in perfect harmony.",
    specifications: {
      processor: "AMD Ryzen 9 7900X",
      memory: "64GB DDR5 RAM",
      storage: "2TB NVMe SSD",
      graphics: "NVIDIA RTX 4080",
      motherboard: "X670E Chipset"
    },
    sizes: ["Mini-ITX", "Mid-Tower", "Full-Tower"],
    colors: ["Obsidian Black", "Blood Red", "Dark Purple"],
    stock: 8,
    isFlashSale: true,
    isNew: false
  },
  {
    id: 3,
    title: "NightVision Pro 15",
    category: "smartphones",
    brand: "NightVision",
    price: 1299.99,
    oldPrice: 1499.99,
    discount: 13,
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=400&fit=crop"
    ],
    description: "See through the darkness with our flagship smartphone. Advanced night photography and gothic design aesthetics.",
    specifications: {
      display: "6.7\" AMOLED",
      processor: "Snapdragon 8 Gen 3",
      memory: "12GB RAM",
      storage: "256GB",
      camera: "108MP Triple Camera"
    },
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["Void Black", "Crimson Red", "Midnight Purple"],
    stock: 25,
    isFlashSale: false,
    isNew: true
  },
  {
    id: 4,
    title: "DarkStorm Elite Watch",
    category: "smartwatches",
    brand: "DarkStorm",
    price: 799.99,
    oldPrice: 999.99,
    discount: 20,
    rating: 4.6,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=400&fit=crop"
    ],
    description: "Time becomes your ally with this gothic smartwatch. Track your vitals while embracing the darkness.",
    specifications: {
      display: "1.9\" AMOLED",
      battery: "7 days",
      waterproof: "10ATM",
      sensors: "Heart Rate, SpO2, GPS",
      connectivity: "Bluetooth 5.3, WiFi"
    },
    sizes: ["42mm", "46mm"],
    colors: ["Shadow Black", "Blood Red", "Midnight Blue"],
    stock: 12,
    isFlashSale: true,
    isNew: false
  },
  {
    id: 5,
    title: "VoidTech Gaming Headset",
    category: "accessories",
    brand: "VoidTech",
    price: 299.99,
    oldPrice: 349.99,
    discount: 14,
    rating: 4.5,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop"
    ],
    description: "Immerse yourself in the soundscape of shadows. Premium audio quality with gothic-inspired design.",
    specifications: {
      driver: "50mm Dynamic",
      frequency: "20Hz-20kHz",
      impedance: "32Ω",
      connectivity: "USB-C, 3.5mm",
      features: "Active Noise Cancellation"
    },
    sizes: ["Standard"],
    colors: ["Midnight Black", "Crimson Accent", "Purple Haze"],
    stock: 35,
    isFlashSale: true,
    isNew: true
  }
];

export const flashSaleProducts = products.filter(p => p.isFlashSale).slice(0, 4);
export const newProducts = products.filter(p => p.isNew).slice(0, 6);

export const heroSlides = [
  {
    id: 1,
    title: "Embrace the Darkness",
    subtitle: "Premium Gothic Electronics",
    description: "Discover our collection of sophisticated dark-themed technology",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=600&fit=crop",
    cta: "Shop Collection",
    link: "/products"
  },
  {
    id: 2,
    title: "Shadow Gaming",
    subtitle: "Unleash Your Power",
    description: "High-performance gaming rigs with gothic aesthetics",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200&h=600&fit=crop",
    cta: "Explore Gaming",
    link: "/products/computers"
  },
  {
    id: 3,
    title: "Night Vision",
    subtitle: "See Beyond Darkness",
    description: "Advanced smartphones for the modern gothic lifestyle",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop",
    cta: "View Phones",
    link: "/products/smartphones"
  }
];

export const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "complete",
    total: 2499.99,
    items: [
      { id: 1, title: "RavenBook Pro X1", image: products[0].image, price: 2499.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-18",
    status: "shipping",
    total: 3599.98,
    items: [
      { id: 2, title: "ShadowCore Gaming Rig", image: products[1].image, price: 3299.99, quantity: 1 },
      { id: 5, title: "VoidTech Gaming Headset", image: products[4].image, price: 299.99, quantity: 1 }
    ]
  }
];

export const cartItems = [
  {
    id: 1,
    product: products[0],
    quantity: 1,
    selectedSize: "15-inch",
    selectedColor: "Midnight Black"
  },
  {
    id: 2,
    product: products[4],
    quantity: 2,
    selectedColor: "Midnight Black"
  }
];

export const filters = {
  priceRanges: [
    { id: 1, label: "Under $500", min: 0, max: 500 },
    { id: 2, label: "$500 - $1000", min: 500, max: 1000 },
    { id: 3, label: "$1000 - $2000", min: 1000, max: 2000 },
    { id: 4, label: "$2000 - $3000", min: 2000, max: 3000 },
    { id: 5, label: "Over $3000", min: 3000, max: 99999 }
  ],
  sizes: ["13-inch", "15-inch", "17-inch", "42mm", "46mm", "Mini-ITX", "Mid-Tower", "Full-Tower", "128GB", "256GB", "512GB"],
  colors: ["Midnight Black", "Crimson Red", "Shadow Gray", "Blood Red", "Dark Purple", "Obsidian Black", "Void Black", "Midnight Purple", "Midnight Blue", "Purple Haze", "Crimson Accent"],
  ratings: [4, 4.5, 4.7, 4.8, 4.9]
};