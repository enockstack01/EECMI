import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useUserAuth } from '../context/UserAuthContext';

export default function UserRegister() {
  const { register: registerUser } = useUserAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ name, email, password }) => {
    setError('');
    setLoading(true);
    try {
      await registerUser(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          style={{ width: '100%', maxWidth: '460px', padding: '0 1.5rem' }}
        >
          <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-900)' }}>Create Account</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '2rem' }}>Join the EECMI community and get involved</p>

            {error && (
              <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <FiUser size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                  <input
                    className="form-input"
                    placeholder="Your full name"
                    style={{ paddingLeft: '2.75rem' }}
                    {...register('name', { required: 'Full name is required' })}
                  />
                </div>
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <FiMail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                  <input
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    style={{ paddingLeft: '2.75rem' }}
                    {...register('email', { required: 'Email is required' })}
                  />
                </div>
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <FiLock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Minimum 6 characters"
                    style={{ paddingLeft: '2.75rem' }}
                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                  />
                </div>
                {errors.password && <p className="form-error">{errors.password.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <FiLock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Repeat your password"
                    style={{ paddingLeft: '2.75rem' }}
                    {...register('confirm', {
                      required: 'Please confirm your password',
                      validate: v => v === watch('password') || 'Passwords do not match',
                    })}
                  />
                </div>
                {errors.confirm && <p className="form-error">{errors.confirm.message}</p>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}
              >
                {loading ? 'Creating account...' : <><FiUserPlus size={16} /> Create Account</>}
              </button>
            </form>

            <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '1.5rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--forest-green)', fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
