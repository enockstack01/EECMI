import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { useApi } from '../hooks/useApi';

const TYPE_LABEL = { devotion: 'Devotion', update: 'Update', system: 'Notice' };

export default function NotificationBell() {
  const api = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  const loadCount = useCallback(() => {
    api.get('/api/notifications/unread-count')
      .then((d) => setUnread(d.data?.count || 0))
      .catch(() => {});
  }, [api]);

  const loadList = useCallback(() => {
    api.get('/api/notifications')
      .then((d) => setItems((d.data || []).slice(0, 8)))
      .catch(() => {});
  }, [api]);

  useEffect(() => { loadCount(); }, [loadCount, location.pathname]);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) loadList();
  };

  const markAllRead = async () => {
    try {
      await api.post('/api/notifications/read', {});
      setUnread(0);
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch { /* ignore */ }
  };

  const openItem = async (n) => {
    setOpen(false);
    if (!n.read) {
      api.post('/api/notifications/read', { ids: [n.id] }).then(loadCount).catch(() => {});
    }
    if (n.linkPath) navigate(n.linkPath);
    else navigate('/notifications');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={toggle} aria-label="Notifications" style={{
        position: 'relative', width: 38, height: 38, borderRadius: 8,
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
        color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <FiBell size={16} />
        {unread > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, padding: '0 4px',
            borderRadius: 8, background: 'var(--gold)', color: 'var(--dark-green)',
            fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: 320,
          background: 'white', borderRadius: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          overflow: 'hidden', zIndex: 200,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', borderBottom: '1px solid var(--gray-100)' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--gray-900)' }}>Notifications</strong>
            {unread > 0 && (
              <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--forest-green)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                Mark all read
              </button>
            )}
          </div>
          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {items.length === 0 ? (
              <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.85rem' }}>Nothing yet.</div>
            ) : items.map((n) => (
              <button key={n.id} onClick={() => openItem(n)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1rem',
                background: n.read ? 'white' : 'rgba(45,106,79,0.05)', border: 'none',
                borderBottom: '1px solid var(--gray-100)', cursor: 'pointer',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--forest-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {TYPE_LABEL[n.type] || 'Notice'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gray-900)', fontWeight: 600, margin: '2px 0' }}>{n.title}</div>
                {n.body && <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', lineHeight: 1.4 }}>{n.body}</div>}
              </button>
            ))}
          </div>
          <button onClick={() => { setOpen(false); navigate('/notifications'); }} style={{
            display: 'block', width: '100%', padding: '0.75rem', background: 'var(--gray-50)',
            border: 'none', color: 'var(--forest-green)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
          }}>
            See all notifications
          </button>
        </div>
      )}
    </div>
  );
}
