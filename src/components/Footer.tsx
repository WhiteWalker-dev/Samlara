import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="container section-padding">
        <div className="footer-top">
          {/* Column 1: Brand story */}
          <div className="footer-col">
            <h4 className="footer-heading">AllStag Story</h4>
            <p className="footer-about">
              Inspired by you, crafted for you. AllStag is a community-driven premium streetwear and casual apparel brand. We design based on your feedback and support local causes through our 1% for Good initiative.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li><Link to="/shop">Shop All Products</Link></li>
              <li><Link to="/shop?category=polos">Knitted Polos</Link></li>
              <li><Link to="/shop?category=tees">Oversized Graphic Tees</Link></li>
              <li><Link to="/shop?category=activewear">Premium Activewear</Link></li>
              <li><Link to="/shop?category=tanks">Ribbed Tanks</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><Link to="/track-order">Track Your Order</Link></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); alert("Mock support chat initiated.")}}>Chat with Support</a></li>
              <li><a href="#">Size Guides</a></li>
              <li><a href="#">Shipping & Deliveries</a></li>
              <li><a href="#">Returns & Refund Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col">
            <h4 className="footer-heading">Drop Updates</h4>
            <p className="footer-newsletter-text">
              Subscribe to get notified about secret collection drops, early access, and street style news.
            </p>
            {subscribed ? (
              <div style={{
                backgroundColor: 'rgba(172, 252, 109, 0.1)',
                color: 'var(--color-accent-lime)',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                border: '1px solid var(--color-accent-lime)'
              }}>
                ✓ Subscribed! Check your inbox for early access code.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  aria-label="Newsletter email address"
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <p>© {new Date().getFullYear()} AllStag. Inspired by You, Crafted for You.</p>
          <div className="payment-badges">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">COD</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">RUPAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
