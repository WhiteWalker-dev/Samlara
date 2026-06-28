import { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Gift, Timer } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQty, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen,
    clearCart 
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (!isCartOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCartOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ALLSTAG10') {
      setDiscountAmount(cartTotal * 0.1);
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.trim()) {
      setPromoError('Invalid promo code. Try "ALLSTAG10".');
      setPromoApplied(false);
      setDiscountAmount(0);
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutLoading(true);
    setTimeout(() => {
      setIsCheckoutLoading(false);
      alert(`Express Checkout Successful!\nTotal Paid: ₹${finalTotal.toFixed(2)}\nOrder reference simulated. Shipping timeline initialized.`);
      clearCart();
      setIsCartOpen(false);
      setPromoCode('');
      setPromoApplied(false);
      setDiscountAmount(0);
    }, 2000);
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Slider Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} />
            <h3 className="cart-drawer-title">Your Cart</h3>
            <span style={{
              fontSize: '11px',
              backgroundColor: 'var(--color-bg-secondary)',
              padding: '2px 8px',
              borderRadius: '10px',
              fontWeight: 700
            }}>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>
          <button 
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-items">
          {cartItems.length > 0 && (
            <>
              {/* Promo code countdown timer banner */}
              <div style={{
                backgroundColor: 'rgba(214, 58, 47, 0.05)',
                border: '1px solid rgba(214, 58, 47, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-accent-sale)',
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Timer size={14} />
                  <span>CLAIM 10% OFF EXTRA CODE: <strong>ALLSTAG10</strong></span>
                </div>
                <span>{formatTime(timeLeft)}</span>
              </div>

              {/* Free gift progress bar */}
              <div style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-light)',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '12px',
                marginBottom: '20px',
                fontFamily: 'var(--font-sans)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                  <Gift size={15} style={{ color: 'var(--color-text-primary)' }} />
                  {cartTotal >= 3000 ? (
                    <span style={{ color: '#1f9c24' }}>✓ FREE ALLSTAG STICKER PACK UNLOCKED!</span>
                  ) : (
                    <span>Add <strong>₹{(3000 - cartTotal)}</strong> more for a free sticker pack!</span>
                  )}
                </div>
                <div style={{
                  height: '6px',
                  backgroundColor: 'var(--color-border-light)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(100, (cartTotal / 3000) * 100)}%`,
                    height: '100%',
                    backgroundColor: cartTotal >= 3000 ? '#1f9c24' : 'var(--color-text-primary)',
                    borderRadius: '3px',
                    transition: 'width var(--transition-normal)'
                  }}></div>
                </div>
              </div>
            </>
          )}

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag className="cart-empty-icon" />
              <p style={{ fontWeight: 700 }}>Your cart is empty</p>
              <p style={{ fontSize: '12px', textAlign: 'center', fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                Browse our collection drops to add premium streetwear apparel.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-premium-dark"
                style={{ padding: '12px 30px', fontSize: '11px' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={`${item.product.id}-${item.size}`}>
                <div className="cart-item-img-container">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="cart-item-img"
                  />
                </div>
                
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.product.name}</span>
                  <span className="cart-item-meta">Size: <strong>{item.size}</strong> | Color: {item.product.color || 'Default'}</span>
                  <span className="cart-item-price">₹{item.product.price}</span>
                  
                  {/* Quantity adjustment buttons */}
                  <div className="cart-item-qty">
                    <button 
                      className="cart-qty-btn"
                      onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button 
                      className="cart-qty-btn"
                      onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>

                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.product.id, item.size)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary panel */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Coupon Mocks */}
            <form onSubmit={applyPromo} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="PROMO CODE (ALLSTAG10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                style={{
                  flex: 1,
                  border: '1px solid var(--color-border-light)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontSize: '11px',
                  backgroundColor: '#ffffff',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}
              />
              <button 
                type="submit" 
                disabled={promoApplied}
                className="btn-premium-dark"
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '11px', 
                  borderRadius: '4px',
                  opacity: promoApplied ? 0.5 : 1
                }}
              >
                Apply
              </button>
            </form>
            {promoError && <p style={{ fontSize: '11px', color: 'var(--color-accent-sale)', fontWeight: 700 }}>{promoError}</p>}
            {promoApplied && (
              <p style={{ fontSize: '11px', color: '#1F9C24', fontWeight: 700 }}>
                Promo code applied! 10% discount saved.
              </p>
            )}

            {/* Calculations details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '12px' }}>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="cart-summary-row" style={{ color: 'var(--color-accent-sale)' }}>
                  <span>Discount</span>
                  <span>- ₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span style={{ color: '#1F9C24', fontWeight: 700 }}>FREE</span>
              </div>
            </div>

            <div className="cart-summary-row cart-summary-total">
              <span>Grand Total</span>
              <span>₹{finalTotal.toFixed(0)}</span>
            </div>

            <p className="cart-shipping-notice">
              🔒 Checkout integrated via express checkout. Taxes and free pan-India shipping calculated in summary.
            </p>

            <button 
              className="gokwik-buy-btn"
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
            >
              {isCheckoutLoading ? (
                <span>PROCESSING CHECKOUT...</span>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span>EXPRESS CHECKOUT</span>
                  <span className="gokwik-accent-text">Pay via UPI / Cards / COD</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
