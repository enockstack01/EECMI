import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiArrowRight, FiPlay, FiHeart, FiUsers, FiHome, FiStar,
  FiChevronLeft, FiChevronRight, FiCheck,
  FiLock, FiUnlock, FiTrendingUp, FiGlobe, FiUser,
} from 'react-icons/fi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay },
});

const programs = [
  {
    id: 'prison',
    title: 'Prison Outreach',
    desc: 'Evangelism, discipleship, counseling, reintegration and mentorship for incarcerated individuals.',
    color: 'var(--forest-green)',
    bg: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
    icon: FiLock,
  },
  {
    id: 'women',
    title: 'Women Empowerment',
    desc: 'Vocational skills, entrepreneurship, parenting support, mentorship and savings groups.',
    color: 'var(--earth)',
    bg: 'linear-gradient(135deg, #6B3E26, #8B5E3C)',
    icon: FiHeart,
  },
  {
    id: 'children',
    title: 'Children Support',
    desc: 'Education assistance, child protection, mentoring, holiday programs and spiritual nurture.',
    color: 'var(--navy)',
    bg: 'linear-gradient(135deg, #0D2137, #1A3A5C)',
    icon: FiUser,
  },
  {
    id: 'youth',
    title: 'Youth Empowerment',
    desc: 'Skills training, entrepreneurship, leadership development, career guidance and innovation.',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
    icon: FiTrendingUp,
  },
  {
    id: 'family',
    title: 'Family Strengthening',
    desc: 'Marriage enrichment, parenting workshops, reconciliation and family counseling.',
    color: '#0891B2',
    bg: 'linear-gradient(135deg, #0E7490, #0891B2)',
    icon: FiHome,
  },
  {
    id: 'community',
    title: 'Community Outreach',
    desc: 'Evangelism, relief assistance, health awareness and community development initiatives.',
    color: '#B45309',
    bg: 'linear-gradient(135deg, #92400E, #D97706)',
    icon: FiGlobe,
  },
];

const testimonials = [
  {
    quote: "EECMI gave me a second chance. Through their prison ministry, I found Christ and upon release, they helped me build a new life for myself and my family.",
    name: "David M.",
    role: "Former Prisoner, Kampala",
  },
  {
    quote: "The women's empowerment program transformed me from a struggling single mother to a business owner who now supports 5 other women in my community.",
    name: "Grace N.",
    role: "Program Beneficiary",
  },
  {
    quote: "My children received education support and spiritual guidance that changed the trajectory of our entire family. We are forever grateful.",
    name: "Sarah K.",
    role: "Mother of 3, Uganda",
  },
];

const values = [
  'Christ Centeredness', 'Restoration', 'Compassion', 'Empowerment',
  'Holistic Transformation', 'Integrity', 'Accountability', 'Hope',
];

const whoWeServe = [
  { group: 'Prisoners', desc: 'Bringing hope behind prison walls', icon: FiLock, color: 'var(--forest-green)' },
  { group: 'Former Prisoners', desc: 'Supporting successful reintegration', icon: FiUnlock, color: 'var(--mid-green)' },
  { group: 'Single Mothers', desc: 'Empowering mothers to thrive', icon: FiHeart, color: 'var(--earth)' },
  { group: 'Vulnerable Children', desc: 'Protecting and nurturing the young', icon: FiStar, color: 'var(--navy)' },
  { group: 'Children Born in Prison', desc: 'A fresh start from the very beginning', icon: FiUser, color: '#0891B2' },
  { group: 'Unemployed Youth', desc: 'Building futures through skills', icon: FiTrendingUp, color: '#7C3AED' },
  { group: 'Underserved Communities', desc: 'Transforming entire neighborhoods', icon: FiGlobe, color: '#B45309' },
];

