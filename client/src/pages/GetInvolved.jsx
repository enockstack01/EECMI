import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  FiUsers, FiLink, FiSend, FiArrowRight, FiHeart, FiMail, FiPhone,
  FiHome, FiBriefcase, FiBarChart2, FiBook,
  FiCheck, FiX,
} from 'react-icons/fi';

const tabs = [
  { id: 'volunteer', label: 'Volunteer', shortDesc: 'Outreach, mentoring, training, and prayer', icon: FiUsers },
  { id: 'partner',   label: 'Partner',   shortDesc: 'Churches, NGOs, businesses, and individuals', icon: FiLink },
  { id: 'prayer',    label: 'Pray',      shortDesc: 'Join the prayer network', icon: FiSend },
  { id: 'donate',    label: 'Donate',    shortDesc: 'Support the ministry financially', icon: FiHeart },
];

const volunteerAreas = [
  'Prison Outreach', 'Women Empowerment', 'Children Programs', 'Youth Ministry',
  'Family Counseling', 'Community Outreach', 'Administration', 'Media & Communications',
  'Logistics', 'Prayer Team',
];

const partnerAreas = [
  'Financial Support', 'Program Collaboration', 'Technical Expertise',
  'Advocacy & Awareness', 'Employee Volunteering', 'Resource Sharing',
  'Joint Programs', 'Prayer Partnership',
];

const partnerTypes = [
  { icon: FiHome,      title: 'Churches',            desc: 'Join our network of praying, giving, and serving churches to multiply impact in communities.' },
  { icon: FiBriefcase, title: 'Organizations & NGOs', desc: 'Share resources, expertise, and collaborate on joint programs and initiatives.' },
  { icon: FiBarChart2, title: 'Businesses',           desc: 'CSR partnerships, employee volunteering programs, and corporate sponsorships.' },
  { icon: FiBook,      title: 'Schools & Institutions', desc: 'Youth development partnerships, internship placements, and educational support.' },
];

