import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add default size S (or first available size)
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultSize, 1);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={11} fill="currentColor" stroke="none" />);
      } else {
        stars.push(<Star key={i} size={11} stroke="currentColor" fill="none" style={{ opacity: 0.3 }} />);
      }
    }
    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-media">
        {/* Sale / New Badges */}
        {product.isSale && <span className="product-badge sale">Sale</span>}
        {product.isNew && <span className="product-badge new">New Drop</span>}

        {/* Hover Swapping Images */}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="product-card-img primary"
          loading="lazy"
        />
        {product.images[1] ? (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate`} 
            className="product-card-img secondary"
            loading="lazy"
          />
        ) : (
          <img 
            src={product.images[0]} 
            alt={`${product.name} alt-fallback`} 
            className="product-card-img secondary"
            loading="lazy"
            style={{ filter: 'brightness(0.9) contrast(1.05)' }}
          />
        )}

        {/* Quick Add Overlay */}
        {product.inStock ? (
          <button 
            className="product-card-quick-add"
            onClick={handleQuickAdd}
          >
            + Quick Add Size {product.sizes[0] || 'M'}
          </button>
        ) : (
          <div className="product-card-quick-add" style={{ backgroundColor: 'rgba(214, 58, 47, 0.95)', transform: 'translateY(0)' }}>
            Sold Out
          </div>
        )}
      </div>

      <div className="product-card-details">
        <span className="product-card-category">{product.categoryLabel}</span>
        <h3 className="product-card-title">{product.name}</h3>

        {/* Ratings */}
        <div className="product-card-rating">
          <span className="rating-stars">{renderStars(product.rating)}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Price Tag */}
        <div className="product-card-price-container">
          {product.originalPrice ? (
            <>
              <span className="product-price-sale">₹{product.price}</span>
              <span className="product-price-original">₹{product.originalPrice}</span>
            </>
          ) : (
            <span>₹{product.price}</span>
          )}
        </div>

        {/* Size Badges Swatches */}
        <div className="product-card-sizes">
          {product.sizes.map((size) => (
            <span className="size-badge" key={size}>{size}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};
