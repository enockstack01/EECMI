import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiEye, FiCompass, FiHeart } from 'react-icons/fi';

const values = [
  { name: 'Christ Centeredness', desc: 'Jesus is the foundation of all we do.', color: 'var(--forest-green)' },
  { name: 'Restoration', desc: "Every life can be made new through God's grace.", color: 'var(--gold)' },
  { name: 'Compassion', desc: 'We serve with the heart of Christ.', color: 'var(--earth)' },
  { name: 'Empowerment', desc: 'We equip people to lead sustainable change.', color: 'var(--navy)' },
  { name: 'Holistic Transformation', desc: 'Spiritual, social, economic renewal together.', color: '#7C3AED' },
  { name: 'Integrity', desc: 'Transparent and accountable in all we do.', color: '#0891B2' },
  { name: 'Accountability', desc: 'Good stewardship of every resource entrusted to us.', color: '#B45309' },
  { name: 'Partnership', desc: 'We achieve more together through collaboration.', color: 'var(--mid-green)' },
  { name: 'Faith', desc: 'Trusting God to do the impossible.', color: 'var(--gold-dark)' },
  { name: 'Hope', desc: 'A better future is possible for everyone.', color: 'var(--forest-green)' },
  { name: 'Dignity', desc: 'Every person bears the image of God.', color: 'var(--earth)' },
  { name: 'Respect', desc: 'We honor every individual we serve.', color: 'var(--navy)' },
];

const visionCards = [
  {
    label: 'Our Vision',
    icon: FiEye,
    text: "A society where lives are transformed through Christ, families are restored, and communities reflect God's design of wholeness.",
    bg: 'linear-gradient(135deg, var(--forest-green), var(--mid-green))',
  },
  {
    label: 'Our Mission',
    icon: FiCompass,
    text: 'To transform lives and restore communities through Christ centered outreach, discipleship, and holistic empowerment.',
    bg: 'linear-gradient(135deg, var(--navy-dark), var(--navy))',
  },
  {
    label: 'Our Tagline',
    icon: FiHeart,
    text: 'Restoring Lives. Rebuilding Families. Transforming Communities Through Christ.',
    bg: 'linear-gradient(135deg, var(--earth), var(--earth-light))',
  },
];

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)',
        padding: '10rem 0 5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>About Us</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', maxWidth: '700px', lineHeight: 1.2 }}>
              Serving the Forgotten,<br />Restoring the Broken
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '580px', lineHeight: 1.8 }}>
              A nonprofit Christian ministry serving prisoners, former prisoners, single mothers,
              vulnerable children, unemployed youth, and underserved communities through holistic outreach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Isaiah Banner */}
      <div style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))', padding: '1rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-cinzel)', color: 'white', fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
            "Arise, shine, for your light has come, and the glory of the LORD rises upon you." — Isaiah 60:1
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <section id="who" style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-badge">Who We Are</div>
              <h2 className="section-title">A Voice for the Voiceless</h2>
              <div className="divider" />
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: '1rem', fontSize: '1rem' }}>
                Ecclessia Eden Commission Ministries International is a nonprofit Christian ministry serving
                prisoners, former prisoners, single mothers, vulnerable children, unemployed youth, and
                underserved communities through holistic outreach.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, fontSize: '1rem' }}>
                Founded in Kampala, Uganda, we are a Christ centered ministry committed to restoring lives,
                rebuilding families, empowering vulnerable people, and transforming communities through
                holistic ministry, discipleship, compassion, and sustainable development.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div style={{ background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))', borderRadius: '20px', padding: '2.5rem', color: 'white' }}>
                <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>FAST FACTS</div>
                {[
                  { label: 'Founded', value: 'Kampala, Uganda' },
                  { label: 'Focus', value: 'Prison Ministry & Community Development' },
                  { label: 'Status', value: 'Non Profit Christian Ministry' },
                  { label: 'Reach', value: 'Uganda & East Africa' },
                  { label: 'Programs', value: '6 Core Ministry Programs' },
                  { label: 'Beneficiaries', value: 'Prisoners, Youth, Women, Children' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{item.label}</span>
                    <span style={{ color: 'var(--gold-light)', fontSize: '0.875rem', fontWeight: 600, textAlign: 'right', maxWidth: '200px' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-badge">Our Direction</div>
            <h2 className="section-title">Vision & Mission</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {visionCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  style={{
                    background: item.bg, borderRadius: '20px', padding: '2.5rem',
                    color: 'white', textAlign: 'center',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <Icon size={28} style={{ color: 'rgba(255,255,255,0.95)' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--gold-light)' }}>{item.label}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '1rem' }}>{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-badge">What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              These values guide every decision, every outreach, and every relationship we build.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {values.map((value, i) => (
              <motion.div key={value.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{
                  padding: '1.5rem', borderRadius: '12px',
                  background: 'var(--gray-50)',
                  border: '1px solid var(--gray-100)',
                  borderLeft: `4px solid ${value.color}`,
                  transition: 'var(--transition)',
                }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', background: 'white' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: value.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiCheck size={12} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)' }}>{value.name}</h3>
                </div>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', lineHeight: 1.6, paddingLeft: '2rem' }}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 700, marginBottom: '1rem' }}>
              Partner in This Mission
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Together, we can reach more lives and shine God's light into Uganda's darkest corners.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/get-involved" className="btn btn-gold">Get Involved <FiArrowRight size={16} /></Link>
              <Link to="/leadership" className="btn btn-outline">Meet Our Team</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
