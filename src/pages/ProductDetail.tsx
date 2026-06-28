import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldAlert, ShoppingBag, Truck, Undo, HelpCircle, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  // Find product
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ marginTop: '150px', marginBottom: '100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', textTransform: 'uppercase', marginBottom: '16px' }}>Product Not Found</h2>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          The product drop you are looking for might have sold out or been removed.
        </p>
        <Link to="/shop" className="btn-premium-dark">Back to Shop All</Link>
      </div>
    );
  }

  // Active state hooks
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | ''>('');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'reviews'>('details');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);

  // Calculator States
  const [modalTab, setModalTab] = useState<'table' | 'calculator'>('table');
  const [heightVal, setHeightVal] = useState('');
  const [weightVal, setWeightVal] = useState('');
  const [prefVal, setPrefVal] = useState<'tight' | 'regular' | 'oversized'>('regular');
  const [calculatedSize, setCalculatedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | ''>('');

  const runCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(heightVal);
    const w = parseFloat(weightVal);
    if (!h || !w) return;

    let baseSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' = 'M';
    if (w < 60) baseSize = 'S';
    else if (w >= 60 && w < 72) baseSize = 'M';
    else if (w >= 72 && w < 84) baseSize = 'L';
    else if (w >= 84 && w < 95) baseSize = 'XL';
    else baseSize = 'XXL';

    if (h > 185 && baseSize === 'S') baseSize = 'M';
    if (h > 190 && (baseSize === 'M' || baseSize === 'S')) baseSize = 'L';

    const sizesArr: ('S' | 'M' | 'L' | 'XL' | 'XXL')[] = ['S', 'M', 'L', 'XL', 'XXL'];
    let finalIdx = sizesArr.indexOf(baseSize);
    
    if (prefVal === 'tight') {
      finalIdx = Math.max(0, finalIdx - 1);
    } else if (prefVal === 'oversized') {
      finalIdx = Math.min(sizesArr.length - 1, finalIdx + 1);
    }

    setCalculatedSize(sizesArr[finalIdx]);
  };

  // Reset states on product changes
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize('');
    setQty(1);
    // Reset calculator
    setHeightVal('');
    setWeightVal('');
    setPrefVal('regular');
    setCalculatedSize('');
    setModalTab('table');
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product, selectedSize, qty);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size before proceeding to checkout.");
      return;
    }
    setIsBuyNowLoading(true);
    setTimeout(() => {
      setIsBuyNowLoading(false);
      alert(`Express Checkout Successful!\nItem: ${product.name} (Size: ${selectedSize})\nPrice Paid: ₹${(product.price * qty).toFixed(2)}\nPan-India Delivery initialized.`);
      setSelectedSize('');
      setQty(1);
    }, 2000);
  };

  // Get similar products for recommendation
  const recommendedProducts = PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Rating Stars Builder
  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={13} fill="currentColor" stroke="none" />);
      } else {
        stars.push(<Star key={i} size={13} stroke="currentColor" fill="none" style={{ opacity: 0.3 }} />);
      }
    }
    return stars;
  };

  return (
    <div className="product-detail-page container">
      {/* Breadcrumbs path */}
      <div style={{ fontSize: '11px', textTransform: 'uppercase', marginBottom: '32px', color: 'var(--color-text-tertiary)' }}>
        <Link to="/" style={{ color: 'inherit' }}>Home</Link> /{' '}
        <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link> /{' '}
        <Link to={`/shop?category=${product.category}`} style={{ color: 'inherit' }}>{product.categoryLabel}</Link> /{' '}
        <span style={{ color: 'var(--color-text-primary)' }}>{product.name}</span>
      </div>

      {/* Main product columns */}
      <div className="product-detail-grid">
        {/* Left Column: Gallery thumbnails & main image */}
        <div className="product-detail-gallery">
          <div className="gallery-thumbnails">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`gallery-thumbnail-btn ${idx === activeImageIdx ? 'active' : ''}`}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt="" className="gallery-thumbnail-img" />
              </button>
            ))}
          </div>

          <div className="gallery-main-image-container">
            <img 
              src={product.images[activeImageIdx]} 
              alt={product.name} 
              className="gallery-main-img"
            />
          </div>
        </div>

        {/* Right Column: Buying parameters panel */}
        <div className="product-info-panel">
          <div>
            {product.tagline && (
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-sale)',
                display: 'block',
                marginBottom: '8px'
              }}>
                {product.tagline}
              </span>
            )}
            <h1 className="product-detail-title">{product.name}</h1>
            <span className="product-detail-category">{product.categoryLabel}</span>
          </div>

          {/* Ratings */}
          <div className="product-detail-rating">
            <span className="rating-stars" style={{ color: '#ffb800', display: 'flex' }}>
              {renderStars(product.rating)}
            </span>
            <span style={{ fontWeight: 700 }}>{product.rating}</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}>({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Prices */}
          <div className="product-detail-price">
            {product.originalPrice ? (
              <>
                <span style={{ color: 'var(--color-accent-sale)' }}>₹{product.price}</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-tertiary)', fontSize: '18px' }}>₹{product.originalPrice}</span>
                <span className="sale-badge">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            ) : (
              <span>₹{product.price}</span>
            )}
          </div>

          {/* Color representation swatch */}
          {product.color && (
            <div className="selector-section">
              <span className="selector-title">Color: <strong>{product.color}</strong></span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span 
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: product.colorHex || '#000000',
                    border: '2px solid var(--color-text-primary)',
                    display: 'block',
                    boxShadow: '0 0 0 2px #ffffff inset'
                  }}
                  title={product.color}
                ></span>
              </div>
            </div>
          )}

          {/* Size Selector Swatches */}
          <div className="selector-section">
            <div className="selector-header">
              <span className="selector-title">Select Size</span>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                className="size-chart-link"
              >
                Size Guide
              </button>
            </div>
            
            <div className="size-selector-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-selector-btn ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector picker */}
          <div className="selector-section">
            <span className="selector-title">Quantity</span>
            <div className="qty-picker">
              <button 
                className="qty-picker-btn"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-picker-value">{qty}</span>
              <button 
                className="qty-picker-btn"
                onClick={() => setQty(Math.min(product.stockCount, qty + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Low Stock Urgent Warning Banner */}
          {product.stockCount <= 5 && product.inStock && (
            <div className="stock-urgency-banner">
              <ShieldAlert size={16} />
              <span>Hurry! Only {product.stockCount} left in stock. Grab yours before it's gone!</span>
            </div>
          )}

          {/* Buying CTA Buttons */}
          <div className="actions-container">
            {product.inStock ? (
              <>
                <button 
                  onClick={handleAddToCart}
                  className="btn-add-to-cart"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="btn-buy-now"
                  disabled={isBuyNowLoading}
                >
                  {isBuyNowLoading ? (
                    <span>PROCESSING CHECKOUT...</span>
                  ) : (
                    <>
                      <span>EXPRESS BUY IT NOW</span>
                      <span style={{ fontSize: '9px', fontWeight: '400', letterSpacing: '0.05em', color: 'var(--color-accent-lime)', textTransform: 'initial', marginTop: '2px' }}>
                        Pay via UPI / Debit / Card / COD
                      </span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <button className="btn-buy-now" style={{ backgroundColor: 'var(--color-accent-sale)', color: '#fff', cursor: 'not-allowed' }} disabled>
                SOLD OUT
              </button>
            )}
          </div>

          {/* WhatsApp Share option */}
          <a
            href={`https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20streetwear%20drop%20from%20AllStag%3A%20${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#25d366',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              border: '1px solid #25d366',
              borderRadius: '50px',
              padding: '12px 0',
              marginTop: '8px',
              transition: 'all var(--transition-fast)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.012 2c-5.506 0-9.979 4.471-9.979 9.979 0 1.905.539 3.684 1.472 5.202l-1.505 5.501 5.631-1.479c1.47.886 3.18 1.396 5.012 1.396 5.506 0 9.979-4.471 9.979-9.979 0-5.507-4.473-9.979-9.979-9.979zm7.042 14.161c-.267.751-1.353 1.378-1.859 1.458-.456.072-.899.117-2.946-.689-2.617-1.031-4.298-3.702-4.43-3.876-.129-.176-1.054-1.401-1.054-2.671 0-1.272.663-1.895.899-2.146.236-.251.516-.314.689-.314s.344.004.494.011c.159.008.375-.061.587.452.217.525.746 1.82.81 1.954.064.133.106.288.017.466-.089.176-.134.288-.268.442-.134.176-.134.288-.268.442-.134.156-.282.348-.403.468-.134.133-.274.278-.119.544.156.265.693 1.141 1.488 1.849.794.708 1.464.927 1.73.1.267-.266.311-.531.62-.531s.62.288 1.282.62c.663.332 1.106.554 1.216.732.111.176.111.751-.156 1.502z"/>
            </svg>
            Share via WhatsApp
          </a>

          {/* Tabbed Info Accordion details */}
          <div className="info-accordion">
            {/* Header tab buttons */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-light)' }}>
              <button 
                onClick={() => setActiveTab('details')}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  borderBottom: activeTab === 'details' ? '2px solid #000' : 'none',
                  color: activeTab === 'details' ? '#000' : 'var(--color-text-tertiary)'
                }}
              >
                Product Details
              </button>
              <button 
                onClick={() => setActiveTab('shipping')}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  borderBottom: activeTab === 'shipping' ? '2px solid #000' : 'none',
                  color: activeTab === 'shipping' ? '#000' : 'var(--color-text-tertiary)'
                }}
              >
                Shipping & Returns
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  borderBottom: activeTab === 'reviews' ? '2px solid #000' : 'none',
                  color: activeTab === 'reviews' ? '#000' : 'var(--color-text-tertiary)'
                }}
              >
                Reviews ({product.reviewsCount})
              </button>
            </div>

            {/* Content area */}
            <div style={{ paddingTop: '20px' }}>
              {activeTab === 'details' && (
                <div className="accordion-content">
                  <p style={{ marginBottom: '16px' }}>{product.description}</p>
                  <ul>
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="accordion-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Truck size={18} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>Free PAN-India shipping</strong>
                      <p style={{ fontSize: '12px', marginTop: '2px' }}>Estimated delivery within 3-5 business days.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Undo size={18} style={{ flexShrink: 0 }} />
                    <div>
                      <strong>7-Day Easy Returns</strong>
                      <p style={{ fontSize: '12px', marginTop: '2px' }}>Hassle-free size exchanges and returns. Tag must remain attached.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="accordion-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderBottom: '1px solid var(--color-border-light)', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>Amit S.</strong>
                      <span style={{ color: '#ffb800' }}>★★★★★</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                      "Perfect fit, premium heavy cotton feel. Puff print detail is high definition and stands out."
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong>Neha V.</strong>
                      <span style={{ color: '#ffb800' }}>★★★★★</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                      "Exchanged size from M to S and customer care solved it instantly. Love the drop shoulders fit!"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended products cross sell list */}
      {recommendedProducts.length > 0 && (
        <section className="section-padding" style={{ borderTop: '1px solid var(--color-border-light)', marginTop: '60px' }}>
          <h2 style={{ fontSize: '28px', textTransform: 'uppercase', marginBottom: '32px' }}>
            Complete <em>The Look</em>
          </h2>
          <div className="product-grid">
            {recommendedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Chart Modal Popup */}
      <div className={`modal-overlay ${isSizeChartOpen ? 'open' : ''}`} onClick={() => setIsSizeChartOpen(false)}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ overflowY: 'auto', maxHeight: '90vh' }}>
          <button className="modal-close" onClick={() => setIsSizeChartOpen(false)}>
            <X size={20} />
          </button>
          
          <h3 className="modal-title" style={{ marginBottom: '16px' }}>Size & Fit Guide</h3>
          
          {/* Modal Tab Switchers */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-light)', marginBottom: '24px' }}>
            <button
              onClick={() => setModalTab('table')}
              style={{
                flex: 1,
                padding: '10px 0',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: modalTab === 'table' ? '2px solid #000' : 'none',
                color: modalTab === 'table' ? '#000' : 'var(--color-text-tertiary)'
              }}
            >
              Size Chart Table
            </button>
            <button
              onClick={() => setModalTab('calculator')}
              style={{
                flex: 1,
                padding: '10px 0',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: modalTab === 'calculator' ? '2px solid #000' : 'none',
                color: modalTab === 'calculator' ? '#000' : 'var(--color-text-tertiary)'
              }}
            >
              Fit Finder Calculator
            </button>
          </div>

          {modalTab === 'table' ? (
            <>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                Measurements are listed in inches. Sizing runs slightly oversized for a streetwear drop-shoulder fit.
              </p>

              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (in)</th>
                    <th>Length (in)</th>
                    <th>Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>40</td>
                    <td>27.5</td>
                    <td>19.5</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>42</td>
                    <td>28.5</td>
                    <td>20.5</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>44</td>
                    <td>29.5</td>
                    <td>21.5</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>46</td>
                    <td>30.5</td>
                    <td>22.5</td>
                  </tr>
                  <tr>
                    <td><strong>XXL</strong></td>
                    <td>48</td>
                    <td>31.5</td>
                    <td>23.5</td>
                  </tr>
                </tbody>
              </table>
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-sans)', color: 'var(--color-accent-sale)', fontWeight: 700 }}>
                <HelpCircle size={14} />
                <span>Note: If you prefer a regular fit instead of oversized, order one size down.</span>
              </div>
            </>
          ) : (
            <div style={{ fontFamily: 'var(--font-sans)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                Enter your height and weight to dynamically compute your recommended size.
              </p>
              
              <form onSubmit={runCalculator} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '11px' }}>Height (cm)</label>
                    <input 
                      type="number" 
                      required 
                      min="100" 
                      max="250"
                      placeholder="e.g. 175"
                      value={heightVal}
                      onChange={(e) => setHeightVal(e.target.value)}
                      className="form-input"
                      style={{ padding: '10px 12px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '11px' }}>Weight (kg)</label>
                    <input 
                      type="number" 
                      required 
                      min="30" 
                      max="200"
                      placeholder="e.g. 70"
                      value={weightVal}
                      onChange={(e) => setWeightVal(e.target.value)}
                      className="form-input"
                      style={{ padding: '10px 12px' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '11px' }}>Fit Preference</label>
                  <select
                    value={prefVal}
                    onChange={(e: any) => setPrefVal(e.target.value)}
                    className="filter-select"
                    style={{ width: '100%', height: '40px', padding: '0 12px' }}
                  >
                    <option value="tight">Slim/Tight Fit</option>
                    <option value="regular">Regular Streetwear Fit</option>
                    <option value="oversized">Oversized/Relaxed Fit</option>
                  </select>
                </div>

                <button type="submit" className="btn-premium-dark" style={{ height: '44px', fontSize: '12px' }}>
                  Find My Perfect Fit
                </button>
              </form>

              {calculatedSize && (
                <div style={{
                  marginTop: '24px',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '2px dashed var(--color-border)',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Size</span>
                  <div style={{ fontSize: '36px', fontWeight: 800, margin: '8px 0', color: 'var(--color-text-primary)' }}>
                    {calculatedSize}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                    Based on your details, size <strong>{calculatedSize}</strong> will provide your desired fit.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedSize(calculatedSize);
                      setIsSizeChartOpen(false);
                    }}
                    className="btn-premium"
                    style={{ width: '100%', height: '40px', fontSize: '11px', display: 'flex', justifyContent: 'center' }}
                  >
                    Select Size {calculatedSize}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
