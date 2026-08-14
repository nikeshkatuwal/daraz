import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { allProducts, collectibleVouchers, locationsList, sampleCartItems } from '../data/mockData';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // 1. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('daraz_cart');
      return saved ? JSON.parse(saved) : sampleCartItems;
    } catch {
      return sampleCartItems;
    }
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('daraz_wishlist');
      return saved ? JSON.parse(saved) : [2, 6, 8];
    } catch {
      return [2, 6, 8];
    }
  });

  // 3. User Profile State
  const [user, setUser] = useState({
    name: 'Nikesh Katuwal',
    email: 'nikesh.katuwal@gmail.com',
    phone: '+977 9841-234567',
    isLoggedIn: true,
    walletBalance: 3200,
    coins: 1450
  });

  // 4. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [filterMallOnly, setFilterMallOnly] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);

  // 5. Location & Delivery
  const [currentLocation, setCurrentLocation] = useState(locationsList[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // 6. Vouchers State
  const [collectedVoucherIds, setCollectedVoucherIds] = useState(['vouch1', 'vouch2']);
  const [appliedVoucherCode, setAppliedVoucherCode] = useState(null);

  // 7. Modals State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [latestOrderPlaced, setLatestOrderPlaced] = useState(null);

  // 8. Order History
  const [orderHistory, setOrderHistory] = useState([
    {
      orderId: 'DZ-8942109',
      date: 'Aug 12, 2026',
      status: 'Out for Delivery',
      deliveryEstimate: 'Today by 5:00 PM',
      itemsCount: 2,
      totalAmount: 6649,
      paymentMethod: 'eSewa Mobile Wallet',
      trackingSteps: [
        { label: 'Order Placed', completed: true, time: 'Aug 12, 09:30 AM' },
        { label: 'Packed & Dispatched', completed: true, time: 'Aug 13, 02:15 PM' },
        { label: 'Out for Delivery', completed: true, time: 'Aug 14, 08:45 AM' },
        { label: 'Delivered', completed: false, time: 'Expected by 5:00 PM' }
      ]
    }
  ]);

  // 9. Toast Notification System
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync cart and wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('daraz_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('daraz_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setCart((prev) => {
      const color = selectedColor || (product.colors ? product.colors[0] : 'Standard');
      const size = selectedSize || (product.sizes ? product.sizes[0] : null);
      const existingIdx = prev.findIndex((item) => item.id === product.id && item.color === color && item.size === size);

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images ? product.images[0] : product.image,
          seller: product.seller || 'Daraz Express Store',
          color,
          size,
          quantity
        }
      ];
    });

    showToast(`Added "${product.title.slice(0, 26)}..." to your cart! 🛍️`, 'success');
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const isSaved = wishlist.includes(product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      showToast('Added to your Wishlist! ❤️', 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Voucher operations
  const collectVoucher = (voucher) => {
    if (!collectedVoucherIds.includes(voucher.id)) {
      setCollectedVoucherIds((prev) => [...prev, voucher.id]);
      showToast(`Collected voucher "${voucher.code}"! 🎉`, 'success');
    } else {
      showToast(`You already collected "${voucher.code}"!`, 'info');
    }
  };

  const applyVoucher = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = collectibleVouchers.find((v) => v.code.toUpperCase() === cleanCode);
    if (found) {
      setAppliedVoucherCode(found.code);
      showToast(`Voucher "${found.code}" applied successfully! 🏷️`, 'success');
      return { success: true, voucher: found };
    } else {
      showToast(`Invalid or expired voucher code "${code}".`, 'error');
      return { success: false, message: 'Invalid code' };
    }
  };

  const removeAppliedVoucher = () => {
    setAppliedVoucherCode(null);
    showToast('Voucher code removed.', 'info');
  };

  // Quick view
  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Checkout & Order Placement
  const placeOrder = ({ paymentMethod, deliveryAddress, contactPhone, notes }) => {
    const orderId = `DZ-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    let voucherDiscount = 0;
    if (appliedVoucherCode) {
      const v = collectibleVouchers.find((item) => item.code === appliedVoucherCode);
      if (v) {
        if (v.discount) voucherDiscount = v.discount;
        else if (v.discountPercentage) voucherDiscount = Math.min(v.maxDiscount || 1000, Math.round((subtotal * v.discountPercentage) / 100));
      }
    }

    const shippingFee = subtotal >= 10000 ? 0 : 150;
    const finalTotal = Math.max(0, subtotal - voucherDiscount + shippingFee);

    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
      subtotal,
      voucherDiscount,
      shippingFee,
      totalAmount: finalTotal,
      paymentMethod,
      deliveryAddress: deliveryAddress || currentLocation.area + ', ' + currentLocation.city,
      deliveryEstimate: currentLocation.deliveryDays,
      contactPhone: contactPhone || user.phone,
      notes,
      status: 'Confirmed & Processing',
      trackingSteps: [
        { label: 'Order Confirmed', completed: true, time: 'Just now' },
        { label: 'Packed & Quality Checked', completed: false, time: 'Pending' },
        { label: 'Handed to Courier Express', completed: false, time: 'Pending' },
        { label: 'Delivered', completed: false, time: currentLocation.deliveryDays }
      ]
    };

    setOrderHistory((prev) => [newOrder, ...prev]);
    setLatestOrderPlaced(newOrder);
    clearCart();
    setAppliedVoucherCode(null);
    setIsCheckoutOpen(false);

    showToast(`Order #${orderId} confirmed successfully! 🎉`, 'success');
  };

  // Computed Cart Calculations
  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const cartItemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const voucherDiscountAmount = useMemo(() => {
    if (!appliedVoucherCode) return 0;
    const v = collectibleVouchers.find((item) => item.code === appliedVoucherCode);
    if (!v) return 0;
    if (v.discount) return v.discount;
    if (v.discountPercentage) {
      return Math.min(v.maxDiscount || 1000, Math.round((cartSubtotal * v.discountPercentage) / 100));
    }
    return 0;
  }, [appliedVoucherCode, cartSubtotal]);

  const shippingFee = useMemo(() => {
    if (cartSubtotal >= 10000 || cartSubtotal === 0) return 0;
    if (appliedVoucherCode === 'FREESHIP' && cartSubtotal >= 1999) return 0;
    return 150;
  }, [cartSubtotal, appliedVoucherCode]);

  const cartGrandTotal = useMemo(
    () => Math.max(0, cartSubtotal - voucherDiscountAmount + shippingFee),
    [cartSubtotal, voucherDiscountAmount, shippingFee]
  );

  // Filtered Products Catalog
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          (p.seller && p.seller.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Flag filters
    if (filterMallOnly) {
      result = result.filter((p) => p.isDarazMall);
    }
    if (filterFreeShipping) {
      result = result.filter((p) => p.isFreeShipping);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => {
        const discA = Math.round(((a.originalPrice - a.price) / a.originalPrice) * 100);
        const discB = Math.round(((b.originalPrice - b.price) / b.originalPrice) * 100);
        return discB - discA;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, filterMallOnly, filterFreeShipping, sortBy]);

  const contextValue = {
    // Products & filtering
    allProducts,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filterMallOnly,
    setFilterMallOnly,
    filterFreeShipping,
    setFilterFreeShipping,

    // Cart
    cart,
    cartItemsCount,
    cartSubtotal,
    voucherDiscountAmount,
    shippingFee,
    cartGrandTotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,

    // Wishlist
    wishlist,
    toggleWishlist,
    isInWishlist,

    // User & Location
    user,
    setUser,
    currentLocation,
    setCurrentLocation,
    isLocationModalOpen,
    setIsLocationModalOpen,

    // Vouchers
    collectibleVouchers,
    collectedVoucherIds,
    collectVoucher,
    appliedVoucherCode,
    applyVoucher,
    removeAppliedVoucher,

    // Modals
    quickViewProduct,
    openQuickView,
    closeQuickView,
    isWishlistOpen,
    setIsWishlistOpen,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isAuthOpen,
    setIsAuthOpen,
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,

    // Orders
    orderHistory,
    latestOrderPlaced,
    setLatestOrderPlaced,
    placeOrder,

    // Toasts
    toasts,
    showToast,
    removeToast
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
