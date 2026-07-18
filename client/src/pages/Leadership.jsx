import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiMail } from 'react-icons/fi';

const leadership = [
  {
    name: 'Founder & Executive Director',
    title: 'Ecclessia Eden Commission Ministries International',
    bio: 'Visionary leader and founder of EECMI, called by God to serve the marginalized and forgotten. With a deep passion for prison ministry and community transformation, the Founder has built an organization that touches thousands of lives across Uganda through holistic, Christ centered outreach.',
    role: 'Founder',
    initials: 'FD',
    color: 'linear-gradient(135deg, var(--dark-green), var(--forest-green))',
    responsibilities: [
      'Strategic vision and ministry direction',
      'Prison ministry leadership',
      'Partnership development',
      'Community engagement',
      'Organizational governance',
    ],
  },
];

const advisoryBoard = [
  { name: 'Advisory Board Member', role: 'Spiritual Oversight', initials: 'AB', color: 'linear-gradient(135deg, var(--navy-dark), var(--navy))' },
  { name: 'Advisory Board Member', role: 'Financial Stewardship', initials: 'AB', color: 'linear-gradient(135deg, var(--earth), var(--earth-light))' },
  { name: 'Advisory Board Member', role: 'Community Development', initials: 'AB', color: 'linear-gradient(135deg, #4C1D95, #7C3AED)' },
  { name: 'Advisory Board Member', role: 'Legal & Governance', initials: 'AB', color: 'linear-gradient(135deg, #0E7490, #0891B2)' },
];

export default function Leadership() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)',
        padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Team</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Servant Leaders<br />Called by God
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
              Meet the dedicated team behind EECMI's transformative ministry work across Uganda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Isaiah Banner */}
      <div style={{ background: 'var(--gold)', padding: '1rem 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--dark-green)', fontSize: '0.875rem', fontStyle: 'italic', fontWeight: 600 }}>
          "Arise, shine, for your light has come, and the glory of the LORD rises upon you." — Isaiah 60:1
        </p>
      </div>

      {/* Founder */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-badge">Founder</div>
            <h2 className="section-title">Executive Leadership</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </motion.div>

          {leadership.map((leader, i) => (
            <motion.div key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}
            >
              {/* Avatar */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '160px', height: '160px', borderRadius: '50%',
                  background: leader.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  border: '4px solid var(--gold)',
                }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '3rem', fontWeight: 700, color: 'var(--gold-light)' }}>{leader.initials}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <a href="mailto:admin@eecmi.org" style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: 'var(--forest-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', transition: 'var(--transition)',
                  }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--gold)'}
                    onMouseOut={e => e.currentTarget.style.background = 'var(--forest-green)'}
                  >
                    <FiMail size={16} />
                  </a>
                  <a href="/" onClick={(e) => e.preventDefault()} style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', transition: 'var(--transition)',
                  }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--gold)'}
                    onMouseOut={e => e.currentTarget.style.background = 'var(--navy)'}
                  >
                    <FiLinkedin size={16} />
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div>
                <div style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{leader.role}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>{leader.name}</h3>
                <div style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{leader.title}</div>
                <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, var(--forest-green), var(--gold))', borderRadius: '2px', marginBottom: '1.25rem' }} />
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.5rem' }}>{leader.bio}</p>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--gray-700)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>Key Responsibilities</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {leader.responsibilities.map(r => (
                      <li key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--forest-green)', flexShrink: 0 }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advisory Board */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-badge">Governance</div>
            <h2 className="section-title">Advisory Board</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
            <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
              Experienced leaders providing oversight, wisdom, and accountability to the ministry.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {advisoryBoard.map((member, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'var(--gray-50)', borderRadius: '16px', padding: '2rem',
                  textAlign: 'center', border: '1px solid var(--gray-100)',
                  transition: 'var(--transition)',
                }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)', background: 'white' }}
              >
                <div style={{
                  width: '70px', height: '70px', borderRadius: '50%',
                  background: member.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{member.initials}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: '0.25rem' }}>{member.name}</div>
                <div style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{member.role}</div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{
            marginTop: '3rem', background: 'var(--cream)', borderRadius: '16px', padding: '2rem', textAlign: 'center',
          }}>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Interested in joining our advisory board or learning more about our governance?
              We welcome experienced Christian leaders who share our passion for transformation.
            </p>
            <a href="mailto:admin@eecmi.org" className="btn btn-outline-green" style={{ marginTop: '1.25rem', fontSize: '0.9rem' }}>
              Inquire About Advisory Roles
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
