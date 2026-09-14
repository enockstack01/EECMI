import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { FiArrowLeft, FiBookmark, FiDownload, FiExternalLink } from 'react-icons/fi';
import { useApi } from '../hooks/useApi';

export default function DevotionDetail() {
  const { id } = useParams();
  const { isSignedIn } = useAuth();
  const api = useApi();
  const [devotion, setDevotion] = useState(undefined); // undefined = loading, null = not found
  const [saved, setSaved] = useState(false);
  const [savingBookmark, setSavingBookmark] = useState(false);

  useEffect(() => {
    axios.get(`/api/devotions/${id}`)
      .then((res) => setDevotion(res.data?.data || null))
      .catch(() => setDevotion(null));
  }, [id]);

  useEffect(() => {
    if (!isSignedIn || !devotion) return;
    api.get('/api/me/devotions')
      .then((d) => setSaved((d.data || []).some((x) => x.id === devotion.id)))
      .catch(() => {});
  }, [isSignedIn, devotion, api]);

  const toggleSave = useCallback(async () => {
    if (!devotion) return;
    setSavingBookmark(true);
    try {
      const res = saved
        ? await api.del(`/api/me/devotions/${devotion.id}/save`)
        : await api.post(`/api/me/devotions/${devotion.id}/save`);
      setSaved(res.data?.saved ?? !saved);
    } catch { /* ignore */ } finally {
      setSavingBookmark(false);
    }
  }, [api, devotion, saved]);

  if (devotion === null) return <Navigate to="/devotions" replace />;
  if (devotion === undefined) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>Loading…</div>;
  }

  const fileUrl = devotion.fileUrl || devotion.externalUrl;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section style={{ background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)', padding: '10rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '760px' }}>
          <Link to="/devotions" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            <FiArrowLeft size={15} /> Back to Devotions
          </Link>
          <div style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            {devotion.series || 'Devotion'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', color: 'white', fontWeight: 700, lineHeight: 1.25, marginBottom: '0.75rem' }}>
            {devotion.title}
          </h1>
          {devotion.scriptureRef && (
            <div style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold-light)', fontStyle: 'italic', fontSize: '0.95rem' }}>{devotion.scriptureRef}</div>
          )}
        </div>
      </section>

      <section style={{ padding: '3.5rem 0 7rem', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
            {devotion.coverImageUrl && (
              <img src={devotion.coverImageUrl} alt="" style={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 14, marginBottom: '1.75rem', display: 'block' }} />
            )}

            {isSignedIn && (
              <button onClick={toggleSave} disabled={savingBookmark} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem',
                background: saved ? 'var(--forest-green)' : 'transparent', color: saved ? 'white' : 'var(--forest-green)',
                border: '1px solid var(--forest-green)', borderRadius: '50px', padding: '0.4rem 1rem',
                fontSize: '0.825rem', fontWeight: 600, cursor: 'pointer',
              }}>
                <FiBookmark size={14} /> {saved ? 'Saved' : 'Save'}
              </button>
            )}

            {devotion.body
              ? devotion.body.split(/\n{2,}/).map((para, i) => (
                  <p key={i} style={{ color: 'var(--gray-700)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1rem' }}>{para}</p>
                ))
              : devotion.description && (
                  <p style={{ color: 'var(--gray-700)', fontSize: '1.05rem', lineHeight: 1.9 }}>{devotion.description}</p>
                )}

            {devotion.type === 'audio' && fileUrl && (
              <audio controls src={fileUrl} style={{ width: '100%', marginTop: '1.5rem' }} />
            )}

            {devotion.type === 'image' && fileUrl && (
              <img src={fileUrl} alt={devotion.title} style={{ width: '100%', borderRadius: 12, marginTop: '1.5rem', display: 'block' }} />
            )}

            {devotion.type === 'video' && fileUrl && (
              <video controls src={fileUrl} style={{ width: '100%', marginTop: '1.5rem', borderRadius: '12px' }} />
            )}

            {devotion.type === 'pdf' && fileUrl && (
              <div style={{ marginTop: '1.5rem' }}>
                <iframe title={devotion.title} src={fileUrl} style={{ width: '100%', height: '70vh', border: '1px solid var(--gray-200)', borderRadius: '12px' }} />
              </div>
            )}

            {fileUrl && (
              <a href={fileUrl} target="_blank" rel="noreferrer"
                onClick={() => axios.post(`/api/devotions/${devotion.id}/download`).catch(() => {})}
                className="btn btn-primary" style={{ marginTop: '1.75rem', fontSize: '0.9rem' }}>
                {devotion.type === 'link' ? <><FiExternalLink size={15} /> Open</> : <><FiDownload size={15} /> Download</>}
              </a>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/devotions" className="btn btn-outline-green" style={{ fontSize: '0.95rem' }}>
              <FiArrowLeft size={15} /> All devotions
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
