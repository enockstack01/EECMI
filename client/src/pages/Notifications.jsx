import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBell, FiCheck } from 'react-icons/fi';
import { useAuth } from '@clerk/clerk-react';
import { useApi } from '../hooks/useApi';

const TYPE_LABEL = { devotion: 'Devotion', update: 'Update', system: 'Notice' };

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Notifications() {
  const { isLoaded, isSignedIn } = useAuth();
  const api = useApi();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    api.get('/api/notifications')
      .then((d) => setItems(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [api]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) { navigate('/login', { replace: true }); return; }
    if (isSignedIn) load();
  }, [isLoaded, isSignedIn, load, navigate]);

  const markAll = async () => {
    try { await api.post('/api/notifications/read', {}); setItems((p) => p.map((n) => ({ ...n, read: true }))); } catch { /* ignore */ }
  };

  const openItem = (n) => {
    if (!n.read) api.post('/api/notifications/read', { ids: [n.id] }).catch(() => {});
    if (n.linkPath) navigate(n.linkPath);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Your Account</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', fontWeight: 700 }}>Notifications</h1>
        </div>
      </section>

      <section style={{ padding: '3rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <Link to="/dashboard" style={{ color: 'var(--forest-green)', fontSize: '0.875rem', fontWeight: 600 }}>← My Account</Link>
            {items.some((n) => !n.read) && (
              <button onClick={markAll} className="btn btn-outline-green" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>
                <FiCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          {loading && <p style={{ color: 'var(--gray-500)' }}>Loading…</p>}
          {!loading && items.length === 0 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center', color: 'var(--gray-500)' }}>
              <FiBell size={26} style={{ color: 'var(--forest-green)', marginBottom: '0.75rem' }} />
              <p>You have no notifications yet.</p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((n) => (
              <button key={n.id} onClick={() => openItem(n)} style={{
                textAlign: 'left', background: 'white', border: '1px solid var(--gray-100)',
                borderLeft: `4px solid ${n.read ? 'var(--gray-200)' : 'var(--forest-green)'}`,
                borderRadius: '12px', padding: '1rem 1.25rem', cursor: n.linkPath ? 'pointer' : 'default',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--forest-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {TYPE_LABEL[n.type] || 'Notice'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>{timeAgo(n.createdAt)}</span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--gray-900)', fontWeight: 700, margin: '3px 0' }}>{n.title}</div>
                {n.body && <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>{n.body}</div>}
              </button>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
