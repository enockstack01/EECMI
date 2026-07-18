import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogIn } from 'react-icons/fi';
import { useUserAuth } from '../context/UserAuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Impact', path: '/impact' },
  {
    label: 'Get Involved',
    path: '/get-involved',
    children: [
      { label: 'Volunteer', path: '/get-involved#volunteer' },
      { label: 'Partner With Us', path: '/get-involved#partner' },
      { label: 'Request Prayer', path: '/get-involved#prayer' },
    ]
  },
  { label: 'Leadership', path: '/leadership' },
  { label: 'Resources', path: '/resources' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { isSignedIn, user, logout } = useUserAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <>
      {/* Top bar */}
      <div style={{
        background: 'var(--dark-green)',
        color: 'rgba(255,255,255,0.85)',
        fontSize: '0.78rem',
        padding: '0.4rem 0',
        textAlign: 'center',
        letterSpacing: '0.03em',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontStyle: 'italic', fontSize: '0.75rem' }}>
            "Arise, shine, for your light has come" — Isaiah 60:1
          </span>
          <span>Kampala, Uganda &nbsp;|&nbsp; admin@eecmi.org</span>
        </div>
      </div>

      <header
        style={{
          position: 'fixed',
          top: '2rem',
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: transparent
            ? 'transparent'
            : scrolled
              ? 'rgba(27, 67, 50, 0.97)'
              : 'rgba(27, 67, 50, 0.95)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 12px rgba(212,160,23,0.4)',
            }}>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: 'var(--dark-green)', fontSize: '1rem' }}>E</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: 'white', fontSize: '1rem', letterSpacing: '0.05em', lineHeight: 1.2 }}>
                EECMI
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                ECCLESSIA EDEN COMMISSION
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {navLinks.map((link) => (
              link.children ? (
                <div key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    color: 'rgba(255,255,255,0.88)', padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem', fontWeight: 500, background: 'none',
                    border: 'none', cursor: 'pointer', borderRadius: '8px',
                    transition: 'var(--transition)',
                  }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--gold-light)'}
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
                  >
                    {link.label} <FiChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute', top: '100%', left: 0, minWidth: '180px',
                          background: 'white', borderRadius: '12px',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 100,
                        }}
                      >
                        {link.children.map(child => (
                          <Link key={child.label} to={child.path} style={{
                            display: 'block', padding: '0.75rem 1.25rem',
                            fontSize: '0.875rem', color: 'var(--gray-700)',
                            transition: 'var(--transition)',
                          }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(45,106,79,0.08)'; e.currentTarget.style.color = 'var(--forest-green)'; }}
                            onMouseOut={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--gray-700)'; }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={link.label} to={link.path} style={({ isActive }) => ({
                  color: isActive ? 'var(--gold-light)' : 'rgba(255,255,255,0.88)',
                  padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500,
                  borderRadius: '8px', transition: 'var(--transition)',
                  background: isActive ? 'rgba(240,192,64,0.12)' : 'transparent',
                })}
                  onMouseOver={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = 'var(--gold-light)'; }}
                  onMouseOut={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; }}
                >
                  {link.label}
                </NavLink>
              )
            ))}
            {isSignedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.75rem' }}>
                <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.88)', fontSize: '0.875rem', padding: '0.5rem 0.9rem', borderRadius: '8px', transition: 'var(--transition)' }}
                  onMouseOver={e => e.currentTarget.style.color = 'var(--gold-light)'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
                >
                  <FiUser size={14} /> {user?.name?.split(' ')[0] || 'My Account'}
                </Link>
                <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', padding: '0.5rem 0.9rem', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.75rem' }}>
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.88)', fontSize: '0.875rem', padding: '0.6rem 1rem', borderRadius: '8px', transition: 'var(--transition)' }}
                  onMouseOver={e => e.currentTarget.style.color = 'var(--gold-light)'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.88)'}
                >
                  <FiLogIn size={14} /> Sign In
                </Link>
                <Link to="/register" className="btn btn-gold" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'white', fontSize: '1.5rem' }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'var(--dark-green)',
              overflowY: 'auto', paddingTop: '5rem',
            }}
          >
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.8rem', fontStyle: 'italic' }}>
                "Arise, shine, for your light has come" — Isaiah 60:1
              </div>
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link to={link.path} style={{
                    display: 'block', color: 'rgba(255,255,255,0.9)',
                    padding: '1rem 0', fontSize: '1.1rem', fontWeight: 500,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'var(--font-serif)',
                  }} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {isSignedIn ? (
                  <>
                    <Link to="/dashboard" className="btn btn-gold" style={{ justifyContent: 'center', fontSize: '1rem' }} onClick={() => setMobileOpen(false)}>
                      <FiUser size={16} /> My Dashboard
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.75rem', color: 'white', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-gold" style={{ justifyContent: 'center', fontSize: '1rem' }} onClick={() => setMobileOpen(false)}>
                      Create Account
                    </Link>
                    <Link to="/login" style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.75)', padding: '0.75rem', fontSize: '0.95rem' }} onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
