import React, { useState } from 'react';
import { useCart } from '../hooks/useCart.js';
import { checkout, getUser } from '../api.js';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const user = getUser();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await checkout({ items, total });
      setOrderStatus({ success: true, id: res.orderId });
      clearCart();
    } catch (err) {
      setOrderStatus({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade section-container">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px' }}>Transport <span className="text-primary">Container</span></h1>
        <p className="text-muted">Review and authorize asset dispatch.</p>
      </header>

      {orderStatus ? (
        <div className="card text-center" style={{ padding: '60px' }}>
          {orderStatus.success ? (
            <>
              <div className="text-accent" style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
              <h2 style={{ marginBottom: '16px' }}>DISPATCH_CONFIRMED</h2>
              <p className="text-muted" style={{ marginBottom: '32px' }}>
                Order ID: <span className="text-primary">{orderStatus.id}</span>
              </p>
              <Link to="/shop" className="btn btn-primary">Procure More Assets</Link>
            </>
          ) : (
            <>
              <div className="text-danger" style={{ fontSize: '48px', marginBottom: '24px' }}>⚠</div>
              <h2 style={{ marginBottom: '16px' }}>ACCESS_DENIED</h2>
              <p className="text-muted" style={{ marginBottom: '32px' }}>{orderStatus.message}</p>
              <button className="btn btn-outline" onClick={() => setOrderStatus(null)}>Retry Authorization</button>
            </>
          )}
        </div>
      ) : items.length === 0 ? (
        <div className="card text-center" style={{ padding: '80px' }}>
          <p className="text-muted" style={{ marginBottom: '24px' }}>Container is empty. No assets flagged for transport.</p>
          <Link to="/shop" className="btn btn-outline">Browse Assets</Link>
        </div>
      ) : (
        <div className="grid grid-2" style={{ alignItems: 'start' }}>
          <div className="card" style={{ display: 'grid', gap: '20px' }}>
            {items.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '16px' }}>{item.name}</h4>
                    <span className="text-dim" style={{ fontSize: '12px' }}>Qty: {item.qty}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', marginBottom: '8px' }}>${(item.price * item.qty).toFixed(2)}</div>
                  <button className="link" onClick={() => removeItem(item._id)} style={{ fontSize: '12px' }}>REMOVE</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', fontSize: '20px', fontWeight: '800' }}>
              <span>TOTAL_VALUATION</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '24px' }}>Authorization</h3>
            {!user ? (
              <div style={{ textAlign: 'center' }}>
                <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px' }}>
                  Identity verification required for asset dispatch.
                </p>
                <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>Login to Authorize</Link>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">OPERATOR_IDENTITY</label>
                  <div className="form-input" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>
                    {user.email}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">DISPATCH_PROTOCOL</label>
                  <select className="form-input" style={{ background: 'var(--bg-deep)' }}>
                    <option>STANDARD_SECURE_COURIER</option>
                    <option>PRIORITY_NEURAL_LINK</option>
                  </select>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '20px' }}
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'PROCESSING...' : 'AUTHORIZE DISPATCH'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
