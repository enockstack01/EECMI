import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiTag, FiArrowLeft } from 'react-icons/fi';
import { newsArticles, categoryColors } from '../data/newsArticles';

export default function NewsDetail() {
  const { id } = useParams();
  const article = newsArticles.find(a => String(a.id) === id);

  if (!article) return <Navigate to="/news" replace />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '760px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <FiArrowLeft size={15} /> Back to News
            </Link>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)',
                padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}>
                <FiTag size={12} /> {article.category}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', color: 'white', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem' }}>
              {article.title}
            </h1>
            <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><FiCalendar size={14} /> {article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '5rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            <div style={{ height: '4px', width: '64px', background: categoryColors[article.category] || 'var(--forest-green)', borderRadius: '2px', marginBottom: '1.75rem' }} />
            <p style={{ color: 'var(--gray-700)', fontSize: '1.05rem', lineHeight: 1.9 }}>
              {article.excerpt}
            </p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/news" className="btn btn-outline-green" style={{ fontSize: '0.95rem' }}>
              <FiArrowLeft size={15} /> Back to all news
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
