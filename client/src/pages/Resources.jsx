import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiDownload, FiPlay, FiFileText, FiBookOpen, FiVideo, FiMail, FiExternalLink } from 'react-icons/fi';

const TYPE_ICONS = {
  PDF: FiFileText,
  Video: FiVideo,
  Audio: FiPlay,
  Article: FiFileText,
  Book: FiBookOpen,
  Curriculum: FiBookOpen,
  Report: FiFileText,
  Other: FiDownload,
};

const TYPE_COLORS = {
  PDF: 'var(--navy)',
  Video: '#DC2626',
  Audio: '#7C3AED',
  Article: 'var(--forest-green)',
  Book: 'var(--gold)',
  Curriculum: 'var(--gold)',
  Report: 'var(--navy)',
  Other: 'var(--earth)',
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');

  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [subLoading, setSubLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/resources')
      .then(res => { if (res.data.success) setResources(res.data.data); })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(resources.map(r => r.type).filter(Boolean))], [resources]);
  const filtered = active === 'All' ? resources : resources.filter(r => r.type === active);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    try {
      const res = await axios.post('/api/newsletter/subscribe', { email });
      setMsg(res.data.message);
      setEmail('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setSubLoading(false);
    }
  };

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
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '2rem 0' }}>Loading resources...</div>
          ) : resources.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '2rem 0' }}>
              No resources have been published yet. Check back soon.
            </div>
          ) : (
            <>
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
                {filtered.map((resource, i) => {
                  const Icon = TYPE_ICONS[resource.type] || FiFileText;
                  const color = TYPE_COLORS[resource.type] || 'var(--forest-green)';
                  const href = resource.fileUrl || resource.externalUrl;
                  const label = resource.fileUrl ? 'Download' : resource.type === 'Video' ? 'Watch Now' : 'View Resource';
                  const ActionIcon = resource.fileUrl ? FiDownload : resource.type === 'Video' ? FiPlay : FiExternalLink;

                  return (
                    <motion.div key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      style={{
                        background: 'white', borderRadius: '16px', padding: '1.75rem',
                        border: '1px solid var(--gray-100)', boxShadow: 'var(--shadow-sm)',
                        transition: 'var(--transition)',
                      }}
                      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '10px',
                          background: `${color}15`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Icon size={20} style={{ color }} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          {resource.year && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--gray-500)', background: 'var(--gray-100)', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                              {resource.year}
                            </span>
                          )}
                          <span style={{ fontSize: '0.7rem', color, background: `${color}15`, padding: '0.25rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                            {resource.type}
                          </span>
                        </div>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gray-900)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                          {resource.description}
                        </p>
                      )}

                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                          color, fontSize: '0.8rem', fontWeight: 600,
                          borderBottom: `1px solid ${color}`,
                        }}>
                          <ActionIcon size={14} /> {label}
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>No link available yet</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}

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
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', maxWidth: '460px', margin: '0 auto', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: 1, minWidth: '220px', padding: '0.875rem 1.25rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px', color: 'white', fontSize: '0.9rem', outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-gold" disabled={subLoading} style={{ whiteSpace: 'nowrap', padding: '0.875rem 1.5rem' }}>
                {subLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {msg && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: msg.includes('failed') || msg.includes('already') ? '#f87171' : 'var(--gold-light)' }}>
                {msg}
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
