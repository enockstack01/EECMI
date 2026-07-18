import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FiArrowRight, FiHeart, FiLock, FiTrendingUp, FiHome, FiBarChart2 } from 'react-icons/fi';

const stats = [
  { value: 5000, suffix: '+', label: 'Lives Transformed', desc: "Individuals who have experienced the ministry's direct impact" },
  { value: 12, suffix: '+', label: 'Prison Facilities', desc: 'Correctional facilities receiving our regular outreach' },
  { value: 800, suffix: '+', label: 'Women Empowered', desc: 'Single mothers and vulnerable women in our programs' },
  { value: 1200, suffix: '+', label: 'Children Supported', desc: 'Vulnerable children receiving education and care' },
  { value: 500, suffix: '+', label: 'Youth Trained', desc: 'Young people equipped with vocational skills' },
  { value: 200, suffix: '+', label: 'Families Restored', desc: 'Families reconciled and strengthened through counseling' },
  { value: 800, suffix: '+', label: 'Volunteers', desc: 'Dedicated servants giving their time and skills' },
  { value: 15, suffix: '+', label: 'Years of Ministry', desc: 'Years of faithful service in Uganda and beyond' },
];

const stories = [
  {
    name: 'David M.',
    role: 'Former Prisoner, Kampala',
    story: 'I entered prison as a broken man — no hope, no purpose. The EECMI prison team brought the Gospel to my cell. Today, 3 years after release, I run a carpentry business, my family is restored, and I volunteer in the same prison that once held me.',
    program: 'Prison Outreach',
    icon: FiLock,
    color: 'var(--forest-green)',
  },
  {
    name: 'Grace N.',
    role: "Women's Empowerment Graduate",
    story: "As a single mother of 4, I had no income and no hope. EECMI's women's program gave me tailoring skills, business training, and a savings group. Three years later I employ 5 other women in my community.",
    program: 'Women Empowerment',
    icon: FiHeart,
    color: 'var(--earth)',
  },
  {
    name: 'James O.',
    role: 'Youth Skills Program Graduate',
    story: "I was an unemployed school dropout heading toward gang involvement. EECMI's youth program caught me, trained me in IT skills, and helped me launch a small tech repair business. Now I mentor 12 other youth.",
    program: 'Youth Empowerment',
    icon: FiTrendingUp,
    color: '#7C3AED',
  },
  {
    name: 'Sarah & Peter K.',
    role: 'Family Strengthening Program',
    story: "Our marriage was on the verge of collapse. Through EECMI's marriage enrichment retreats and counseling, we discovered forgiveness, rebuilt trust, and our family is now a testimony of God's restoring power.",
    program: 'Family Strengthening',
    icon: FiHome,
    color: '#0891B2',
  },
];

function StatCard({ value, suffix, label, desc, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      style={{
        background: 'white', borderRadius: '16px', padding: '2rem',
        textAlign: 'center', boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--gray-100)',
        transition: 'var(--transition)',
      }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-xl)' }}
    >
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--forest-green)', lineHeight: 1 }}>
        {inView ? <CountUp end={value} duration={2.5} suffix={suffix} /> : `0${suffix}`}
      </div>
      <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '1rem', margin: '0.5rem 0 0.4rem' }}>{label}</div>
      <p style={{ color: 'var(--gray-500)', fontSize: '0.8rem', lineHeight: 1.5 }}>{desc}</p>
    </motion.div>
  );
}

export default function Impact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Impact</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Measuring God's<br />Transforming Power
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
              Every number represents a real person whose life has been touched, changed,
              and redeemed through Christ centered ministry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }} ref={ref}>
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-badge">By the Numbers</div>
            <h2 className="section-title">Impact at a Glance</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} inView={inView} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Isaiah Banner */}
      <div style={{ background: 'linear-gradient(90deg, var(--dark-green), var(--navy-dark), var(--dark-green))', padding: '2.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.3em', marginBottom: '0.75rem' }}>ISAIAH 60:1</div>
          <p style={{ fontFamily: 'var(--font-serif)', color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
            "Arise, shine, for your light has come, and the glory of the LORD rises upon you."
          </p>
        </div>
      </div>

      {/* Testimonies */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-badge">Testimonies</div>
            <h2 className="section-title">Real Stories of<br />Transformation</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {stories.map((story, i) => {
              const Icon = story.icon;
              return (
                <motion.div key={story.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    background: 'var(--gray-50)', borderRadius: '16px', padding: '2rem',
                    border: '1px solid var(--gray-100)', transition: 'var(--transition)', position: 'relative',
                  }}
                  whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', background: 'white' }}
                >
                  <div style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    background: 'rgba(45,106,79,0.1)',
                    borderRadius: '8px', padding: '0.25rem 0.6rem',
                    fontSize: '0.7rem', color: 'var(--forest-green)', fontWeight: 600,
                  }}>
                    {story.program}
                  </div>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    background: `${story.color}15`,
                    border: `1.5px solid ${story.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={22} style={{ color: story.color }} />
                  </div>
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.925rem', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    "{story.story}"
                  </p>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '0.95rem' }}>{story.name}</div>
                    <div style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{story.role}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Annual Report CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(45,106,79,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <FiBarChart2 size={32} style={{ color: 'var(--forest-green)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem' }}>
              Download Our Annual Report
            </h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              See detailed statistics, financial stewardship reports, program highlights, and testimonies
              from our most recent year of ministry.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/resources" className="btn btn-primary">View Resources <FiArrowRight size={16} /></Link>
              <Link to="/get-involved" className="btn btn-gold"><FiHeart size={16} /> Get Involved</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
