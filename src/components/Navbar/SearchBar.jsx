import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, History, ChevronDown } from 'lucide-react';
import { trendingSearches, categoriesData } from '../../data/mockData';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(['iPhone 16', 'Smartwatch', 'Gaming Mouse']);
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
    setQuery(text);
    if (!searchHistory.includes(text)) {
      setSearchHistory([text, ...searchHistory.slice(0, 4)]);
    }
    setIsFocused(false);
  };

  const removeHistoryItem = (e, text) => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter((item) => item !== text));
  };

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
            <option value="all">All Categories</option>
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
          placeholder="Search in Daraz Express (e.g. Headphones, Laptops, Fashion)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />

        {/* Clear Query Button */}
        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setQuery('')}
            title="Clear search"
          >
            <X size={15} />
          </button>
        )}

        {/* Keyboard shortcut indicator */}
        {!isFocused && !query && <span className="hotkey-hint">/</span>}

        {/* Submit Search Button */}
        <button type="button" className="search-submit-btn" title="Search">
          <Search size={18} />
        </button>
      </div>

      {/* Auto-suggest / Search Dropdown Overlay */}
      {isFocused && (
        <div className="search-suggestions-overlay">
          {/* History / Recent Searches */}
          {searchHistory.length > 0 && !query && (
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
          {!query && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <TrendingUp size={12} />
                <span>Trending Searches</span>
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

          {/* Live Matching Results Preview */}
          {query && (
            <div className="suggestion-section">
              <div className="suggestion-section-title">
                <Search size={12} />
                <span>Matching suggestions for "{query}"</span>
              </div>
              {[
                `${query} in Electronics`,
                `${query} Wireless Bluetooth`,
                `${query} Special Discount`,
                `Best ${query} 2026`
              ].map((suggestion, idx) => (
                <div
                  key={idx}
                  className="suggestion-item-row"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <span>{suggestion}</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Category search
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
