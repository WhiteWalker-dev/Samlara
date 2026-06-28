import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

interface HeroSlide {
  id: number;
  tag: string;
  titleHtml: string;
  desc: string;
  image: string;
  link: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: "SUMMER DROP '26",
    titleHtml: "Inspired by <em>You</em>,<br/>Crafted for <em>You</em>",
    desc: "Welcome to AllStag—where each design is a dialogue and every fabric tells your story. Explore our latest heavyweight drop tailored for the modern street aesthetics.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&auto=format&fit=crop&q=80",
    link: "/shop"
  },
  {
    id: 2,
    tag: "RESTOCK ALERT",
    titleHtml: "Old Money<br/><em>Knitted Polos</em>",
    desc: "The vintage resort collar luxury knitted polo returns. Crafted with premium cotton-blend fibers for maximum drape, texture, and breathability.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&auto=format&fit=crop&q=80",
    link: "/shop?category=polos"
  },
  {
    id: 3,
    tag: "STREET CULTURE",
    titleHtml: "Oversized<br/><em>Graphic Tees</em>",
    desc: "Engineered with 240 GSM organic ring-spun cotton. Pre-shrunk and built to last. Express your vibe with high-density puff printed illustrations.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&auto=format&fit=crop&q=80",
    link: "/shop?category=tees"
  }
];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Get 4 featured products for bestsellers
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="hero-slider">
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
          >
            <div className="hero-image-overlay"></div>
            <img src={slide.image} alt={slide.tag} className="hero-img" />
            <div className="hero-content">
              <span className="hero-tag">{slide.tag}</span>
              <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: slide.titleHtml }}></h1>
              <p className="hero-description">{slide.desc}</p>
              <Link to={slide.link} className="btn-premium">
                Shop The Drop <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}

        {/* Carousel Navigation buttons */}
        <div className="hero-nav">
          <button className="hero-nav-btn" onClick={handlePrev} aria-label="Previous Slide">
            <ChevronLeft size={20} />
          </button>
          <button className="hero-nav-btn" onClick={handleNext} aria-label="Next Slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Featured Categories Grid Section */}
      <section className="section-padding container">
        <h2 className="category-section-title">
          Explore <em>Collections</em>
        </h2>
        
        <div className="category-grid">
          {/* Card 1: Polos */}
          <Link to="/shop?category=polos" className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80" 
              alt="Polos Category" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <span className="category-card-tag">Vintage Style</span>
              <h3 className="category-card-title">Knitted Polos</h3>
              <span className="category-card-link">View Drop <ArrowRight size={12} /></span>
            </div>
          </Link>

          {/* Card 2: Tees */}
          <Link to="/shop?category=tees" className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80" 
              alt="Graphic Tees Category" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <span className="category-card-tag">Streetwear</span>
              <h3 className="category-card-title">Graphic Tees</h3>
              <span className="category-card-link">View Drop <ArrowRight size={12} /></span>
            </div>
          </Link>

          {/* Card 3: Active Wear */}
          <Link to="/shop?category=activewear" className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80" 
              alt="Activewear Category" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <span className="category-card-tag">Performance</span>
              <h3 className="category-card-title">Active Wear</h3>
              <span className="category-card-link">View Drop <ArrowRight size={12} /></span>
            </div>
          </Link>

          {/* Card 4: Tanks */}
          <Link to="/shop?category=tanks" className="category-card">
            <img 
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80" 
              alt="Tanks Category" 
              className="category-card-img"
            />
            <div className="category-card-info">
              <span className="category-card-tag">Base Layer</span>
              <h3 className="category-card-title">Ribbed Tanks</h3>
              <span className="category-card-link">View Drop <ArrowRight size={12} /></span>
            </div>
          </Link>
        </div>
      </section>

      {/* Best Sellers Product Grid Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                TRENDING NOW
              </span>
              <h2 style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '8px' }}>
                Best <em>Sellers</em>
              </h2>
            </div>
            <Link to="/shop" className="btn-premium" style={{ padding: '12px 28px', fontSize: '11px' }}>
              View All Products
            </Link>
          </div>

          <div className="product-grid">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 1% For Good Impact Banner Section */}
      <section className="impact-banner section-padding">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-content">
              <span className="impact-tag">COMMUNITY FIRST</span>
              <h2 className="impact-title">AllStag 1% <em>for Good</em></h2>
              <p className="impact-desc">
                We believe streetwear is more than just clothing—it's a lifestyle and a responsibility. Every piece you buy is part of a dialogue between our designers and you. To complete the circle, 1% of all order revenues goes directly toward empowering local communities and environmental causes.
              </p>
              
              <div className="impact-stats">
                <div className="stat-item">
                  <div className="stat-number">₹15L+</div>
                  <div className="stat-label">Donated to charity</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Inspired by you</div>
                </div>
              </div>
            </div>

            <div className="impact-image-container">
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80" 
                alt="Community and Sustainability Initiatives" 
                className="impact-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Review Slider Section */}
      <section className="reviews-section section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
              VERIFIED BUYERS
            </span>
            <h2 style={{ fontSize: '36px', textTransform: 'uppercase', marginTop: '8px' }}>
              What The <em>Stag</em> Says
            </h2>
          </div>

          <div className="reviews-slider">
            {/* Review 1 */}
            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">Rahul M.</span>
                <span className="review-rating">★★★★★</span>
              </div>
              <p className="review-text">
                "The knit polo is insane! Feels super heavy and expensive. The resort collar sits perfectly, got tons of compliments on the Sand Beige one."
              </p>
              <span className="review-product-link">Purchased: Old Money Knitted Polo</span>
            </div>

            {/* Review 2 */}
            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">Sneha K.</span>
                <span className="review-rating">★★★★★</span>
              </div>
              <p className="review-text">
                "Oversized fits are usually hit or miss, but the Racing Club graphic tee is a 10/10. Heavyweight 240 GSM organic cotton that doesn't lose shape after washing."
              </p>
              <span className="review-product-link">Purchased: AllStag Racing Club Graphic Tee</span>
            </div>

            {/* Review 3 */}
            <div className="review-card">
              <div className="review-header">
                <span className="reviewer-name">Aryan B.</span>
                <span className="review-rating">★★★★★</span>
              </div>
              <p className="review-text">
                "Express checkout was fast and simple. Got my crop joggers within 3 days. Super comfortable for runs and casual streetwear."
              </p>
              <span className="review-product-link">Purchased: Pro-Active Street Joggers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Street Style Gallery */}
      <section className="section-padding container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', textTransform: 'uppercase' }}>
            Tagged on <em>Instagram</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
            Tag us <strong>@AllStagStyle</strong> to get featured in our streetwear community showcase.
          </p>
        </div>

        <div className="instagram-grid">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80" 
            alt="Streetwear model" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <img 
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80" 
            alt="Streetwear outfit" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&auto=format&fit=crop&q=80" 
            alt="Knit polo aesthetic" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <img 
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80" 
            alt="Street apparel" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      </section>

      {/* Brand Value Assurances */}
      <section style={{ borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', padding: '40px 0', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={28} style={{ color: 'var(--color-text-primary)' }} />
            <div>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase' }}>100% Authentic Quality</h4>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-text-secondary)' }}>Premium fabrics & custom prints</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Heart size={28} style={{ color: 'var(--color-accent-sale)' }} />
            <div>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase' }}>Community Driven</h4>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-text-secondary)' }}>Designed based on your feedback</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={28} style={{ color: 'var(--color-accent-yellow)' }} />
            <div>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase' }}>Secret Drops</h4>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-text-secondary)' }}>Limited collections, zero restocks</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
