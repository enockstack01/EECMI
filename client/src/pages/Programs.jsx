import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiLock, FiHeart, FiUser, FiTrendingUp, FiHome, FiGlobe, FiBarChart2 } from 'react-icons/fi';

const programs = [
  {
    id: 'prison',
    icon: FiLock,
    title: 'Prison Outreach & Restoration',
    tagline: 'Bringing hope behind prison walls',
    bg: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
    color: '#74C69D',
    description: 'Evangelism, discipleship, counseling, reintegration, pre release preparation, and mentorship for incarcerated individuals and those returning to their communities.',
    activities: [
      'Evangelism and Gospel proclamation',
      'Bible discipleship and spiritual mentorship',
      'Professional counseling and trauma therapy',
      'Pre release life skills preparation',
      'Post release reintegration support',
      'Family reconciliation facilitation',
      'Mentorship and accountability partnerships',
    ],
    impact: 'Thousands of lives transformed behind bars',
  },
  {
    id: 'women',
    icon: FiHeart,
    title: 'Women Empowerment',
    tagline: 'Building strong, self sufficient women',
    bg: 'linear-gradient(135deg, #6B3E26, #8B5E3C)',
    color: '#C49A6C',
    description: 'Vocational skills, entrepreneurship, parenting support, mentorship, and savings groups for single mothers and vulnerable women.',
    activities: [
      'Vocational skills training and certification',
      'Entrepreneurship and business development',
      'Parenting support and family coaching',
      'Mentorship from successful women leaders',
      'Savings groups and micro finance linkages',
      'Legal rights awareness',
      'Spiritual formation and discipleship',
    ],
    impact: 'Hundreds of women now running sustainable businesses',
  },
  {
    id: 'children',
    icon: FiUser,
    title: 'Children Support',
    tagline: 'Every child deserves a future',
    bg: 'linear-gradient(135deg, #0D2137, #1A3A5C)',
    color: '#93C5FD',
    description: 'Education assistance, child protection, mentoring, holiday programs, and spiritual nurture for vulnerable children and those born in prison.',
    activities: [
      'Education assistance and school fees support',
      'Child protection and safety programs',
      'After school mentoring programs',
      'Holiday and enrichment programs',
      'Spiritual formation and character building',
      'Nutritional support and healthcare access',
      'Trauma informed counseling',
    ],
    impact: 'Hundreds of children supported in education',
  },
  {
    id: 'youth',
    icon: FiTrendingUp,
    title: 'Youth Empowerment',
    tagline: 'Equipping the leaders of tomorrow',
    bg: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
    color: '#C4B5FD',
    description: 'Skills training, entrepreneurship, leadership development, career guidance, and innovation programs for unemployed and at-risk youth.',
    activities: [
      'Practical vocational skills training',
      'Entrepreneurship incubation and mentorship',
      'Leadership development programs',
      'Career guidance and professional coaching',
      'Innovation and technology exposure',
      'Sports and arts based programs',
      'Christian character and values formation',
    ],
    impact: 'Youth transformed into community leaders and entrepreneurs',
  },
  {
    id: 'family',
    icon: FiHome,
    title: 'Family Strengthening',
    tagline: 'Strong families build strong communities',
    bg: 'linear-gradient(135deg, #0E7490, #0891B2)',
    color: '#67E8F9',
    description: 'Marriage enrichment, parenting workshops, reconciliation, and counseling for families seeking restoration and strength.',
    activities: [
      'Marriage enrichment retreats and workshops',
      'Parenting skills development programs',
      'Family conflict resolution and mediation',
      'Professional counseling for couples',
      'Pre marital preparation programs',
      'Father presence initiatives',
      'Single parent household support',
    ],
    impact: 'Families restored and marriages saved',
  },
  {
    id: 'community',
    icon: FiGlobe,
    title: 'Community Outreach',
    tagline: 'Transforming entire neighborhoods for God',
    bg: 'linear-gradient(135deg, #92400E, #D97706)',
    color: '#FCD34D',
    description: 'Evangelism, relief assistance, health awareness, and community development initiatives reaching underserved neighborhoods across Uganda.',
    activities: [
      'Community evangelism and crusades',
      'Relief assistance for crisis situations',
      'Health awareness and hygiene programs',
      'Community development projects',
      'School outreach and youth programs',
      'Neighborhood prayer networks',
      'Civic engagement and peacebuilding',
    ],
    impact: 'Communities transformed across Uganda',
  },
];

export default function Programs() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--forest-green) 0%, var(--navy-dark) 100%)',
        padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Ministry Programs</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Holistic Ministry for<br />Every Dimension of Need
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
              Six comprehensive programs addressing the spiritual, social, emotional, and economic needs
              of Uganda's most vulnerable people.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program overview */}
      <section style={{ padding: '4rem 0 1rem', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {programs.map(p => {
              const NavIcon = p.icon;
              return (
                <a key={p.id} href={`#${p.id}`} style={{
                  padding: '0.5rem 1.25rem',
                  background: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '50px',
                  color: 'var(--gray-700)',
                  fontSize: '0.875rem', fontWeight: 500,
                  transition: 'var(--transition)',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--forest-green)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--forest-green)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--gray-700)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                >
                  <NavIcon size={14} /> {p.title.split(' ')[0]}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      {programs.map((program, i) => (
        <section key={program.id} id={program.id} style={{ padding: '6rem 0', background: i % 2 === 0 ? 'var(--cream)' : 'white' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ order: i % 2 === 0 ? 1 : 2 }}
              >
                {(() => { const Icon = program.icon; return (
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(45,106,79,0.1)', border: '1.5px solid rgba(45,106,79,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <Icon size={24} style={{ color: 'var(--forest-green)' }} />
                  </div>
                ); })()}
                <div style={{ color: 'var(--forest-green)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {program.tagline}
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem', lineHeight: 1.2 }}>
                  {program.title}
                </h2>
                <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, var(--forest-green), var(--gold))', borderRadius: '2px', marginBottom: '1.25rem' }} />
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1rem' }}>
                  {program.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', background: 'rgba(45,106,79,0.08)', borderRadius: '8px', marginBottom: '2rem' }}>
                  <FiBarChart2 size={18} style={{ color: 'var(--forest-green)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--forest-green)', fontWeight: 600, fontSize: '0.9rem' }}>{program.impact}</span>
                </div>
                <Link to="/get-involved" className="btn btn-primary">
                  Support This Program <FiArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Activities card */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ order: i % 2 === 0 ? 2 : 1 }}
              >
                <div style={{ background: program.bg, borderRadius: '20px', padding: '2.5rem', color: 'white' }}>
                  <div style={{ fontFamily: 'var(--font-cinzel)', color: program.color, fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                    WHAT WE DO
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {program.activities.map(activity => (
                      <li key={activity} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${program.color}30`, border: `1px solid ${program.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <FiCheck size={11} style={{ color: program.color }} />
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
      ))}

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 700, marginBottom: '1.25rem' }}>
              Partner in Holistic Transformation
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Every donation, every hour of volunteering, every prayer advances all six of these life changing programs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/get-involved" className="btn btn-gold">Get Involved</Link>
              <Link to="/get-involved#volunteer" className="btn btn-outline">Volunteer</Link>
              <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
