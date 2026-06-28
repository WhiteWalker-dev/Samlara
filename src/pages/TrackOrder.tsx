import { useState } from 'react';
import { Package, Truck, MapPin } from 'lucide-react';

interface TrackingStatus {
  step: number;
  title: string;
  desc: string;
  date: string;
  completed: boolean;
  active: boolean;
}

export const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingStatus[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;

    setLoading(true);
    setTrackingData(null);
    setSearched(false);

    // Simulate database lookup
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
      
      // Simulate generic timelines
      const mockTimeline: TrackingStatus[] = [
        {
          step: 1,
          title: 'Order Confirmed',
          desc: 'Your payment was approved and the order is registered.',
          date: 'June 26, 2026 - 11:24 AM',
          completed: true,
          active: false
        },
        {
          step: 2,
          title: 'Packed & Processed',
          desc: 'Items checked for premium quality assurance and packed at Gurgaon warehouse.',
          date: 'June 27, 2026 - 09:15 AM',
          completed: true,
          active: false
        },
        {
          step: 3,
          title: 'Dispatched via Shiprocket',
          desc: 'Consignment handed over to Delivery Courier Partner. Tracking ID: SR8907654.',
          date: 'June 27, 2026 - 04:30 PM',
          completed: true,
          active: true
        },
        {
          step: 4,
          title: 'Out For Delivery',
          desc: 'Courier agent has loaded your parcel. Delivery scheduled today.',
          date: 'Pending courier updates',
          completed: false,
          active: false
        },
        {
          step: 5,
          title: 'Delivered',
          desc: 'Parcel signed for and delivered. Enjoy your AllStag drops!',
          date: 'Pending delivery',
          completed: false,
          active: false
        }
      ];

      setTrackingData(mockTimeline);
    }, 1500);
  };

  return (
    <div className="track-order-page container">
      <div className="track-container">
        <h1 className="track-title">Track Order</h1>
        <p className="track-subtitle">Enter order details sent in your confirmation email or SMS.</p>
        
        <form onSubmit={handleTrack} className="track-form">
          <div className="form-group">
            <label className="form-label">Order Number</label>
            <input 
              type="text" 
              required
              placeholder="e.g. AS-2026-987"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email or Phone Number</label>
            <input 
              type="email" 
              required
              placeholder="e.g. buyer@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-track" disabled={loading}>
            {loading ? 'Searching Database...' : 'Track My Drops'}
          </button>
        </form>

        {/* Results Timeline Mockups */}
        {searched && trackingData && (
          <div className="tracking-result-panel">
            <div style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              border: '1px solid var(--color-border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Package size={14} />
                <span>Order Reference: <strong>{orderId.toUpperCase()}</strong></span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Truck size={14} />
                <span>Courier: <strong>Shiprocket Express (Air)</strong></span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <MapPin size={14} />
                <span>Destination: <strong>Pan-India Shipping (Registered Address)</strong></span>
              </div>
            </div>

            <h4 style={{ textTransform: 'uppercase', fontSize: '13px' }}>Delivery Status Timeline</h4>
            
            <div className="tracking-timeline">
              {trackingData.map((step) => (
                <div 
                  key={step.step} 
                  className={`timeline-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}
                >
                  <div className="timeline-dot">
                    {step.completed && !step.active ? '✓' : ''}
                  </div>
                  
                  <div className="timeline-info">
                    <span className="timeline-title">{step.title}</span>
                    <span className="timeline-desc">{step.desc}</span>
                    <span className="timeline-date">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
