# Daraz Express — Online Shopping Website

A Daraz-inspired ecommerce storefront built with React and Vite. This project demonstrates a modern online shopping landing page with a responsive navbar, product cards, search suggestions, category mega menu, delivery location selector, and cart preview UI.

## Key Features

- Responsive navigation with desktop and mobile header layouts
- Top utility bar for app download, seller sign-up, order tracking, and help links
- Search bar with category filtering, keyboard shortcut support, autocomplete suggestions, and search history
- Category ribbon with a dropdown mega menu showing grouped subcategories
- Location selector modal for delivery area selection
- Cart preview panel with item quantity updates, remove item functionality, subtotal calculation, and free shipping progress
- Hero banner and flash sale product grid for featured promotions and deals
- Mock data-driven UI using centralized sample data objects in `src/data/mockData.js`

## Tech Stack

- React 19
- Vite 8
- Lucide React icons
- Oxlint for linting
- CSS styling with component-specific styles and global app styles

## Project Structure

- `src/App.jsx` — Main app layout and featured content sections
- `src/main.jsx` — React application entry point
- `src/data/mockData.js` — Sample dataset for categories, trending searches, cart items, and locations
- `src/components/Navbar/` — Navigation components
  - `TopBar.jsx` — top utility section
  - `PrimaryHeader.jsx` — main desktop navigation and cart interactions
  - `CategoryRibbon.jsx` — category navigation bar and mega menu trigger
  - `MegaMenu.jsx` — expanded category menu
  - `SearchBar.jsx` — smart search form and suggestion overlay
  - `CartPreview.jsx` — cart dropdown panel
  - `LocationModal.jsx` — delivery location chooser
  - `MobileNavbar.jsx` — mobile navigation drawer and search
- `src/App.css` — landing page hero and product section styles
- `src/index.css` — global app styles and font import

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:4173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## How the App Works

The current implementation is a frontend demo only. It uses React state and mock data to simulate:

- product browsing via a flash sale grid
- item count and subtotal calculation in the cart preview
- location selection and UI updates
- search and category selection behavior

For a complete ecommerce website, integrate with a backend API for product search, user authentication, cart persistence, checkout, payments, and order management.

## Future Improvements

- Add a backend or headless API for products, categories, and orders
- Add user authentication and profile management
- Connect cart and wishlist to persistent storage or database
- Implement checkout and payment workflows
- Add product detail pages and search results pages
- Improve accessibility and keyboard navigation
- Add animations and mobile-first responsive breakpoints

## Notes

This repository is currently configured as a private Vite app and can be extended into a full Daraz-style shopping site. Update `package.json` metadata and add project-specific branding before deploying.
