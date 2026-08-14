import { Smartphone, ShoppingBag, Home, Tv, Sparkles, ShoppingBasket, Dumbbell } from 'lucide-react';

export const categoriesData = [
  {
    id: 'all',
    name: 'All Categories',
    icon: ShoppingBag,
    subcategories: []
  },
  {
    id: 'electronics',
    name: 'Electronics & Devices',
    icon: Smartphone,
    badge: 'Popular',
    subcategories: [
      {
        title: 'Mobile & Tablets',
        items: ['Smartphones', 'Feature Phones', 'Tablets', 'Refurbished Phones', 'Phone Accessories']
      },
      {
        title: 'Laptops & Computers',
        items: ['Gaming Laptops', 'MacBooks', 'Desktops', 'Monitors', 'PC Components', 'Printers']
      },
      {
        title: 'Audio & Wearables',
        items: ['Wireless Earbuds', 'Headphones', 'Smartwatches', 'Bluetooth Speakers', 'Soundbars']
      },
      {
        title: 'Cameras & Drones',
        items: ['DSLR Cameras', 'Action Cameras', 'Security Cameras', 'Drones & Accessories']
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    badge: 'HOT 50% OFF',
    subcategories: [
      {
        title: "Women's Fashion",
        items: ['Traditional Wear', 'Dresses & Skirts', 'Tops & Tees', 'Winter Collection', 'Handbags & Purses']
      },
      {
        title: "Men's Fashion",
        items: ['Shirts & Polo', 'Jeans & Trousers', 'Jackets & Coats', 'Ethnic Wear', 'Shoes & Sneakers']
      },
      {
        title: 'Watches & Jewelry',
        items: ["Men's Watches", "Women's Watches", 'Gold & Silver Jewelry', 'Sunglasses & Eyewear']
      }
    ]
  },
  {
    id: 'home',
    name: 'Home & Lifestyle',
    icon: Home,
    subcategories: [
      {
        title: 'Furniture & Decor',
        items: ['Sofas & Chairs', 'Beds & Mattresses', 'Wall Art & Mirrors', 'Lighting & Lamps']
      },
      {
        title: 'Kitchen & Dining',
        items: ['Cookware & Pans', 'Blenders & Mixers', 'Dinner Sets', 'Water Purifiers']
      },
      {
        title: 'Bedding & Bath',
        items: ['Bedsheets & Covers', 'Pillows & Cushions', 'Bath Towels', 'Curtains & Blinds']
      }
    ]
  },
  {
    id: 'appliances',
    name: 'Home Appliances',
    icon: Tv,
    badge: 'Free Delivery',
    subcategories: [
      {
        title: 'Large Appliances',
        items: ['Refrigerators', 'Washing Machines', 'Air Conditioners', 'Microwave Ovens']
      },
      {
        title: 'Small Appliances',
        items: ['Air Fryers', 'Electric Kettles', 'Vacuum Cleaners', 'Garment Steamers']
      }
    ]
  },
  {
    id: 'beauty',
    name: 'Health & Beauty',
    icon: Sparkles,
    badge: 'New',
    subcategories: [
      {
        title: 'Skincare & Makeup',
        items: ['Serums & Moisturisers', 'Sunscreen', 'Lipsticks', 'Foundation', 'Face Masks']
      },
      {
        title: 'Hair & Body',
        items: ['Shampoos & Conditioners', 'Hair Oils', 'Body Wash', 'Perfumes & Deodorants']
      }
    ]
  },
  {
    id: 'groceries',
    name: 'Groceries & Mart',
    icon: ShoppingBasket,
    subcategories: [
      {
        title: 'Daily Essentials',
        items: ['Rice & Grains', 'Cooking Oil & Ghee', 'Snacks & Biscuits', 'Tea & Coffee']
      },
      {
        title: 'Beverages & Dairy',
        items: ['Fresh Milk & Butter', 'Fruit Juices', 'Energy Drinks', 'Chocolates']
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoor',
    icon: Dumbbell,
    subcategories: [
      {
        title: 'Fitness Gear',
        items: ['Treadmills', 'Dumbbells & Weights', 'Yoga Mats', 'Fitness Trackers']
      },
      {
        title: 'Outdoor Sports',
        items: ['Bicycles', 'Cricket & Football', 'Badminton Equipment', 'Camping & Hiking']
      }
    ]
  }
];

export const heroSlidesData = [
  {
    id: 1,
    tag: '⚡ FLASH SALE 2026',
    title: 'Up to 70% OFF on Top Tech & Gadgets',
    description: 'Exclusive brand discounts on Apple, Sony, Samsung, and Xiaomi with instant Bank Vouchers & free express delivery.',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    ctaPrimary: 'Shop Tech Deals',
    ctaSecondary: 'Collect Rs. 1000 Voucher',
    badgeColor: '#f57224'
  },
  {
    id: 2,
    tag: '✨ DARAZ MALL LUXURY',
    title: '100% Authentic Fashion & Premium Wear',
    description: 'Elevate your wardrobe with authentic seasonal arrivals, luxury timepieces, and premium designer footwear.',
    bgGradient: 'linear-gradient(135deg, #18181b 0%, #3f1515 50%, #7f1d1d 100%)',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    ctaPrimary: 'Explore Fashion Mall',
    ctaSecondary: 'View Lookbook',
    badgeColor: '#e11d48'
  },
  {
    id: 3,
    tag: '🏡 HOME MAKEOVER FEST',
    title: 'Smart Living & Modern Appliances',
    description: 'Upgrade your living space with smart kitchen essentials, robotic vacuums, and ergonomic modern furniture.',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    ctaPrimary: 'Shop Home Upgrades',
    ctaSecondary: 'Get Free Installation',
    badgeColor: '#10b981'
  }
];

export const collectibleVouchers = [
  {
    id: 'vouch1',
    code: 'DARAZ2026',
    title: 'Rs. 500 OFF',
    subtitle: 'Min. spend Rs. 4,999',
    discount: 500,
    minSpend: 4999,
    tag: 'Mega Deal',
    color: '#f57224'
  },
  {
    id: 'vouch2',
    code: 'FREESHIP',
    title: 'FREE Delivery',
    subtitle: 'On orders over Rs. 1,999',
    discount: 150,
    minSpend: 1999,
    tag: 'Free Shipping',
    color: '#10b981'
  },
  {
    id: 'vouch3',
    code: 'TECH10',
    title: '10% OFF Tech',
    subtitle: 'Max discount Rs. 1,500',
    discountPercentage: 10,
    maxDiscount: 1500,
    minSpend: 6000,
    tag: 'Electronics Only',
    color: '#6366f1'
  },
  {
    id: 'vouch4',
    code: 'FIRSTSHOP',
    title: 'Rs. 300 Welcome Bonus',
    subtitle: 'No minimum spend required',
    discount: 300,
    minSpend: 0,
    tag: 'New User',
    color: '#ec4899'
  }
];

export const allProducts = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    category: 'electronics',
    subCategory: 'Audio & Wearables',
    price: 44999,
    originalPrice: 54999,
    discount: '-18%',
    rating: 4.9,
    reviews: 328,
    stock: 14,
    isFlashSale: true,
    isDarazMall: true,
    isFreeShipping: true,
    tag: 'Flash Sale',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Sony Official Flagship Store',
    warranty: '1 Year Brand Warranty',
    colors: ['Silver Platinum', 'Matte Black', 'Midnight Navy'],
    description: 'Industry-leading noise cancellation optimized with two processors and 8 microphones. Up to 30-hour battery life with quick charging (3 min charge for 3 hours playback). Ultra-comfortable lightweight soft-fit leather.'
  },
  {
    id: 2,
    title: 'Apple Watch Ultra 2 GPS + Cellular Titanium 49mm',
    category: 'electronics',
    subCategory: 'Audio & Wearables',
    price: 119999,
    originalPrice: 134999,
    discount: '-11%',
    rating: 4.9,
    reviews: 142,
    stock: 7,
    isFlashSale: false,
    isDarazMall: true,
    isFreeShipping: true,
    tag: 'Daraz Mall',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Apple Authorized Reseller Nepal',
    warranty: '1 Year International Warranty',
    colors: ['Natural Titanium', 'Dark Slate'],
    description: 'The most rugged and capable Apple Watch. Designed for outdoor endurance and water sports. Brightest Always-On Retina display with up to 3000 nits.'
  },
  {
    id: 3,
    title: 'Custom RGB Hot-Swappable Mechanical Gaming Keyboard',
    category: 'electronics',
    subCategory: 'Laptops & Computers',
    price: 4899,
    originalPrice: 7999,
    discount: '-39%',
    rating: 4.8,
    reviews: 215,
    stock: 22,
    isFlashSale: true,
    isDarazMall: false,
    isFreeShipping: true,
    tag: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'GamerZone Nepal',
    warranty: '6 Months Replacement Warranty',
    colors: ['Cyberpunk Neon', 'Chalk White', 'Stealth Grey'],
    description: '75% compact layout with pre-lubed Gateron Yellow switches, sound-dampening silicone foam, multi-device Bluetooth 5.1 / 2.4GHz / Type-C connectivity.'
  },
  {
    id: 4,
    title: 'Ergonomic Wireless Silent Mouse with Fast Scroll',
    category: 'electronics',
    subCategory: 'Laptops & Computers',
    price: 1650,
    originalPrice: 2800,
    discount: '-41%',
    rating: 4.6,
    reviews: 89,
    stock: 45,
    isFlashSale: true,
    isDarazMall: false,
    isFreeShipping: false,
    tag: 'Flash Sale',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'TechWorld Nepal',
    warranty: '6 Months Warranty',
    colors: ['Graphite Black', 'Rose Pearl', 'Off-White'],
    description: '90% silent click noise reduction, sculpted ergonomic grip, precision optical tracking up to 4000 DPI, works seamlessly on glass and desk.'
  },
  {
    id: 5,
    title: 'Apple MacBook Air 15" M3 Chip (16GB RAM / 512GB SSD)',
    category: 'electronics',
    subCategory: 'Laptops & Computers',
    price: 198000,
    originalPrice: 219000,
    discount: '-10%',
    rating: 5.0,
    reviews: 64,
    stock: 5,
    isFlashSale: false,
    isDarazMall: true,
    isFreeShipping: true,
    tag: 'Daraz Mall',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Apple Flagship Nepal',
    warranty: '1 Year Official Warranty',
    colors: ['Midnight', 'Starlight', 'Space Grey', 'Silver'],
    description: 'Blazing fast Apple M3 8-core CPU and 10-core GPU. Liquid Retina display supporting 1 billion colors, 18 hours battery life, MagSafe 3 charging.'
  },
  {
    id: 6,
    title: 'Premium Men Heavyweight Thermal Puffer Winter Jacket',
    category: 'fashion',
    subCategory: "Men's Fashion",
    price: 3850,
    originalPrice: 6500,
    discount: '-41%',
    rating: 4.8,
    reviews: 184,
    stock: 19,
    isFlashSale: true,
    isDarazMall: false,
    isFreeShipping: true,
    tag: 'Winter Must-Have',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Urban Outfitters KTM',
    warranty: '7 Days Return & Replacement',
    colors: ['Obsidian Black', 'Military Olive', 'Navy Blue'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Windproof, water-resistant exterior with high-density down insulation padding. Fleece-lined detachable hood and inner security zipper pockets.'
  },
  {
    id: 7,
    title: 'Minimalist All-White Leather Casual Sneakers',
    category: 'fashion',
    subCategory: "Men's Fashion",
    price: 2790,
    originalPrice: 4500,
    discount: '-38%',
    rating: 4.7,
    reviews: 129,
    stock: 31,
    isFlashSale: true,
    isDarazMall: true,
    isFreeShipping: true,
    tag: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'SoleCraft Official',
    warranty: '30 Days Quality Guarantee',
    colors: ['Pure White', 'White & Forest Green', 'White & Navy'],
    sizes: ['40', '41', '42', '43', '44'],
    description: 'Supple vegan leather upper with breathable cushioned memory foam insoles. Vulcanized anti-slip rubber outsole for all-day comfort.'
  },
  {
    id: 8,
    title: 'Luxury Automatic Skeleton Mechanical Watch for Men',
    category: 'fashion',
    subCategory: 'Watches & Jewelry',
    price: 7499,
    originalPrice: 12999,
    discount: '-42%',
    rating: 4.9,
    reviews: 93,
    stock: 8,
    isFlashSale: false,
    isDarazMall: true,
    isFreeShipping: true,
    tag: 'Daraz Mall',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Chrono Elegance',
    warranty: '2 Years Mechanism Warranty',
    colors: ['Rose Gold & Black', 'Silver & Blue', 'All Black'],
    description: 'Self-winding automatic movement, sapphire crystal scratch-proof glass, transparent skeleton dial showcasing intricate gears, 50m water resistance.'
  },
  {
    id: 9,
    title: 'Digital Smart Air Fryer 6.5L with 12 Preset Cooking Modes',
    category: 'appliances',
    subCategory: 'Small Appliances',
    price: 8250,
    originalPrice: 13500,
    discount: '-39%',
    rating: 4.9,
    reviews: 312,
    stock: 12,
    isFlashSale: true,
    isDarazMall: true,
    isFreeShipping: true,
    tag: 'Flash Sale',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Philips Home Official Store',
    warranty: '2 Years Manufacturer Warranty',
    colors: ['Glossy Black', 'Stainless Steel Silver'],
    description: 'Rapid 360° air circulation cooks crispy food with 90% less oil. Touch LED display, non-stick dishwasher-safe basket with auto shut-off safety.'
  },
  {
    id: 10,
    title: 'High-Performance Ergonomic Mesh Office Chair with Lumbar Support',
    category: 'home',
    subCategory: 'Furniture & Decor',
    price: 11500,
    originalPrice: 18000,
    discount: '-36%',
    rating: 4.8,
    reviews: 147,
    stock: 9,
    isFlashSale: false,
    isDarazMall: false,
    isFreeShipping: true,
    tag: 'Top Rated',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a8a37f714c?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'ErgoLife Furniture Nepal',
    warranty: '3 Years Frame Warranty',
    colors: ['Cool Grey', 'Matte Black'],
    description: 'Breathable elastic mesh back, dynamic 3D lumbar support, adjustable headrest and 4D armrests, heavy-duty BIFMA certified gas lift up to 150kg.'
  },
  {
    id: 11,
    title: 'Advanced Vitamin C + Hyaluronic Acid Brightening Serum 30ml',
    category: 'beauty',
    subCategory: 'Skincare & Makeup',
    price: 1450,
    originalPrice: 2200,
    discount: '-34%',
    rating: 4.9,
    reviews: 421,
    stock: 58,
    isFlashSale: true,
    isDarazMall: true,
    isFreeShipping: false,
    tag: 'Flash Sale',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f72eb372a6?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'GlowAura Skincare Lab',
    warranty: '100% Authentic Guaranteed',
    colors: ['30ml Standard Bottle'],
    description: 'Formulated with 20% Pure Vitamin C, Hyaluronic Acid, and Ferulic Acid. Clinically tested to fade dark spots, boost glow, and firm skin elasticity.'
  },
  {
    id: 12,
    title: 'Professional Ultra-Light Carbon Fiber Badminton Racket Set',
    category: 'sports',
    subCategory: 'Outdoor Sports',
    price: 3200,
    originalPrice: 5400,
    discount: '-41%',
    rating: 4.7,
    reviews: 95,
    stock: 24,
    isFlashSale: false,
    isDarazMall: false,
    isFreeShipping: true,
    tag: 'Sports Deal',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=700&auto=format&fit=crop&q=80'
    ],
    seller: 'Yonex Sports Outlet',
    warranty: '6 Months String Warranty',
    colors: ['Matte Red / Gold', 'Electric Blue / White'],
    description: 'Full high-modulus graphite frame weighing only 82 grams (4U). Pre-strung at 28 lbs tension with aerodynamic frame for high smash speed.'
  }
];

export const trendingSearches = [
  'iPhone 16 Pro Max',
  'Air Fryer 6.5L',
  'Winter Jacket Men',
  'Gaming Keyboard RGB',
  'Wireless Earbuds Bluetooth',
  'Smartwatch Titanium',
  'Vitamin C Serum',
  'Ergonomic Chair'
];

export const sampleCartItems = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    price: 44999,
    originalPrice: 54999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
    color: 'Matte Black',
    seller: 'Sony Official Flagship Store'
  },
  {
    id: 4,
    title: 'Ergonomic Wireless Silent Mouse with Fast Scroll',
    price: 1650,
    originalPrice: 2800,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&auto=format&fit=crop&q=80',
    color: 'Graphite Black',
    seller: 'TechWorld Nepal'
  }
];

