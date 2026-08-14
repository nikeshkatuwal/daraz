import React from 'react';
import TopBar from './TopBar';
import PrimaryHeader from './PrimaryHeader';
import CategoryRibbon from './CategoryRibbon';
import MobileNavbar from './MobileNavbar';
import LocationModal from './LocationModal';
import { useShop } from '../../context/ShopContext';
import './Navbar.css';

export default function Navbar() {
  const {
    currentLocation,
    setCurrentLocation,
    isLocationModalOpen,
    setIsLocationModalOpen
  } = useShop();

  return (
    <header className="navbar-container">
      {/* 1. Desktop Top Utility Bar */}
      <TopBar />

      {/* 2. Primary Brand & Search Bar Header */}
      <PrimaryHeader />

      {/* 3. Category Ribbon & MegaMenu */}
      <CategoryRibbon />

      {/* 4. Mobile Responsive Header */}
      <MobileNavbar />

      {/* 5. Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />
    </header>
  );
}
