import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { getUser, clearSession } from '../api.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useCart();
  const user = getUser();

  const logout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '6px', display: 'grid', placeItems: 'center' }}>
          <span style={{ color: 'var(--bg-deep)', fontSize: '20px' }}>ZT</span>
        </div>
        ZERO_TRUST
      </Link>

      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Terminal</Link>
        <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>Assets</Link>
        <Link to="/cart" className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} style={{ position: 'relative' }}>
          Container
          {items.length > 0 && (
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-12px', 
              background: 'var(--primary)', 
              color: 'var(--bg-deep)', 
              fontSize: '10px', 
              fontWeight: '800', 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              display: 'grid', 
              placeItems: 'center',
              boxShadow: '0 0 10px var(--primary-glow)'
            }}>
              {items.length}
            </span>
          )}
        </Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>SOC_PANEL</Link>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {user.email.split('@')[0]}</span>
            <button className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '12px' }} onClick={logout}>REVOKE</button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">AUTHENTICATE</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
