import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiLock, FiHeart, FiUser, FiTrendingUp, FiHome, FiGlobe, FiBarChart2 } from 'react-icons/fi';
import { useSiteContent } from '../hooks/useSiteContent';

const ICONS = {
  prison: FiLock, women: FiHeart, children: FiUser, youth: FiTrendingUp,
  family: FiHome, community: FiGlobe,
};

export default function Programs() {
  const { content } = useSiteContent();
  const programs = content.programs || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--forest-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Ministry Programs</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Holistic Ministry for<br />Every Dimension of Need
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
              Six programs meeting the spiritual, social, and economic needs of Uganda's most vulnerable people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Anchor nav */}
      <section style={{ padding: '4rem 0 1rem', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {programs.map((p) => {
              const NavIcon = ICONS[p.icon] || FiGlobe;
              return (
                <a key={p.id} href={`#${p.id}`} style={{
                  padding: '0.5rem 1.25rem', background: 'white', border: '1px solid var(--gray-200)',
                  borderRadius: '50px', color: 'var(--gray-700)', fontSize: '0.875rem', fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  <NavIcon size={14} /> {p.title.split(' ')[0]}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      {programs.map((program, i) => {
        const Icon = ICONS[program.icon] || FiGlobe;
        return (
          <section key={program.id} id={program.id} style={{ padding: '6rem 0', background: i % 2 === 0 ? 'var(--cream)' : 'white' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ order: i % 2 === 0 ? 1 : 2 }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(45,106,79,0.1)', border: '1.5px solid rgba(45,106,79,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={24} style={{ color: 'var(--forest-green)' }} />
                  </div>
                  <div style={{ color: 'var(--forest-green)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {program.tagline}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem', lineHeight: 1.2 }}>
                    {program.title}
                  </h2>
                  <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--forest-green), var(--gold))', borderRadius: '2px', marginBottom: '1.25rem' }} />
                  <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1rem' }}>{program.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', background: 'rgba(45,106,79,0.08)', borderRadius: '8px', marginBottom: '2rem' }}>
                    <FiBarChart2 size={18} style={{ color: 'var(--forest-green)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--forest-green)', fontWeight: 600, fontSize: '0.9rem' }}>{program.impact}</span>
                  </div>
                  <Link to="/get-involved" className="btn btn-primary">Support This Program <FiArrowRight size={16} /></Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ order: i % 2 === 0 ? 2 : 1 }}
                >
                  <div style={{ background: program.bg || 'linear-gradient(135deg, var(--dark-green), var(--forest-green))', borderRadius: '20px', padding: '2.5rem', color: 'white' }}>
                    <div style={{ fontFamily: 'var(--font-cinzel)', color: program.color || 'var(--gold-light)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>WHAT WE DO</div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {(program.activities || []).map((activity) => (
                        <li key={activity} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${program.color || '#74C69D'}30`, border: `1px solid ${program.color || '#74C69D'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                            <FiCheck size={11} style={{ color: program.color || '#74C69D' }} />
                          </div>
                          <span style={{ color: 'rgba(255,255,255,0.85)' }}>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 700, marginBottom: '1.25rem' }}>Partner in Holistic Transformation</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Every gift, hour, and prayer advances all six programs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/get-involved" className="btn btn-gold">Get Involved</Link>
              <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
