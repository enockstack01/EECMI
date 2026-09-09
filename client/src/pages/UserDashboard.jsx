import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClerk } from '@clerk/clerk-react';
import { useRole } from '../hooks/useRole';
import { useApi } from '../hooks/useApi';
import {
  FiArrowRight, FiLogOut, FiSettings, FiBell, FiBookOpen, FiActivity, FiUser,
} from 'react-icons/fi';

const INTEREST_OPTIONS = [
  'Prison Ministry', 'Women Empowerment', 'Children Support', 'Youth Empowerment',
  'Family Strengthening', 'Community Outreach', 'Devotions', 'Volunteering', 'Partnership', 'Prayer',
];

const TABS = [
  { id: 'profile', label: 'My Profile', icon: FiUser },
  { id: 'activity', label: 'My Activity', icon: FiActivity },
  { id: 'saved', label: 'Saved Devotions', icon: FiBookOpen },
];

function fmtDate(d) {
  return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function UserDashboard() {
  const { user, isLoaded, isSignedIn } = useRole();
  const { signOut, openUserProfile } = useClerk();
  const api = useApi();
  const navigate = useNavigate();

  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ phone: '', location: '', interests: [], notifyInApp: true });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [activity, setActivity] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate('/login', { replace: true });
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (!isSignedIn) return;
    api.get('/api/me').then((d) => {
      setProfile(d.data);
      setForm({
        phone: d.data.phone || '', location: d.data.location || '',
        interests: d.data.interests || [], notifyInApp: d.data.notifyInApp !== false,
      });
    }).catch(() => {});
  }, [isSignedIn, api]);

  const loadActivity = useCallback(() => {
    api.get('/api/me/activity').then((d) => setActivity(d.data || [])).catch(() => setActivity([]));
  }, [api]);
  const loadSaved = useCallback(() => {
    api.get('/api/me/devotions').then((d) => setSaved(d.data || [])).catch(() => setSaved([]));
  }, [api]);

  useEffect(() => {
    if (tab === 'activity' && activity === null) loadActivity();
    if (tab === 'saved' && saved === null) loadSaved();
  }, [tab, activity, saved, loadActivity, loadSaved]);

  const toggleInterest = (name) => setForm((f) => ({
    ...f,
    interests: f.interests.includes(name) ? f.interests.filter((i) => i !== name) : [...f.interests, name],
  }));

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg('');
    try {
      await api.patch('/api/me', form);
      setProfileMsg('Saved.');
    } catch (err) {
      setProfileMsg(err.message || 'Could not save.');
    } finally {
      setSavingProfile(false);
    }
  };

  const unsave = async (id) => {
    try { await api.del(`/api/me/devotions/${id}/save`); setSaved((s) => s.filter((d) => d.id !== id)); } catch { /* ignore */ }
  };

  if (!isLoaded) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>Loading…</div>;
  }
  if (!isSignedIn) return null;

  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'Friend';
  const handleLogout = () => signOut(() => navigate('/', { replace: true }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              {user?.imageUrl && <img src={user.imageUrl} alt={firstName} style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />}
              <div>
                <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>My Account</div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'white', fontWeight: 700, lineHeight: 1.2 }}>Welcome, {firstName}</h1>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <Link to="/notifications" style={btnGhost}><FiBell size={15} /> Notifications</Link>
              <button onClick={() => openUserProfile()} style={btnGhost}><FiSettings size={15} /> Login & Name</button>
              <button onClick={handleLogout} style={btnGhost}><FiLogOut size={15} /> Sign Out</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.55rem 1.1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  background: tab === t.id ? 'var(--forest-green)' : 'white',
                  color: tab === t.id ? 'white' : 'var(--gray-700)',
                  border: `2px solid ${tab === t.id ? 'var(--forest-green)' : 'var(--gray-200)'}`,
                }}>
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Profile */}
          {tab === 'profile' && (
            <form onSubmit={saveProfile} style={card}>
              <h2 style={cardTitle}>Your information</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Signed in as <strong>{profile?.email || user?.primaryEmailAddress?.emailAddress}</strong>. Manage your name, email and password with the "Login & Name" button above.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <label style={field}>
                  <span style={fieldLabel}>Phone</span>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} style={input} placeholder="+256 …" />
                </label>
                <label style={field}>
                  <span style={fieldLabel}>Location</span>
                  <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} style={input} placeholder="City, country" />
                </label>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <span style={fieldLabel}>Interests</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {INTEREST_OPTIONS.map((name) => {
                    const on = form.interests.includes(name);
                    return (
                      <button type="button" key={name} onClick={() => toggleInterest(name)} style={{
                        padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', cursor: 'pointer',
                        background: on ? 'var(--forest-green)' : 'white', color: on ? 'white' : 'var(--gray-600)',
                        border: `1px solid ${on ? 'var(--forest-green)' : 'var(--gray-200)'}`,
                      }}>
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--gray-700)' }}>
                <input type="checkbox" checked={form.notifyInApp} onChange={(e) => setForm((f) => ({ ...f, notifyInApp: e.target.checked }))} />
                Show me in-app notifications for new devotions and updates
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.75rem' }}>
                <button type="submit" className="btn btn-primary" disabled={savingProfile}>{savingProfile ? 'Saving…' : 'Save changes'}</button>
                {profileMsg && <span style={{ fontSize: '0.85rem', color: profileMsg === 'Saved.' ? 'var(--forest-green)' : '#B4413C' }}>{profileMsg}</span>}
              </div>
            </form>
          )}

          {/* Activity */}
          {tab === 'activity' && (
            <div style={card}>
              <h2 style={cardTitle}>Your activity</h2>
              {activity === null && <p style={{ color: 'var(--gray-500)' }}>Loading…</p>}
              {activity && activity.length === 0 && (
                <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                  Nothing yet. When you volunteer, partner, send a prayer request or a message, it will appear here.
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(activity || []).map((a) => (
                  <div key={`${a.kind}-${a.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 1rem', border: '1px solid var(--gray-100)', borderRadius: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--forest-green)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{a.kind}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--gray-800)', marginTop: 2 }}>{a.title}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span className={`badge badge-${a.status}`} style={{ fontSize: '0.68rem' }}>{a.status}</span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: 4 }}>{fmtDate(a.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved devotions */}
          {tab === 'saved' && (
            <div style={card}>
              <h2 style={cardTitle}>Saved devotions</h2>
              {saved === null && <p style={{ color: 'var(--gray-500)' }}>Loading…</p>}
              {saved && saved.length === 0 && (
                <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
                  No saved devotions yet. Open a <Link to="/devotions" style={{ color: 'var(--forest-green)', fontWeight: 600 }}>devotion</Link> and tap Save.
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(saved || []).map((d) => (
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '0.9rem 1rem', border: '1px solid var(--gray-100)', borderRadius: '10px' }}>
                    <Link to={`/devotions/${d.id}`} style={{ color: 'var(--gray-800)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--forest-green)', fontWeight: 700, textTransform: 'uppercase' }}>{d.series}</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>{d.title}</div>
                    </Link>
                    <button onClick={() => unsave(d.id)} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/get-involved" className="btn btn-gold">Get Involved <FiArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

const btnGhost = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)',
  borderRadius: '8px', padding: '0.6rem 1rem', color: 'rgba(255,255,255,0.85)',
  fontSize: '0.825rem', cursor: 'pointer', textDecoration: 'none',
};
const card = { background: 'white', borderRadius: '18px', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.05)' };
const cardTitle = { fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem' };
const field = { display: 'flex', flexDirection: 'column', gap: '0.35rem' };
const fieldLabel = { fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray-600)' };
const input = { padding: '0.7rem 0.9rem', border: '2px solid var(--gray-200)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' };
