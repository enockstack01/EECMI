import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiMapPin, FiMail, FiPhone, FiSend, FiHeart
} from 'react-icons/fi';
import axios from 'axios';

const footerLinks = {
  'Ministry': [
    { label: 'About Us', path: '/about' },
    { label: 'Our Vision & Mission', path: '/about#vision' },
    { label: 'Core Values', path: '/about#values' },
    { label: 'Leadership', path: '/leadership' },
  ],
  'Programs': [
    { label: 'Prison Outreach', path: '/programs#prison' },
    { label: 'Women Empowerment', path: '/programs#women' },
    { label: 'Children Support', path: '/programs#children' },
    { label: 'Youth Empowerment', path: '/programs#youth' },
    { label: 'Family Strengthening', path: '/programs#family' },
    { label: 'Community Outreach', path: '/programs#community' },
  ],
  'Get Involved': [
    { label: 'Volunteer', path: '/get-involved#volunteer' },
    { label: 'Partner With Us', path: '/get-involved#partner' },
    { label: 'Request Prayer', path: '/get-involved#prayer' },
    { label: 'Create Account', path: '/register' },
    { label: 'Resources', path: '/resources' },
    { label: 'News', path: '/news' },
  ],
};

const socials = [
  { icon: FiFacebook, label: 'Facebook', href: '#' },
  { icon: FiTwitter, label: 'Twitter', href: '#' },
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiYoutube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/newsletter/subscribe', { email });
      setMsg(res.data.message);
      setEmail('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={{ background: 'var(--navy-dark)', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Isaiah Banner */}
      <div style={{
        background: 'linear-gradient(90deg, var(--dark-green), var(--navy), var(--earth))',
        padding: '1.25rem 0',
        borderTop: '3px solid var(--gold)',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', color: 'var(--gold-light)', fontStyle: 'italic', letterSpacing: '0.05em' }}>
            "Arise, shine, for your light has come, and the glory of the LORD rises upon you."
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '0.25rem', letterSpacing: '0.15em' }}>
            ISAIAH 60:1
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ padding: '4rem 1.5rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: 'var(--dark-green)', fontSize: '1rem' }}>E</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>EECMI</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>MINISTRIES INTERNATIONAL</div>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Restoring lives. Rebuilding families. Transforming communities through Christ centered outreach, discipleship, and holistic empowerment.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)', transition: 'var(--transition)',
                }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { icon: FiMapPin, text: 'Kampala, Uganda' },
                { icon: FiMail, text: 'admin@eecmi.org' },
                { icon: FiPhone, text: '+250 722 439 327' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.825rem' }}>
                  <Icon size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem',
                color: 'var(--gold-light)', marginBottom: '1.25rem',
                paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}>
                {title}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} style={{
                      color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem',
                      transition: 'var(--transition)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    }}
                      onMouseOver={e => e.currentTarget.style.color = 'var(--gold-light)'}
                      onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem',
              color: 'var(--gold-light)', marginBottom: '1.25rem',
              paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
              Stay Connected
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Subscribe to receive updates, testimonies, and ministry news directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  style={{
                    flex: 1, padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px', color: 'white',
                    fontSize: '0.875rem', outline: 'none',
                  }}
                  required
                />
                <button type="submit" disabled={loading} style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--gold)', color: 'white',
                  border: 'none', borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center',
                  transition: 'var(--transition)',
                }}>
                  <FiSend size={16} />
                </button>
              </div>
              {msg && (
                <p style={{ fontSize: '0.8rem', color: msg.includes('failed') || msg.includes('already') ? '#f87171' : 'var(--gold-light)' }}>
                  {msg}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Ecclessia Eden Commission Ministries International. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <FiHeart style={{ color: 'var(--gold)', fill: 'var(--gold)' }} size={12} /> for God's Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
