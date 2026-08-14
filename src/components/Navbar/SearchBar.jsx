import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, History, ChevronDown, Sparkles } from 'lucide-react';
import { trendingSearches, categoriesData } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    allProducts,
    openQuickView
  } = useShop();

  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['Sony Headphones', 'Air Fryer', 'MacBook Air']);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Keyboard shortcut '/' listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close suggestions overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (text) => {
    setSearchQuery(text);
    if (!searchHistory.includes(text)) {
      setSearchHistory([text, ...searchHistory.slice(0, 4)]);
    }
    setIsFocused(false);

    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const removeHistoryItem = (e, text) => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter((item) => item !== text));
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      setIsFocused(false);
      if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
        setSearchHistory([searchQuery.trim(), ...searchHistory.slice(0, 4)]);
      }
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Live matching products
  const matchingProducts = searchQuery.trim()
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <div className="search-wrapper" ref={searchBoxRef}>
      <div className={`search-box ${isFocused ? 'is-focused' : ''}`}>
        {/* Category Select Filter */}
        <div className="category-select-wrapper">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoriesData.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="category-select-chevron" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          className="search-input-field"
          placeholder="Search in Daraz Express (e.g. Headphones, MacBook, Winter Jacket)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDownInput}
        />

        {/* Clear Query Button */}
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <X size={15} />
          </button>
        )}

        {/* Keyboard shortcut indicator */}
        {!isFocused && !searchQuery && <span className="hotkey-hint">/</span>}

        {/* Submit Search Button */}
        <button
          type="button"
          className="search-submit-btn"
          title="Search"
          onClick={() => {
            setIsFocused(false);
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Search size={18} />
        </button>
      </div>

      {/* Auto-suggest / Search Dropdown Overlay */}
      {isFocused && (
        <div className="search-suggestions-overlay">
          {/* History / Recent Searches */}
          {searchHistory.length > 0 && !searchQuery && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <History size={12} />
                <span>Recent Searches</span>
              </div>
              <div className="trending-chips">
                {searchHistory.map((item) => (
                  <span
                    key={item}
                    className="chip-item"
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    {item}
                    <X
                      size={12}
                      onClick={(e) => removeHistoryItem(e, item)}
                      style={{ opacity: 0.6 }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {!searchQuery && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <TrendingUp size={12} />
                <span>Trending Searches in Nepal</span>
              </div>
              <div className="trending-chips">
                {trendingSearches.map((item) => (
                  <span
                    key={item}
                    className="chip-item"
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    🔥 {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Live Matching Products Preview */}
          {searchQuery && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <Sparkles size={12} />
                <span>Instant Products ({matchingProducts.length} matches)</span>
              </div>

              {matchingProducts.length > 0 ? (
                <div className="live-search-results-list">
                  {matchingProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="live-search-item"
                      onClick={() => {
                        setIsFocused(false);
                        openQuickView(prod);
                      }}
                    >
                      <img
                        src={prod.images ? prod.images[0] : prod.image}
                        alt={prod.title}
                        className="live-search-img"
                      />
                      <div className="live-search-info">
                        <span className="live-search-title">{prod.title}</span>
                        <div className="live-search-price">
                          <strong>Rs. {prod.price.toLocaleString()}</strong>
                          {prod.originalPrice && (
                            <span className="live-search-orig">
                              Rs. {prod.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '10px 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                  No exact product matches for "{searchQuery}". Press Enter to view broad results.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