export const locationsList = [
  { city: 'Kathmandu', area: 'Bagbazar / New Road / Thamel', deliveryDays: '1 Day (Express)' },
  { city: 'Kathmandu', area: 'Baneshwor / Tinkune / Koteshwor', deliveryDays: '1 Day (Express)' },
  { city: 'Lalitpur', area: 'Patan Durbar / Jawalakhel / Jhamsikhel', deliveryDays: '1-2 Days' },
  { city: 'Bhaktapur', area: 'Suryabinayak / Sallaghari / Durbar Square', deliveryDays: '1-2 Days' },
  { city: 'Pokhara', area: 'Lakeside / Chipledhunga / Mahendrapool', deliveryDays: '2-3 Days' },
  { city: 'Biratnagar', area: 'Main Road / Bargachhi / Traffic Chowk', deliveryDays: '2-3 Days' },
  { city: 'Chitwan', area: 'Narayangadh / Bharatpur / Tandi', deliveryDays: '2 Days' },
  { city: 'Butwal', area: 'Traffic Chowk / Golpark / Kalikanagar', deliveryDays: '2-3 Days' }
];

export const partnerBrands = [
  'Samsung',
  'Sony',
  'Apple',
  'Xiaomi',
  'Nike',
  'Adidas',
  'Philips',
  'Puma',
  'Dell',
  'Logitech'
];

export const customerReviews = [
  {
    name: 'Anjali Sharma',
    location: 'Kathmandu',
    rating: 5.0,
    verified: true,
    date: '2 days ago',
    message: 'Ordered the Sony headphones at 11 AM and they arrived at my doorstep the very next afternoon! Genuine product with sealed manufacturer warranty. Daraz Express service in Kathmandu is unbeatable.'
  },
  {
    name: 'Sagar Rai',
    location: 'Pokhara',
    rating: 4.9,
    verified: true,
    date: 'Yesterday',
    message: 'Collected the Rs. 500 voucher during the Flash sale and got an amazing deal on my mechanical keyboard. Smooth checkout with eSewa and quick SMS tracking updates.'
  },
  {
    name: 'Priya Khatri',
    location: 'Biratnagar',
    rating: 4.8,
    verified: true,
    date: '3 days ago',
    message: 'The quick view product details and variant picker made shopping on mobile so easy. The jacket quality is superb, genuine fleece lining and fits true to size.'
  }
];
