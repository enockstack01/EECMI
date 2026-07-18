import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiPlay, FiFileText, FiBookOpen, FiVideo, FiMail } from 'react-icons/fi';

const categories = ['All', 'Sermons', 'Devotionals', 'Reports', 'Newsletters', 'Downloads'];

const resources = [
  { type: 'Sermons', title: 'Arise and Shine: Living Isaiah 60:1', desc: 'A powerful message on being carriers of God\'s light in dark places.', icon: FiPlay, color: 'var(--forest-green)', date: '2024' },
  { type: 'Devotionals', title: 'Daily Devotional: Hope for the Forgotten', desc: '30-day devotional guide focused on ministering to the vulnerable.', icon: FiBookOpen, color: 'var(--gold)', date: '2024' },
  { type: 'Reports', title: 'Annual Ministry Report 2023', desc: 'Full stewardship report including financials, program outcomes, and testimonies.', icon: FiFileText, color: 'var(--navy)', date: '2023' },
  { type: 'Newsletters', title: 'EECMI Newsletter — Q1 2024', desc: 'Ministry updates, prayer items, upcoming events and testimonies.', icon: FiMail, color: 'var(--earth)', date: '2024' },
  { type: 'Sermons', title: 'God\'s Heart for Prisoners', desc: 'Biblical foundation for prison ministry and how the church should respond.', icon: FiPlay, color: 'var(--forest-green)', date: '2024' },
  { type: 'Downloads', title: 'Volunteer Handbook 2024', desc: 'Complete guide for EECMI volunteers covering all program areas and protocols.', icon: FiDownload, color: '#7C3AED', date: '2024' },
  { type: 'Devotionals', title: 'Rebuilding Families: A 21 Day Journey', desc: 'Scripture-based devotional for family restoration and strengthening.', icon: FiBookOpen, color: 'var(--gold)', date: '2023' },
  { type: 'Reports', title: 'Prison Ministry Impact Report', desc: 'Focused report on prison outreach outcomes, testimonies and statistics.', icon: FiFileText, color: 'var(--navy)', date: '2023' },
  { type: 'Newsletters', title: 'EECMI Newsletter — Q4 2023', desc: 'Year-end summary of ministry highlights and God\'s faithfulness.', icon: FiMail, color: 'var(--earth)', date: '2023' },
  { type: 'Downloads', title: 'Partnership Proposal 2024', desc: 'Information for potential ministry partners, churches, and organizations.', icon: FiDownload, color: '#7C3AED', date: '2024' },
  { type: 'Sermons', title: 'Empowering the Poor: The Biblical Mandate', desc: 'How Christ calls the church to holistic ministry and compassion.', icon: FiPlay, color: 'var(--forest-green)', date: '2023' },
  { type: 'Videos', title: 'Ministry Documentary 2023', desc: 'A visual journey through EECMI\'s programs and impact stories.', icon: FiVideo, color: '#DC2626', date: '2023' },
];

export default function Resources() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? resources : resources.filter(r => r.type === active);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Resources</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Ministry Resources<br />& Materials
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
              Sermons, devotionals, reports, newsletters, and downloadable materials to equip you in Kingdom work.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '0.5rem 1.25rem',
                background: active === cat ? 'var(--forest-green)' : 'white',
                color: active === cat ? 'white' : 'var(--gray-700)',
                border: active === cat ? '2px solid var(--forest-green)' : '2px solid var(--gray-200)',
                borderRadius: '50px', fontWeight: 500, fontSize: '0.875rem',
                cursor: 'pointer', transition: 'var(--transition)',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((resource, i) => (
              <motion.div key={`${resource.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{
                  background: 'white', borderRadius: '16px', padding: '1.75rem',
                  border: '1px solid var(--gray-100)', boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)', cursor: 'pointer',
                }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: `${resource.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <resource.icon size={20} style={{ color: resource.color }} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gray-500)', background: 'var(--gray-100)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                      {resource.date}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: resource.color, background: `${resource.color}15`, padding: '0.25rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                      {resource.type}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {resource.title}
                </h3>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {resource.desc}
                </p>

                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  color: resource.color, fontSize: '0.8rem', fontWeight: 600,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  borderBottom: `1px solid ${resource.color}`,
                }}>
                  {resource.type === 'Downloads' ? <FiDownload size={14} /> : resource.type === 'Videos' ? <FiPlay size={14} /> : <FiBookOpen size={14} />}
                  {resource.type === 'Downloads' ? 'Download' : resource.type === 'Videos' ? 'Watch Now' : 'Read More'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{
            marginTop: '4rem', background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))',
            borderRadius: '20px', padding: '3rem', textAlign: 'center', color: 'white',
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FiMail size={28} style={{ color: 'var(--gold-light)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Never Miss an Update
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
              Subscribe to our newsletter for ministry news, testimonies, devotionals, and prayer updates.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '460px', margin: '0 auto' }}>
              <input type="email" placeholder="Your email address" style={{
                flex: 1, padding: '0.875rem 1.25rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px', color: 'white', fontSize: '0.9rem', outline: 'none',
              }} />
              <button className="btn btn-gold" style={{ whiteSpace: 'nowrap', padding: '0.875rem 1.5rem' }}>Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
