import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight, FiTag } from 'react-icons/fi';

const newsArticles = [
  {
    id: 1,
    category: 'Prison Ministry',
    title: 'EECMI Reaches New Prison Facility in Northern Uganda',
    excerpt: 'Our prison outreach team conducted a powerful evangelism crusade reaching over 200 inmates in a newly opened facility. Lives were transformed, and 45 men committed their lives to Christ.',
    date: 'June 2024',
    readTime: '3 min read',
    featured: true,
  },
  {
    id: 2,
    category: 'Women Empowerment',
    title: '30 Women Graduate from Vocational Skills Training Program',
    excerpt: 'A graduation ceremony marked the completion of a 3 month intensive vocational training program. Graduates received certificates in tailoring, baking, and soap making.',
    date: 'May 2024',
    readTime: '2 min read',
    featured: false,
  },
  {
    id: 3,
    category: 'Youth',
    title: 'Youth Innovation Camp Empowers 50 Young Entrepreneurs',
    excerpt: 'EECMI hosted a week long innovation camp for unemployed youth. Participants received training in entrepreneurship, business planning, and leadership skills.',
    date: 'April 2024',
    readTime: '3 min read',
    featured: false,
  },
  {
    id: 4,
    category: 'Partnership',
    title: 'New Partnership with 15 Churches Across Kampala Diocese',
    excerpt: 'EECMI signs memoranda of understanding with 15 churches to collaborate on community outreach, prison ministry, and youth empowerment programs.',
    date: 'March 2024',
    readTime: '2 min read',
    featured: false,
  },
  {
    id: 5,
    category: 'Children',
    title: 'Back to School Drive: 150 Children Receive School Supplies',
    excerpt: 'Thanks to generous donors, EECMI distributed school bags, books, and stationery to 150 vulnerable children before the start of the new school term.',
    date: 'February 2024',
    readTime: '2 min read',
    featured: false,
  },
  {
    id: 6,
    category: 'Community Outreach',
    title: 'Community Health Fair Serves 500 Families in Kawempe',
    excerpt: 'A joint outreach with local health workers brought free medical screening, nutrition education, and spiritual care to 500 families in the Kawempe community.',
    date: 'January 2024',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 7,
    category: 'Family',
    title: 'Annual Marriage Retreat Restores 20 Couples',
    excerpt: 'The 2023 family restoration retreat witnessed powerful breakthroughs as 20 couples experienced healing, reconciliation, and renewed commitment to their marriages.',
    date: 'December 2023',
    readTime: '3 min read',
    featured: false,
  },
  {
    id: 8,
    category: 'Fundraising',
    title: 'Annual Gala Raises Funds for Prison Ministry Expansion',
    excerpt: 'EECMI\'s annual fundraising gala raised significant resources to expand prison ministry to three additional facilities in 2024.',
    date: 'November 2023',
    readTime: '2 min read',
    featured: false,
  },
];

const categories = ['All', 'Prison Ministry', 'Women Empowerment', 'Youth', 'Children', 'Family', 'Community Outreach', 'Partnership'];

const categoryColors = {
  'Prison Ministry': 'var(--forest-green)',
  'Women Empowerment': 'var(--earth)',
  'Youth': '#7C3AED',
  'Children': 'var(--navy)',
  'Family': '#0891B2',
  'Community Outreach': '#B45309',
  'Partnership': 'var(--gold)',
  'Fundraising': '#DC2626',
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? newsArticles : newsArticles.filter(a => a.category === activeCategory);
  const featured = newsArticles.find(a => a.featured);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>News & Updates</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', fontWeight: 700, marginBottom: '1.25rem', lineHeight: 1.2 }}>
              Ministry News &<br />Kingdom Updates
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
              Stay informed about God's work through EECMI. Stories, updates, and testimonies from the frontlines.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container">

          {/* Featured Article */}
          {featured && activeCategory === 'All' && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--dark-green), var(--navy-dark))', borderRadius: '20px', padding: '3rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: 'var(--gold)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700 }}>FEATURED</span>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FiTag size={12} /> {featured.category}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, marginBottom: '1rem', maxWidth: '600px', lineHeight: 1.3 }}>
                    {featured.title}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FiCalendar size={13} /> {featured.date}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{featured.readTime}</span>
                  </div>
                  <button style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--gold)', color: 'white', padding: '0.75rem 1.75rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Read Full Story <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '0.4rem 1rem',
                background: activeCategory === cat ? 'var(--forest-green)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--gray-700)',
                border: activeCategory === cat ? '2px solid var(--forest-green)' : '2px solid var(--gray-200)',
                borderRadius: '50px', fontWeight: 500, fontSize: '0.825rem',
                cursor: 'pointer', transition: 'var(--transition)',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {(activeCategory === 'All' ? newsArticles.filter(a => !a.featured) : filtered).map((article, i) => (
              <motion.article key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{
                  background: 'white', borderRadius: '16px', overflow: 'hidden',
                  border: '1px solid var(--gray-100)', boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)', cursor: 'pointer',
                }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
              >
                <div style={{ height: '6px', background: categoryColors[article.category] || 'var(--forest-green)' }} />
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em',
                      color: categoryColors[article.category] || 'var(--forest-green)',
                      background: `${categoryColors[article.category] || 'var(--forest-green)'}15`,
                      padding: '0.2rem 0.6rem', borderRadius: '4px',
                    }}>
                      {article.category}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--gray-900)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FiCalendar size={12} /> {article.date} · {article.readTime}
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--forest-green)', fontSize: '0.8rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                      Read <FiArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load more */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn btn-outline-green" style={{ fontSize: '0.95rem' }}>Load More Articles</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
