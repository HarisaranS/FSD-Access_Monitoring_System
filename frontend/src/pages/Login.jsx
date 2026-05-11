import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, setSession } from '../api.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await login({ email, password });
      setSession(data);
      
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } catch (err) {
      setError(err.message || 'Identity verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '28px' }}>Operator <span className="text-primary">Login</span></h2>
        <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>Authorized Personnel Only</p>
        
        {error && (
          <div style={{ padding: '12px', background: 'rgba(255, 46, 91, 0.1)', border: '1px solid var(--danger)', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">IDENTITY_EMAIL</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="operator@zerotrust.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">ACCESS_KEY</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
            {loading ? 'VERIFYING...' : 'INITIALIZE ACCESS'}
          </button>
        </form>

        <p className="text-muted" style={{ fontSize: '12px', marginTop: '32px' }}>
          New operator? <Link to="/register" className="link">REGISTER_NEW_IDENTITY</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
