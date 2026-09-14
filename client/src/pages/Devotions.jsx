import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiArrowRight, FiBookOpen, FiHeadphones, FiFileText, FiFile, FiVideo, FiLink } from 'react-icons/fi';

const TYPE_ICON = { text: FiBookOpen, pdf: FiFileText, document: FiFile, audio: FiHeadphones, video: FiVideo, link: FiLink };

export default function Devotions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [series, setSeries] = useState('All');

  useEffect(() => {
    axios.get('/api/devotions')
      .then((res) => setItems(res.data?.data || []))
      .catch(() => setError('Could not load devotions right now. Please try again shortly.'))
      .finally(() => setLoading(false));
  }, []);

  const seriesList = useMemo(
    () => ['All', ...Array.from(new Set(items.map((d) => d.series).filter(Boolean)))],
    [items],
  );
  const filtered = series === 'All' ? items : items.filter((d) => d.series === series);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Grow With Us</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Devotion Materials
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
              Daily readings, studies, and audio to walk with Christ.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '5rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container">
          {seriesList.length > 1 && (
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {seriesList.map((s) => (
                <button key={s} onClick={() => setSeries(s)} style={{
                  padding: '0.4rem 1rem',
                  background: series === s ? 'var(--forest-green)' : 'white',
                  color: series === s ? 'white' : 'var(--gray-700)',
                  border: `2px solid ${series === s ? 'var(--forest-green)' : 'var(--gray-200)'}`,
                  borderRadius: '50px', fontWeight: 500, fontSize: '0.825rem', cursor: 'pointer',
                }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && <p style={{ color: 'var(--gray-500)' }}>Loading devotions…</p>}
          {error && !loading && <div className="alert alert-error">{error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center', color: 'var(--gray-500)' }}>
              <FiBookOpen size={28} style={{ color: 'var(--forest-green)', marginBottom: '0.75rem' }} />
              <p>No devotion materials have been published yet. Please check back soon.</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((d, i) => {
              const Icon = TYPE_ICON[d.type] || FiBookOpen;
              return (
                <motion.article key={d.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--gray-100)', boxShadow: 'var(--shadow-sm)' }}
                  whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
                >
                  <Link to={`/devotions/${d.id}`} style={{ display: 'block', color: 'inherit' }}>
                    <div style={{ height: '6px', background: 'var(--forest-green)' }} />
                    <div style={{ padding: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(45,106,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={16} style={{ color: 'var(--forest-green)' }} />
                        </span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--forest-green)', textTransform: 'uppercase' }}>
                          {d.series || 'Devotion'}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-900)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                        {d.title}
                      </h3>
                      {d.scriptureRef && (
                        <div style={{ color: 'var(--gold-dark)', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>{d.scriptureRef}</div>
                      )}
                      {d.description && (
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{d.description}</p>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--forest-green)', fontSize: '0.8rem', fontWeight: 600 }}>
                        Open <FiArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
