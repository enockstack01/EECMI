import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiTag, FiArrowLeft } from 'react-icons/fi';
import { newsArticles, categoryColors } from '../data/newsArticles';

const fmtDate = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? d : dt.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(undefined); // undefined = loading

  useEffect(() => {
    const staticMatch = newsArticles.find((a) => String(a.id) === id);
    axios.get(`/api/news/${id}`)
      .then((res) => setArticle(res.data?.data ? { ...res.data.data, date: fmtDate(res.data.data.publishedAt || res.data.data.createdAt) } : (staticMatch || null)))
      .catch(() => setArticle(staticMatch || null));
  }, [id]);

  if (article === undefined) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>Loading…</div>;
  }
  if (!article) return <Navigate to="/news" replace />;

  const accent = categoryColors[article.category] || 'var(--forest-green)';
  const paragraphs = (article.content || article.excerpt || '').split(/\n{2,}/).filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '760px' }}>
          <Link to="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            <FiArrowLeft size={15} /> Back to News
          </Link>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FiTag size={12} /> {article.category}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', color: 'white', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem' }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
            {article.date && <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><FiCalendar size={14} /> {article.date}</span>}
            {article.readTime && <span>{article.readTime}</span>}
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            <div style={{ height: '4px', width: '64px', background: accent, borderRadius: '2px', marginBottom: '1.75rem' }} />
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '1.75rem' }} />
            )}
            {paragraphs.map((p, i) => (
              <p key={i} style={{ color: 'var(--gray-700)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1rem' }}>{p}</p>
            ))}
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
