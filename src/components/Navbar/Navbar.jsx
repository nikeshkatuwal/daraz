import React, { useState } from 'react';
import TopBar from './TopBar';
import PrimaryHeader from './PrimaryHeader';
import CategoryRibbon from './CategoryRibbon';
import MobileNavbar from './MobileNavbar';
import LocationModal from './LocationModal';
import { locationsList, sampleCartItems } from '../../data/mockData';
import './Navbar.css';

export default function Navbar() {
  const [currentLocation, setCurrentLocation] = useState(locationsList[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [wishlistCount, setWishlistCount] = useState(3);

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <nav className="navbar-container">
      {/* 1. Desktop Top Utility Bar */}
      <TopBar />

      {/* 2. Primary Brand & Search Bar Header */}
      <PrimaryHeader
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        cartItems={cartItems}
        wishlistCount={wishlistCount}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* 3. Category Ribbon & MegaMenu */}
      <CategoryRibbon />

      {/* 4. Mobile Responsive Header */}
      <MobileNavbar
        currentLocation={currentLocation}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* 5. Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />
    </nav>
  );
}
