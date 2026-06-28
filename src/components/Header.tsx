import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    return location.pathname + location.search === path;
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        Inspired by You, Crafted for You • Free Shipping PAN India • Limited Stock
      </div>

      {/* Main Header */}
      <header className="header-wrapper">
        <div className="header-container">
          {/* Mobile burger button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="logo-text">
            AllStag<span className="logo-dot"></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`nav-item ${isActive('/shop') ? 'active' : ''}`}>
                <Link to="/shop">Shop All</Link>
              </li>
              <li className={`nav-item ${isActive('/shop?category=polos') ? 'active' : ''}`}>
                <Link to="/shop?category=polos">Knitted Polos</Link>
              </li>
              <li className={`nav-item ${isActive('/shop?category=tees') ? 'active' : ''}`}>
                <Link to="/shop?category=tees">Graphic Tees</Link>
              </li>
              <li className={`nav-item ${isActive('/shop?category=activewear') ? 'active' : ''}`}>
                <Link to="/shop?category=activewear">Activewear</Link>
              </li>
              <li className={`nav-item ${isActive('/track-order') ? 'active' : ''}`}>
                <Link to="/track-order">Track Order</Link>
              </li>
            </ul>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button 
              className="action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search Catalog"
            >
              <Search size={20} />
            </button>

            {/* Mock User Account */}
            <button 
              className="action-btn"
              onClick={() => alert("AllStag Client Account System: Authentication system mock. Customer profile features loaded.")}
              aria-label="User Account"
            >
              <User size={20} />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              className="action-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Search Bar Panel */}
      {isSearchOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 'calc(var(--header-height) + 31px)',
            left: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            borderBottom: '2px solid #000000',
            padding: '20px 24px',
            zIndex: 998,
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            animation: 'slideDown 0.25s ease-out'
          }}
        >
          <div className="container">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Search size={20} style={{ color: '#9c9c9c' }} />
              <input
                type="text"
                placeholder="Search premium streetwear (e.g. polo, graphic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'var(--font-sans)',
                  borderBottom: '1px solid #e5e5e5',
                  padding: '8px 0'
                }}
              />
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                style={{ padding: '8px' }}
              >
                <X size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer Sidebar */}
      <div 
        className={`cart-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ zIndex: 2004 }}
      ></div>
      
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="logo-text">AllStag</span>
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <ul className="mobile-nav-links" style={{ marginTop: '20px' }}>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/shop">Shop All</Link>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/shop?category=polos">Knitted Polos</Link>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/shop?category=tees">Graphic Tees</Link>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/shop?category=activewear">Activewear</Link>
          </li>
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/track-order">Track Order</Link>
          </li>
        </ul>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};
