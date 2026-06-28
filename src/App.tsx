import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { TrackOrder } from './pages/TrackOrder';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Global Header Elements */}
          <Header />
          
          {/* Sliding Cart Drawer Panel */}
          <CartDrawer />

          {/* Main Router Content */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Collection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/track-order" element={<TrackOrder />} />
            </Routes>
          </main>

          {/* Global Footer Elements */}
          <Footer />

          {/* Floating WhatsApp Support Widget */}
          <a 
            href="https://wa.me/919999999999?text=Hi%20AllStag%20Support!%20I%20have%20a%20question%20about%20my%20order." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-widget"
            aria-label="Chat on WhatsApp"
          >
            <span className="whatsapp-tooltip">Chat with Support</span>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12.012 2c-5.506 0-9.979 4.471-9.979 9.979 0 1.905.539 3.684 1.472 5.202l-1.505 5.501 5.631-1.479c1.47.886 3.18 1.396 5.012 1.396 5.506 0 9.979-4.471 9.979-9.979 0-5.507-4.473-9.979-9.979-9.979zm7.042 14.161c-.267.751-1.353 1.378-1.859 1.458-.456.072-.899.117-2.946-.689-2.617-1.031-4.298-3.702-4.43-3.876-.129-.176-1.054-1.401-1.054-2.671 0-1.272.663-1.895.899-2.146.236-.251.516-.314.689-.314s.344.004.494.011c.159.008.375-.061.587.452.217.525.746 1.82.81 1.954.064.133.106.288.017.466-.089.176-.134.288-.268.442-.134.156-.282.348-.403.468-.134.133-.274.278-.119.544.156.265.693 1.141 1.488 1.849.794.708 1.464.927 1.73.1.267-.266.311-.531.62-.531s.62.288 1.282.62c.663.332 1.106.554 1.216.732.111.176.111.751-.156 1.502z"/>
            </svg>
          </a>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
