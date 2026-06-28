import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export const Collection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active filters from URL search params
  const categoryFilter = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  // Local state filters (size, price, sort)
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Available size list
  const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

  // Categories helper list
  const CATEGORIES = [
    { value: 'all', label: 'All Products' },
    { value: 'polos', label: 'Knitted Polos' },
    { value: 'tees', label: 'Graphic Tees' },
    { value: 'activewear', label: 'Active Wear' },
    { value: 'tanks', label: 'Ribbed Tanks' }
  ];

  // Handler for category clicks
  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    // Clear search query when changing categories
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query)
      );
    }

    // Filter by Size
    if (selectedSize !== 'all') {
      result = result.filter(p => p.sizes.includes(selectedSize as any));
    }

    // Filter by Price Range
    if (selectedPriceRange !== 'all') {
      if (selectedPriceRange === 'under-1000') {
        result = result.filter(p => p.price < 1000);
      } else if (selectedPriceRange === '1000-2000') {
        result = result.filter(p => p.price >= 1000 && p.price <= 2000);
      } else if (selectedPriceRange === 'over-2000') {
        result = result.filter(p => p.price > 2000);
      }
    }

    // Sort operations
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryFilter, searchQuery, selectedSize, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSelectedSize('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
    searchParams.delete('category');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Label for current collection header
  const getCollectionLabel = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    const cat = CATEGORIES.find(c => c.value === categoryFilter);
    return cat ? cat.label : 'All Products';
  };

  return (
    <div className="collection-page container">
      {/* Collection Header */}
      <div className="collection-header">
        <h1 className="collection-title">{getCollectionLabel()}</h1>
        <p className="collection-desc">
          High-performance streetwear and premium loungewear inspired by urban culture. Tailored cuts, heavy duty knits, and puff-printed statements designed to elevate your everyday aesthetics.
        </p>
      </div>

      {/* Filter and Sorting Options Bar */}
      <div className="filter-bar">
        <div className="filters-group">
          {/* Categories Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="filter-label">Category</span>
            <select 
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="filter-select"
            >
              {CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Price Range Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="filter-label">Price Range</span>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Prices</option>
              <option value="under-1000">Under ₹1,000</option>
              <option value="1000-2000">₹1,000 - ₹2,000</option>
              <option value="over-2000">Over ₹2,000</option>
            </select>
          </div>

          {/* Size Filter Selector buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="filter-label">Filter Size</span>
            <div className="size-filter-options">
              <button 
                className={`size-filter-btn ${selectedSize === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedSize('all')}
              >
                All
              </button>
              {SIZES.map(s => (
                <button
                  key={s}
                  className={`size-filter-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sorting Dropdown selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span className="filter-label">Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="featured">Featured drops</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Results */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <span className="results-count">Showing {filteredProducts.length} items</span>
        {(selectedSize !== 'all' || selectedPriceRange !== 'all' || categoryFilter !== 'all' || searchQuery) && (
          <button 
            onClick={resetFilters}
            style={{ textDecoration: 'underline', fontSize: '12px', fontWeight: 700 }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '18px', textTransform: 'uppercase' }}>No Products Found</h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            We couldn't find any products matching your specific filter parameters. Try clearing filters.
          </p>
          <button onClick={resetFilters} className="btn-premium-dark">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="product-grid" style={{ marginBottom: '80px' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
