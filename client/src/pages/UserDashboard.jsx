import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClerk } from '@clerk/clerk-react';
import { useRole } from '../hooks/useRole';
import {
  FiUsers, FiLink, FiSend, FiArrowRight, FiLogOut,
  FiLock, FiHeart, FiGlobe, FiBook, FiSettings,
} from 'react-icons/fi';

const involvementOptions = [
  {
    id: 'volunteer',
    title: 'Volunteer',
    desc: 'Give your time and skills through outreach, mentoring, training, logistics, or prayer. Serve in prison ministry, youth programs, women empowerment, or community outreach.',
    icon: FiUsers,
    bg: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
    cta: 'Register as Volunteer',
    link: '/get-involved#volunteer',
  },
  {
    id: 'partner',
    title: 'Partner With Us',
    desc: 'Join our network of churches, NGOs, businesses, and individuals who share the vision of a transformed Uganda. Contribute expertise, resources, and advocacy.',
    icon: FiLink,
    bg: 'linear-gradient(135deg, #7C5A00, #A07800)',
    cta: 'Submit Partnership Request',
    link: '/get-involved#partner',
  },
  {
    id: 'prayer',
    title: 'Request Prayer',
    desc: 'Submit a prayer request and our dedicated prayer team will stand in agreement with you. The prayer of a righteous person is powerful and effective.',
    icon: FiSend,
    bg: 'linear-gradient(135deg, #0D2137, #1A3A5C)',
    cta: 'Submit Prayer Request',
    link: '/get-involved#prayer',
  },
];

const programs = [
  { title: 'Prison Outreach', icon: FiLock, desc: 'Reaching incarcerated individuals with hope and restoration through the Gospel.' },
  { title: 'Women Empowerment', icon: FiHeart, desc: 'Vocational skills, entrepreneurship, and support for single mothers and vulnerable women.' },
  { title: 'Community Outreach', icon: FiGlobe, desc: 'Evangelism, relief assistance, and development transforming underserved neighborhoods.' },
  { title: 'Resources & Training', icon: FiBook, desc: 'Access Bible studies, discipleship materials, and ministry training resources.' },
];

export default function UserDashboard() {
  const { user, isLoaded, isSignedIn } = useRole();
  const { signOut, openUserProfile } = useClerk();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || 'Friend';

  const handleLogout = () => signOut(() => navigate('/', { replace: true }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)',
        padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                {user?.imageUrl && (
                  <img src={user.imageUrl} alt={firstName} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
                )}
                <div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>My Account</div>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>
                    Welcome, {firstName}
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.8 }}>
                    Explore all the ways you can get involved in God's transforming work across Uganda.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openUserProfile()}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '8px', padding: '0.65rem 1.25rem',
                    color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  <FiSettings size={15} /> Manage Account
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '8px', padding: '0.65rem 1.25rem',
                    color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  <FiLogOut size={15} /> Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-badge">Get Involved</div>
            <h2 className="section-title">Ways to Participate</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
            <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '520px' }}>
              Every act of service, partnership, or prayer advances God's kingdom work in Uganda and beyond.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {involvementOptions.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <motion.div key={opt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  style={{ background: opt.bg, borderRadius: '20px', padding: '2.5rem', color: 'white', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={26} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {opt.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.75rem', flex: 1 }}>
                    {opt.desc}
                  </p>
                  <Link to={opt.link} className="btn btn-outline" style={{ alignSelf: 'flex-start', borderColor: 'rgba(255,255,255,0.5)', color: 'white', fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
                    {opt.cta} <FiArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-badge">Ministry Programs</div>
            <h2 className="section-title">Our Six Programs</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
            <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '480px' }}>
              Explore the programs your involvement supports. Every contribution reaches all six.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {programs.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ background: 'var(--gray-50)', borderRadius: '12px', padding: '1.5rem', border: '1px solid var(--gray-100)', transition: 'var(--transition)' }}
                  whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', background: 'white' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(45,106,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <Icon size={20} style={{ color: 'var(--forest-green)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: '0.4rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.6 }}>{p.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/programs" className="btn btn-primary">
              View All Programs <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
