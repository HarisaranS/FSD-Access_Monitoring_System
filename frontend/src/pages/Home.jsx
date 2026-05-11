import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade">
      <section className="hero">
        <div className="hero-badge">Zero Trust Protocol Active</div>
        <h1 className="hero-title">
          The Future of <span className="text-gradient">Secure Commerce</span>
        </h1>
        <p className="hero-desc">
          Adaptive access monitoring, biometric verification, and decentralized assets. 
          Experience a marketplace built on the principles of Zero Trust.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="btn btn-primary">Browse Assets</Link>
          <Link to="/login" className="btn btn-outline">Operator Login</Link>
        </div>
      </section>

      <div className="section-container" style={{ marginTop: '60px' }}>
        <div className="grid grid-3">
          <div className="card">
            <div className="text-primary" style={{ fontSize: '32px', marginBottom: '16px' }}>🛡️</div>
            <h3>Adaptive Monitoring</h3>
            <p className="text-muted" style={{ fontSize: '14px', marginTop: '8px' }}>
              Every request is analyzed by our Neural Risk Engine for anomalies and threats.
            </p>
          </div>
          <div className="card">
            <div className="text-secondary" style={{ fontSize: '32px', marginBottom: '16px' }}>⚡</div>
            <h3>Instant Audit</h3>
            <p className="text-muted" style={{ fontSize: '14px', marginTop: '8px' }}>
              Real-time telemetry and auditing for total transparency in sensitive operations.
            </p>
          </div>
          <div className="card">
            <div className="text-accent" style={{ fontSize: '32px', marginBottom: '16px' }}>💎</div>
            <h3>Premium Assets</h3>
            <p className="text-muted" style={{ fontSize: '14px', marginTop: '8px' }}>
              Exclusive access to high-end security hardware and encrypted neural tech.
            </p>
          </div>
        </div>
      </div>

      <div className="section-container" style={{ marginTop: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '32px' }}>Featured <span className="text-primary">Assets</span></h2>
            <p className="text-muted">High-priority hardware available for immediate procurement.</p>
          </div>
          <Link to="/shop" className="text-link">View All Assets →</Link>
        </div>
        
        <div className="grid grid-3">
          <div className="card product-card">
            <div className="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" alt="Tech" className="product-img" />
            </div>
            <h4>Neural Node</h4>
            <p className="text-muted" style={{ fontSize: '13px' }}>Advanced processing core.</p>
          </div>
          <div className="card product-card">
            <div className="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" alt="Server" className="product-img" />
            </div>
            <h4>Cloud Shield</h4>
            <p className="text-muted" style={{ fontSize: '13px' }}>Decentralized security mesh.</p>
          </div>
          <div className="card product-card">
            <div className="product-img-wrapper">
              <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" alt="Security" className="product-img" />
            </div>
            <h4>Identity Vault</h4>
            <p className="text-muted" style={{ fontSize: '13px' }}>Biometric access gateway.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
