import { Smartphone, ShoppingBag, Home, Tv, Sparkles, ShoppingBasket, Dumbbell } from 'lucide-react';

export const categoriesData = [
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
    name: "Fashion & Apparel",
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
        items: ['Men\'s Watches', 'Women\'s Watches', 'Gold & Silver Jewelry', 'Sunglasses & Eyewear']
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

export const trendingSearches = [
  'iPhone 16 Pro Max',
  'Air Fryer 5L',
  'Winter Jacket Men',
  'Gaming Monitor 144Hz',
  'Wireless Earbuds Bluetooth',
  'Smartwatch Waterproof',
  'Mechanical Keyboard RGB'
];

export const sampleCartItems = [
  {
    id: 101,
    name: 'Wireless Active Noise Cancelling Headphones',
    price: 4999,
    originalPrice: 7999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
    color: 'Matte Black',
    seller: 'Daraz Express Official'
  },
  {
    id: 102,
    name: 'Smart Fitness Tracker Watch with AMOLED Display',
    price: 2850,
    originalPrice: 4200,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
    color: 'Ocean Blue',
    seller: 'TechWorld Nepal'
  }
];

export const locationsList = [
  { city: 'Kathmandu', area: 'Bagbazar / New Road' },
  { city: 'Kathmandu', area: 'Baneshwor / Tinkune' },
  { city: 'Lalitpur', area: 'Patan Durbar / Jawalakhel' },
  { city: 'Pokhara', area: 'Lakeside / Chipledhunga' },
  { city: 'Biratnagar', area: 'Main Road / Bargachhi' },
  { city: 'Chitwan', area: 'Narayangadh / Bharatpur' }
];
