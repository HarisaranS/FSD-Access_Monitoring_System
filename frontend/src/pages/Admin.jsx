import React, { useState, useEffect } from 'react';
import { getAuditLogs, seedProducts } from '../api.js';

const Admin = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ total: 0, highRisk: 0, active: 0 });
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const data = await getAuditLogs();
      setLogs(data);
      
      const highRisk = data.filter(l => l.riskScore > 70).length;
      setStats({
        total: data.length,
        highRisk,
        active: Math.floor(Math.random() * 5) + 1 // Dynamic mock
      });
    } catch (err) {
      console.error("Access denied. Admin credentials required.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSeed = async () => {
    try {
      await seedProducts();
      alert("Infrastructure seeded successfully.");
      fetchLogs();
    } catch (err) {
      alert("Failed to seed. Verify permissions.");
    }
  };

  if (loading) return <div className="text-center" style={{ padding: '100px' }}>Authenticating with Security Gateway...</div>;

  return (
    <div className="animate-fade">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px' }}>Security <span className="text-secondary">Operations Center</span></h1>
          <p className="text-muted">Adaptive Zero Trust Monitoring Dashboard</p>
        </div>
        <button className="btn btn-outline" onClick={handleSeed}>Seed Asset DB</button>
      </header>

      <div className="grid grid-3" style={{ marginBottom: '40px' }}>
        <div className="card">
          <div className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Total Telemetry</div>
          <div style={{ fontSize: '32px', fontWeight: '800' }}>{stats.total}</div>
        </div>
        <div className="card">
          <div className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase' }}>High Risk Detected</div>
          <div className="text-danger" style={{ fontSize: '32px', fontWeight: '800' }}>{stats.highRisk}</div>
        </div>
        <div className="card">
          <div className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase' }}>Active Operators</div>
          <div className="text-accent" style={{ fontSize: '32px', fontWeight: '800' }}>{stats.active}</div>
        </div>
      </div>

      <div className="monitor-panel">
        <div className="monitor-header">
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ fontWeight: '600' }}>LIVE AUDIT FEED</span>
            <span style={{ color: 'var(--accent)' }}>● STREAMING</span>
          </div>
          <div className="text-dim" style={{ fontSize: '12px' }}>ID: SOC-BETA-01</div>
        </div>
        <div className="monitor-logs">
          <div className="log-entry" style={{ borderBottom: '2px solid #1a1e26', fontWeight: '700', paddingBottom: '12px' }}>
            <span>TIMESTAMP</span>
            <span>EVENT</span>
            <span>PATH / ACTOR</span>
            <span>RISK</span>
          </div>
          {logs.map(log => (
            <div key={log._id} className="log-entry">
              <span className="log-time">{new Date(log.createdAt).toLocaleTimeString()}</span>
              <span className="log-event">{log.eventType?.split(':')[0]}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <span className="text-dim">{log.method}</span> {log.path} <span style={{ opacity: 0.5 }}>[{log.actor?.email}]</span>
              </span>
              <span className={log.riskScore > 70 ? 'log-risk-high' : log.riskScore > 40 ? 'log-risk-med' : 'log-risk-low'}>
                RISK_{log.riskScore?.toString().padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
