import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignUp } from '@clerk/clerk-react';
import { clerkAppearance } from '../utils/clerkAppearance';

export default function UserRegister() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--dark-green) 0%, var(--navy-dark) 100%)',
        padding: '10rem 0 5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Join EECMI</div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', fontWeight: 700, lineHeight: 1.2 }}>
              Create Your Account
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginTop: '0.75rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Sign in</Link>
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '5rem 0 7rem', background: 'var(--cream)', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ width: '100%', maxWidth: '460px', padding: '0 1.5rem', display: 'flex', justifyContent: 'center' }}
        >
          <SignUp
            routing="path"
            path="/register"
            signInUrl="/login"
            fallbackRedirectUrl="/post-auth"
            appearance={clerkAppearance}
          />
        </motion.div>
      </section>
    </motion.div>
  );
}
