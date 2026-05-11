import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/shop');
    } catch (err) {
      setError(err.response?.data?.message || 'Identity registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '28px' }}>Create <span className="text-secondary">Identity</span></h2>
        <p className="text-muted" style={{ fontSize: '14px', marginBottom: '32px' }}>Register for access to secure assets</p>
        
        {error && (
          <div style={{ padding: '12px', background: 'rgba(255, 46, 91, 0.1)', border: '1px solid var(--danger)', borderRadius: '8px', color: 'var(--danger)', fontSize: '13px', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">OPERATOR_NAME</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            {loading ? 'INITIALIZING...' : 'ENROLL IDENTITY'}
          </button>
        </form>

        <p className="text-muted" style={{ fontSize: '12px', marginTop: '32px' }}>
          Already enrolled? <Link to="/login" className="link">RE-AUTHENTICATE</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
