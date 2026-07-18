import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FiMapPin, FiMail, FiPhone, FiSend, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMessageSquare, FiCheck, FiX } from 'react-icons/fi';

function SubmitModal({ status, onClose }) {
  if (!status) return null;
  const isSuccess = status.type === 'success';
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220 }}
          onClick={e => e.stopPropagation()}
          style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', maxWidth: '440px', width: '100%', textAlign: 'center', boxShadow: '0 25px 80px rgba(0,0,0,0.3)' }}
        >
          <div style={{ width: '76px', height: '76px', borderRadius: '50%', background: isSuccess ? 'rgba(45,106,79,0.1)' : 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            {isSuccess ? <FiCheck size={34} style={{ color: 'var(--forest-green)' }} /> : <FiX size={34} style={{ color: '#dc2626' }} />}
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: isSuccess ? 'var(--forest-green)' : '#dc2626' }}>
            {isSuccess ? 'Message Sent!' : 'Sending Failed'}
          </h3>
          <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{status.msg}</p>
          <button onClick={onClose} className={isSuccess ? 'btn btn-primary' : 'btn btn-outline'} style={{ padding: '0.75rem 2rem' }}>
            {isSuccess ? 'Close' : 'Try Again'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/contact', data);
      setModal({ type: 'success', msg: res.data.message });
      reset();
    } catch (err) {
      setModal({ type: 'error', msg: err.response?.data?.message || 'Message failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SubmitModal status={modal} onClose={() => setModal(null)} />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)',
        padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact Us</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Let's Connect
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.8 }}>
              We'd love to hear from you. Reach out to learn more, ask questions, or explore how we can serve together.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="section-badge">Reach Us</div>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Get in Touch</h2>
              <div className="divider" />
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: '2rem', fontSize: '1rem' }}>
                Our team is ready to answer your questions, discuss partnership opportunities, or simply pray with you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: FiMapPin, title: 'Office Location', detail: 'Kampala, Uganda', color: 'var(--forest-green)' },
                  { icon: FiMail, title: 'Email Address', detail: 'admin@eecmi.org', color: 'var(--gold)' },
                  { icon: FiPhone, title: 'Phone Number', detail: '+250 722 439 327', color: 'var(--navy)' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: `${item.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--gray-900)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.title}</div>
                      <div style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--gray-900)', marginBottom: '1rem', fontSize: '0.9rem' }}>Follow Our Ministry</div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {[
                    { icon: FiFacebook, label: 'Facebook' },
                    { icon: FiTwitter, label: 'Twitter' },
                    { icon: FiInstagram, label: 'Instagram' },
                    { icon: FiYoutube, label: 'YouTube' },
                  ].map(({ icon: Icon, label }) => (
                    <a key={label} href="/" onClick={(e) => e.preventDefault()} aria-label={label} style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: 'white', border: '1px solid var(--gray-200)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--gray-500)', transition: 'var(--transition)',
                    }}
                      onMouseOver={e => { e.currentTarget.style.background = 'var(--forest-green)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--forest-green)'; }}
                      onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--gray-500)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/250722439327?text=Hello%20EECMI%2C%20I%20would%20like%20to%20connect%20with%20your%20ministry."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: '#25D366', borderRadius: '12px', padding: '1rem 1.5rem',
                  color: 'white', textDecoration: 'none', marginTop: '1.5rem', marginBottom: '1rem',
                  transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiMessageSquare size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Chat on WhatsApp</div>
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>+250 722 439 327 — Tap to chat now</div>
                </div>
              </a>

              {/* Google Maps — Kampala, Uganda */}
              <div style={{ marginTop: '2rem', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <iframe
                  title="EECMI Location — Kampala, Uganda"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.3585374362!2d32.29767615!3d0.31628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f90d201cb%3A0x4d771b76f16e7be7!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sug!4v1720000000000"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Send Us a Message</h3>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '2rem' }}>We respond within 24–48 hours.</p>


                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="Your name" {...register('name', { required: 'Required' })} />
                      {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="your@email.com" {...register('email', { required: 'Required' })} />
                      {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" placeholder="+256 XXX XXX XXX" {...register('phone')} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <select className="form-input" {...register('subject', { required: 'Required' })}>
                      <option value="">Select a subject</option>
                      <option>General Inquiry</option>
                      <option>Donation & Giving</option>
                      <option>Volunteer Interest</option>
                      <option>Partnership Opportunity</option>
                      <option>Media & Press</option>
                      <option>Prayer Request</option>
                      <option>Other</option>
                    </select>
                    {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" rows={5} placeholder="How can we help you?" {...register('message', { required: 'Required' })} style={{ resize: 'vertical' }} />
                    {errors.message && <p className="form-error">{errors.message.message}</p>}
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}>
                    {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Isaiah Footer Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.25em', marginBottom: '0.75rem' }}>ISAIAH 60:1</p>
          <p style={{ fontFamily: 'var(--font-serif)', color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
            "Arise, shine, for your light has come, and the glory of the LORD rises upon you."
          </p>
        </div>
      </div>
    </motion.div>
  );
}
