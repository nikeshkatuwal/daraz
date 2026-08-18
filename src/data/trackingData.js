// Coordinates & Mock Route Waypoints for Live Delivery Tracking in Nepal

export const deliveryRiders = [
  {
    id: 'rider-1',
    name: 'Bikash Shrestha',
    title: 'Daraz Express Hero Rider',
    rating: 4.95,
    deliveriesCount: 1420,
    phone: '+977 9801-445566',
    vehicle: 'Hero Splendor Pro',
    plateNumber: 'BA 99 PA 4201',
    vehicleType: 'Motorbike',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinedYear: '2023',
    onTimeRate: '99.4%'
  },
  {
    id: 'rider-2',
    name: 'Ramesh Adhikari',
    title: 'Senior Logistics Specialist',
    rating: 4.88,
    deliveriesCount: 2180,
    phone: '+977 9812-778899',
    vehicle: 'Honda Shine 125',
    plateNumber: 'BA 82 PA 9134',
    vehicleType: 'Motorbike',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinedYear: '2022',
    onTimeRate: '98.9%'
  }
];

// High-fidelity road coordinate waypoints for real city routes in Kathmandu & Pokhara
export const cityRoutes = {
  Kathmandu: {
    hubName: 'Daraz Central Fulfillment Hub (Balaju / Ring Road)',
    hubCoords: [27.7345, 85.3012],
    destCoords: [27.7058, 85.3168], // New Road / Thamel / Kathmandu central
    destName: 'Bagbazar / New Road, Kathmandu',
    waypoints: [
      [27.7345, 85.3012], // Hub Balaju
      [27.7301, 85.3054], // Gongabu Chowk
      [27.7258, 85.3089], // Samakhusi intersection
      [27.7204, 85.3115], // Lazimpat North
      [27.7162, 85.3142], // Lazimpat Embassy area
      [27.7125, 85.3138], // Thamel Marg
      [27.7098, 85.3148], // Jyatha / Kantipath
      [27.7075, 85.3159], // Ratnapark bypass
      [27.7058, 85.3168]  // Final Doorstep (New Road)
    ]
  },
  Lalitpur: {
    hubName: 'Daraz South Hub (Kupondole)',
    hubCoords: [27.6885, 85.3142],
    destCoords: [27.6744, 85.3195], // Patan Durbar / Jawalakhel
    destName: 'Jawalakhel / Jhamsikhel, Lalitpur',
    waypoints: [
      [27.6885, 85.3142], // Kupondole Hub
      [27.6845, 85.3155], // Sanepa bridge
      [27.6802, 85.3170], // Pulchowk Engineering Campus
      [27.6775, 85.3182], // Jawalakhel roundabout
      [27.6744, 85.3195]  // Final Doorstep (Jhamsikhel)
    ]
  },
  Pokhara: {
    hubName: 'Daraz Pokhara Regional Distribution Center',
    hubCoords: [28.2255, 83.9922],
    destCoords: [28.2096, 83.9592], // Lakeside Pokhara
    destName: 'Lakeside Baidam, Pokhara',
    waypoints: [
      [28.2255, 83.9922], // Regional Hub (Prithvi Chowk)
      [28.2210, 83.9850], // Nayabazar
      [28.2180, 83.9780], // Chipledhunga
      [28.2145, 83.9680], // Zero KM
      [28.2110, 83.9620], // Hallanchowk
      [28.2096, 83.9592]  // Final Doorstep (Lakeside)
    ]
  },
  Default: {
    hubName: 'Daraz Central Hub',
    hubCoords: [27.7172, 85.324],
    destCoords: [27.7007, 85.3001],
    destName: 'Customer Delivery Address',
    waypoints: [
      [27.7172, 85.324],
      [27.714, 85.32],
      [27.71, 85.315],
      [27.705, 85.308],
      [27.7007, 85.3001]
    ]
  }
};

export const defaultTrackingOrder = {
  orderId: 'DZ-8942109',
  date: 'Today, 08:30 AM',
  status: 'Out for Delivery',
  deliveryEstimate: 'Arriving in ~14 mins',
  distanceRemainingKm: 1.6,
  itemsCount: 2,
  totalAmount: 6649,
  paymentMethod: 'eSewa Mobile Wallet (Prepaid)',
  deliveryAddress: 'House 42, New Road, Kathmandu (Near Ranjana Mall)',
  contactPhone: '+977 9841-234567',
  otpCode: '4821',
  selectedCity: 'Kathmandu',
  rider: deliveryRiders[0],
  items: [
    {
      title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
      price: 44999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80'
    },
    {
      title: 'Ergonomic Wireless Silent Mouse with Fast Scroll',
      price: 1650,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&auto=format&fit=crop&q=80'
    }
  ],
  trackingSteps: [
    { label: 'Order Confirmed', completed: true, time: '08:30 AM' },
    { label: 'Packed & Quality Verified', completed: true, time: '09:45 AM' },
    { label: 'Dispatched from Balaju Hub', completed: true, time: '11:15 AM' },
    { label: 'Out for Delivery (Rider en route)', completed: true, current: true, time: '11:40 AM' },
    { label: 'Handover & Package Delivered', completed: false, time: 'Estimated 12:05 PM' }
  ]
};

export const cannedDeliveryMessages = [
  '👋 Hi Bikash, please call me when you reach the gate.',
  '📦 Please leave the parcel with the building security guard.',
  '🚪 The house is painted white with a black gate.',
  '📍 I am waiting downstairs right now.',
  '⚡ Please come directly to 2nd Floor, Flat 201.'
];