const whoWeAreGrid = [
  { bg: 'linear-gradient(135deg, var(--dark-green), var(--forest-green))', text: 'Christ Centered', icon: FiStar, span: false },
  { bg: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', text: 'Holistic Outreach', icon: FiHeart, span: false },
  { bg: 'linear-gradient(135deg, var(--navy-dark), var(--navy))', text: 'Sustainable Impact', icon: FiUsers, span: true },
  { bg: 'linear-gradient(135deg, var(--earth), var(--earth-light))', text: 'Community Focused', icon: FiGlobe, span: false },
];

function ProgramCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = item.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        borderRadius: '16px', overflow: 'hidden',
        background: item.bg, color: 'white',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'var(--transition)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column',
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: 'rgba(255,255,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.25rem', flexShrink: 0,
      }}>
        <Icon size={24} style={{ color: 'rgba(255,255,255,0.95)' }} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
        {item.title}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem', flex: 1 }}>
        {item.desc}
      </p>
      <Link to={`/programs#${item.id}`} className="btn btn-outline" style={{
        fontSize: '0.85rem', padding: '0.55rem 1.25rem',
        borderColor: 'rgba(255,255,255,0.55)',
        alignSelf: 'flex-start',
      }}>
        Learn More <FiArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
      }}>
        {/* Video background — replace src with actual ministry footage */}
        <video
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1600&q=80"
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/3943968/3943968-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(27,67,50,0.93) 0%, rgba(13,33,55,0.88) 50%, rgba(139,94,60,0.75) 100%)',
        }} />

        {/* Animated light rays */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.06, 0], scaleY: 1 }}
              transition={{ delay: i * 0.4, duration: 3, repeat: Infinity, repeatDelay: 4 + i }}
              style={{
                position: 'absolute',
                top: '-10%', left: `${15 + i * 18}%`,
                width: '3px', height: '120%',
                background: 'linear-gradient(180deg, transparent, rgba(212,160,23,0.4), transparent)',
                transformOrigin: 'top',
                transform: `rotate(${-15 + i * 6}deg)`,
                filter: 'blur(8px)',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 3, padding: '8rem 1.5rem 5rem' }}>
          <div style={{ maxWidth: '760px' }}>
            <motion.div {...fadeIn(0.2)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(212,160,23,0.15)',
              border: '1px solid rgba(212,160,23,0.4)',
              borderRadius: '50px', padding: '0.4rem 1.25rem',
              color: 'var(--gold-light)', fontSize: '0.8rem',
              fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: '1.5rem', backdropFilter: 'blur(10px)',
            }}>
              <span style={{ width: '6px', height: '6px', background: 'var(--gold)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              Christ Centered Ministry in Uganda
            </motion.div>

            <motion.h1 {...fadeUp(0.3)} style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 800, color: 'white',
              lineHeight: 1.1, marginBottom: '1.5rem',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}>
              Transforming Lives<br />
              <span style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>
                Through Christ Centered Outreach
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.45)} style={{
              color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '620px',
            }}>
              Ecclessia Eden Commission Ministries International is a Christ centered ministry committed to
              restoring lives, rebuilding families, empowering vulnerable people, and transforming communities
              through holistic ministry, discipleship, compassion, and sustainable development.
            </motion.p>

            <motion.div {...fadeUp(0.6)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/get-involved" className="btn btn-gold" style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}>
                <FiHeart size={18} /> Get Involved
              </Link>
              <Link to="/programs" className="btn btn-outline" style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}>
                Our Programs <FiArrowRight size={18} />
              </Link>
              <Link to="/impact" className="btn btn-ghost" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                <FiPlay size={16} /> Our Impact
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em',
            zIndex: 3,
          }}
        >
          <div style={{
            width: '24px', height: '38px', border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px',
          }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: '4px', height: '4px', background: 'var(--gold)', borderRadius: '50%' }}
            />
          </div>
          SCROLL
        </motion.div>
      </section>

      {/* ISAIAH 60:1 SCRIPTURE BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 50%, var(--earth) 100%)',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Golden radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '1px', height: '200px',
            background: 'linear-gradient(to top, rgba(212,160,23,0.3), transparent)',
            transformOrigin: 'bottom center',
            transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
            pointerEvents: 'none',
          }} />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, maxWidth: '140px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <div style={{ width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%', boxShadow: '0 0 12px rgba(212,160,23,0.6)' }} />
            <div style={{ flex: 1, maxWidth: '140px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
              color: 'var(--gold)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Isaiah 60:1
            </div>

            <blockquote style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.4,
              maxWidth: '820px',
              margin: '0 auto 2rem',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}>
              "Arise, shine, for your light has come,<br />
              and the glory of the <span style={{
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>LORD</span> rises upon you."
            </blockquote>

            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}>
              This is the heartbeat of our ministry — bringing God's transforming light to the darkest places,
              restoring dignity and hope to those society has forgotten.
            </p>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ flex: 1, maxWidth: '140px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <div style={{ width: '8px', height: '8px', background: 'var(--gold)', borderRadius: '50%', boxShadow: '0 0 12px rgba(212,160,23,0.6)' }} />
            <div style={{ flex: 1, maxWidth: '140px', height: '1px', background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>
        </div>
      </section>


      {/* WHO WE ARE */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="section-badge">Who We Are</div>
              <h2 className="section-title">A Ministry Built on<br /><em>Christ's Love</em></h2>
              <div className="divider" />
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Ecclessia Eden Commission Ministries International is a nonprofit Christian ministry
                serving prisoners, former prisoners, single mothers, vulnerable children, unemployed
                youth, and underserved communities through holistic outreach.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: '2rem', fontSize: '1rem' }}>
                Founded in Kampala, Uganda, we believe that every person — regardless of their past —
                carries infinite worth and deserves to experience God's restorative love and power.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Vision', text: "A society where lives are transformed through Christ, families are restored, and communities reflect God's design of wholeness." },
                  { label: 'Mission', text: 'To transform lives and restore communities through Christ centered outreach, discipleship, and holistic empowerment.' },
                ].map(item => (
                  <div key={item.label} style={{
                    flex: '1 1 200px',
                    padding: '1.25rem',
                    background: 'white',
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--forest-green)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--forest-green)', marginBottom: '0.4rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn btn-primary">
                Learn More About Us <FiArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {whoWeAreGrid.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} style={{
                      gridColumn: card.span ? 'span 2' : 'span 1',
                      background: card.bg,
                      borderRadius: '16px',
                      padding: '1.75rem',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      minHeight: '100px',
                      boxShadow: 'var(--shadow-md)',
                    }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '10px',
                        background: 'rgba(255,255,255,0.18)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={20} style={{ color: 'rgba(255,255,255,0.95)' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.05rem' }}>{card.text}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: '1rem',
                background: 'var(--dark-green)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                color: 'white',
              }}>
                <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>OUR TAGLINE</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>
                  Restoring Lives. Rebuilding Families. Transforming Communities Through Christ.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROGRAMS OVERVIEW */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <div className="section-badge">Ministry Programs</div>
            <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>
              Holistic Ministry<br />Across Every Need
            </h2>
            <div className="divider" style={{ margin: '0 auto 1rem' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Our six core programs address the complete spectrum of human need —
              spiritual, emotional, social, and economic.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {programs.map((p, i) => <ProgramCard key={p.id} item={p} index={i} />)}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <Link to="/programs" className="btn btn-outline-green" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
              Explore All Programs <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, var(--cream) 0%, white 100%)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <div className="section-badge">Who We Serve</div>
            <h2 className="section-title">Reaching the Most<br />Vulnerable</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.group}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    background: 'white', borderRadius: '12px',
                    padding: '1.75rem 1.5rem', textAlign: 'center',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--gray-100)',
                    transition: 'var(--transition)',
                  }}
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: `${item.color}15`,
                    border: `1.5px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}>
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: '0.4rem' }}>
                    {item.group}
                  </h3>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section style={{ padding: '5rem 0', background: 'var(--forest-green)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div style={{ color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Our Foundation
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '2.5rem' }}>
              Core Values We Stand On
            </h2>
          </motion.div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
            {values.map((v, i) => (
              <motion.div key={v}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  padding: '0.6rem 1.25rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50px',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}
                whileHover={{ background: 'rgba(212,160,23,0.25)', borderColor: 'var(--gold)', color: 'var(--gold-light)' }}
              >
                <FiCheck size={14} /> {v}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <div className="section-badge">Testimonies</div>
            <h2 className="section-title">Lives Changed<br />by God's Grace</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </motion.div>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              background: 'white', borderRadius: '20px', padding: '3rem',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              border: '1px solid var(--gray-100)',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
                width: '40px', height: '40px',
                background: 'var(--gold)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '1.25rem', fontFamily: 'Georgia',
              }}>
                "
              </div>

              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                  fontStyle: 'italic',
                  color: 'var(--gray-700)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}>
                  "{testimonials[testimonialIdx].quote}"
                </p>
                <div style={{ fontWeight: 700, color: 'var(--forest-green)', fontSize: '1rem' }}>
                  {testimonials[testimonialIdx].name}
                </div>
                <div style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                  {testimonials[testimonialIdx].role}
                </div>
              </motion.div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} style={{
                    width: i === testimonialIdx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === testimonialIdx ? 'var(--forest-green)' : 'var(--gray-200)',
                    border: 'none', cursor: 'pointer',
                    transition: 'var(--transition)',
                  }} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
            </div>

            <button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)}
              style={{
                position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'white', boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--gray-200)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--forest-green)',
              }}>
              <FiChevronLeft />
            </button>
            <button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)}
              style={{
                position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'white', boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--gray-200)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--forest-green)',
              }}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 60%, var(--earth) 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Join the Mission
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Be the Change<br />Someone Needs Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
              Your generosity, time, and prayer can transform a life forever.
              Together we can shine God's light into the darkest places.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/get-involved#donate" className="btn btn-gold" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                <FiHeart size={18} /> Donate
              </Link>
              <Link to="/get-involved#volunteer" className="btn btn-outline" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Become a Volunteer
              </Link>
              <Link to="/get-involved#partner" className="btn btn-ghost" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                Partner With Us
              </Link>
              <Link to="/get-involved#prayer" className="btn btn-ghost" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                Request Prayer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