function SubmitModal({ status, onClose }) {
  if (!status) return null;
  const isSuccess = status.type === 'success';
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'white', borderRadius: '20px', padding: '2.5rem',
            maxWidth: '440px', width: '100%', textAlign: 'center',
            boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{
            width: '76px', height: '76px', borderRadius: '50%',
            background: isSuccess ? 'rgba(45,106,79,0.1)' : 'rgba(220,38,38,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            {isSuccess
              ? <FiCheck size={34} style={{ color: 'var(--forest-green)' }} />
              : <FiX size={34} style={{ color: '#dc2626' }} />
            }
          </div>
          <h3 style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700,
            marginBottom: '0.75rem',
            color: isSuccess ? 'var(--forest-green)' : '#dc2626',
          }}>
            {isSuccess ? 'Submitted Successfully!' : 'Submission Failed'}
          </h3>
          <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
            {status.msg}
          </p>
          <button
            onClick={onClose}
            className={isSuccess ? 'btn btn-primary' : 'btn btn-outline'}
            style={{ padding: '0.75rem 2rem' }}
          >
            {isSuccess ? 'Close' : 'Try Again'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VolunteerForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/volunteer', data);
      setModal({ type: 'success', msg: res.data.message });
      reset();
    } catch (err) {
      setModal({ type: 'error', msg: err.response?.data?.message || 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitModal status={modal} onClose={() => setModal(null)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" placeholder="Your full name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="your@email.com" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" placeholder="+256 XXX XXX XXX" {...register('phone')} />
          </div>
          <div className="form-group">
            <label className="form-label">Location / City</label>
            <input className="form-input" placeholder="Kampala, Uganda" {...register('location')} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Areas of Interest (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {volunteerAreas.map(area => (
              <label key={area} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', border: '1px solid var(--gray-200)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', transition: 'var(--transition)' }}>
                <input type="checkbox" value={area} {...register('areas')} style={{ accentColor: 'var(--forest-green)' }} />
                {area}
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Availability</label>
            <select className="form-input" {...register('availability')}>
              <option value="">Select availability</option>
              <option>Weekends only</option>
              <option>Weekdays only</option>
              <option>Full time</option>
              <option>Flexible / Remote</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Skills & Experience</label>
            <input className="form-input" placeholder="e.g. Counseling, Teaching, IT..." {...register('skills')} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Why do you want to volunteer?</label>
          <textarea className="form-input" rows={4} placeholder="Share your heart and motivation..." {...register('motivation')} style={{ resize: 'vertical' }} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
          {loading ? 'Submitting...' : <><FiArrowRight size={16} /> Register as Volunteer</>}
        </button>
      </form>
    </>
  );
}

function PartnerForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/partner', data);
      setModal({ type: 'success', msg: res.data.message });
      reset();
    } catch (err) {
      setModal({ type: 'error', msg: err.response?.data?.message || 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitModal status={modal} onClose={() => setModal(null)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input className="form-input" placeholder="Full name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="your@email.com" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Organization / Church Name</label>
            <input className="form-input" placeholder="Organization or church name" {...register('organization')} />
          </div>
          <div className="form-group">
            <label className="form-label">Partner Type</label>
            <select className="form-input" {...register('partnerType')}>
              <option value="Individual">Individual</option>
              <option value="Church">Church</option>
              <option value="NGO">NGO / Non Profit</option>
              <option value="Business">Business</option>
              <option value="School">School / Institution</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Partnership Areas (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {partnerAreas.map(area => (
              <label key={area} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', border: '1px solid var(--gray-200)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', transition: 'var(--transition)' }}>
                <input type="checkbox" value={area} {...register('partnershipAreas')} style={{ accentColor: 'var(--forest-green)' }} />
                {area}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Message / How You Would Like to Partner</label>
          <textarea className="form-input" rows={4} placeholder="Tell us about your vision for partnership and how you would like to collaborate..." {...register('message')} style={{ resize: 'vertical' }} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
          {loading ? 'Submitting...' : <><FiLink size={16} /> Submit Partnership Request</>}
        </button>
      </form>
    </>
  );
}

function PrayerForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/prayer', data);
      setModal({ type: 'success', msg: res.data.message });
      reset();
    } catch (err) {
      setModal({ type: 'error', msg: err.response?.data?.message || 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubmitModal status={modal} onClose={() => setModal(null)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" placeholder="Your name (optional)" {...register('name')} />
          </div>
          <div className="form-group">
            <label className="form-label">Email (for follow up)</label>
            <input className="form-input" type="email" placeholder="your@email.com" {...register('email')} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Your Prayer Request *</label>
          <textarea className="form-input" rows={5} placeholder="Share your prayer request with us..." {...register('request', { required: 'Please share your request' })} style={{ resize: 'vertical' }} />
          {errors.request && <p className="form-error">{errors.request.message}</p>}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" {...register('isAnonymous')} style={{ accentColor: 'var(--forest-green)' }} />
            Keep my name anonymous
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input type="checkbox" {...register('isPublic')} style={{ accentColor: 'var(--forest-green)' }} />
            Share publicly on our prayer wall
          </label>
        </div>
        <button type="submit" className="btn btn-navy" disabled={loading} style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
          {loading ? 'Sending...' : <><FiSend size={16} /> Submit Prayer Request</>}
        </button>
      </form>
    </>
  );
}

export default function GetInvolved() {
  const [activeTab, setActiveTab] = useState('volunteer');
  const location = useLocation();
  const hash = location.hash.replace('#', '');

  React.useEffect(() => {
    if (hash && tabs.find(t => t.id === hash)) {
      setActiveTab(hash);
    }
  }, [hash]);

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
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Get Involved</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Join the Mission of<br />Transformation
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
              There are many ways to participate. Every act of service, partnership, or prayer moves God's work forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab selector */}
      <section style={{ padding: '4rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {tabs.map(way => {
              const Icon = way.icon;
              return (
                <motion.button key={way.id} onClick={() => setActiveTab(way.id)}
                  whileHover={{ y: -4 }}
                  style={{
                    background: activeTab === way.id ? 'var(--forest-green)' : 'white',
                    borderRadius: '12px', padding: '1.75rem',
                    textAlign: 'center',
                    border: activeTab === way.id ? '2px solid var(--forest-green)' : '2px solid var(--gray-100)',
                    cursor: 'pointer', transition: 'var(--transition)',
                    boxShadow: activeTab === way.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  }}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: activeTab === way.id ? 'rgba(255,255,255,0.2)' : 'rgba(45,106,79,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                  }}>
                    <Icon size={22} style={{ color: activeTab === way.id ? 'white' : 'var(--forest-green)' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', color: activeTab === way.id ? 'white' : 'var(--gray-900)', marginBottom: '0.25rem' }}>
                    {way.label}
                  </div>
                  <div style={{ color: activeTab === way.id ? 'rgba(255,255,255,0.8)' : 'var(--gray-500)', fontSize: '0.85rem' }}>
                    {way.shortDesc}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section style={{ padding: '4rem 0 6rem', background: 'white' }}>
        <div className="container">

          {/* VOLUNTEER */}
          {activeTab === 'volunteer' && (
            <motion.div id="volunteer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="section-badge">Serve With Us</div>
                <h2 className="section-title">Volunteer Registration</h2>
                <div className="divider" />
                <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                  Serve through outreach, mentoring, training, logistics, administration, media, and prayer.
                  Your skills and time are needed and valued in God's kingdom work.
                </p>
                <VolunteerForm />
              </div>
            </motion.div>
          )}

          {/* PARTNER */}
          {activeTab === 'partner' && (
            <motion.div id="partner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="section-badge">Strategic Partnership</div>
                <h2 className="section-title">Partner With EECMI</h2>
                <div className="divider" />
                <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                  We welcome partnerships with churches, NGOs, businesses, schools, and individuals who share our
                  vision of a transformed Uganda. Partners can contribute through expertise, resources, and advocacy.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  {partnerTypes.map(p => {
                    const Icon = p.icon;
                    return (
                      <div key={p.title} style={{
                        background: 'var(--gray-50)', borderRadius: '16px', padding: '1.75rem',
                        border: '1px solid var(--gray-100)', transition: 'var(--transition)',
                      }}
                        onMouseOver={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--forest-green)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--gray-100)'; }}
                      >
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '12px',
                          background: 'rgba(45,106,79,0.08)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginBottom: '1rem',
                        }}>
                          <Icon size={22} style={{ color: 'var(--forest-green)' }} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-900)', marginBottom: '0.5rem' }}>{p.title}</h3>
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', lineHeight: 1.6 }}>{p.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <PartnerForm />
              </div>
            </motion.div>
          )}

          {/* PRAYER */}
          {activeTab === 'prayer' && (
            <motion.div id="prayer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="section-badge">Prayer Network</div>
                <h2 className="section-title">Request Prayer</h2>
                <div className="divider" />
                <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2rem' }}>
                  We believe prayer moves mountains. Share your need with us and our dedicated prayer team
                  will stand in agreement with you before God. You are not alone.
                </p>

                <div style={{ background: 'linear-gradient(135deg, var(--forest-green), var(--navy-dark))', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', color: 'white', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontStyle: 'italic' }}>
                    "The prayer of a righteous person is powerful and effective." — James 5:16
                  </p>
                </div>

                <PrayerForm />
              </div>
            </motion.div>
          )}

          {/* DONATE */}
          {activeTab === 'donate' && (
            <motion.div id="donate" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                <div className="section-badge">Give Toward the Mission</div>
                <h2 className="section-title">Support EECMI</h2>
                <div className="divider" style={{ margin: '0 auto' }} />
                <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2rem' }}>
                  Your giving restores lives, rebuilds families, and transforms communities across Uganda.
                  Reach out to our team directly and we'll walk you through the best way to give —
                  whether that's a bank transfer, mobile money, or an in-kind contribution.
                </p>

                <div style={{ background: 'var(--gray-50)', borderRadius: '16px', padding: '2rem', border: '1px solid var(--gray-100)', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <a href="mailto:admin@eecmi.org" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--gray-900)', fontSize: '0.95rem', fontWeight: 600 }}>
                    <FiMail size={16} style={{ color: 'var(--forest-green)' }} /> admin@eecmi.org
                  </a>
                  <a href="tel:+250722439327" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--gray-900)', fontSize: '0.95rem', fontWeight: 600 }}>
                    <FiPhone size={16} style={{ color: 'var(--forest-green)' }} /> +250 722 439 327
                  </a>
                </div>

                <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
                  <FiHeart size={16} /> Contact Us About Giving
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
