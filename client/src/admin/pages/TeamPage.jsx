import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const EMPTY_FORM = { name: '', email: '', password: '', role: 'admin' };
const ROLES = ['super_admin', 'admin', 'editor'];

export default function AdminsPage() {
  const { authFetch, admin: currentAdmin } = useAdminAuth();
  const [rows, setRows]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const load = useCallback(() => {
    setLoading(true);
    authFetch('/api/admin/admins')
      .then(r => r.json())
      .then(d => { if (d.success) setRows(d.data); })
      .finally(() => setLoading(false));
  }, [authFetch]);

  useEffect(() => { load(); }, [load]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    const res  = await authFetch('/api/admin/admins', { method: 'POST', body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (data.success) { setModal(false); setForm(EMPTY_FORM); load(); }
    else setError(data.message || 'Failed to create admin.');
  };

  const toggle = async (id) => {
    await authFetch(`/api/admin/admins/${id}/toggle`, { method: 'PATCH' });
    load();
  };

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <h2 className="admin-page-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Admin Users</span>
        {currentAdmin?.role === 'super_admin' && (
          <button className="btn-primary" onClick={() => { setForm(EMPTY_FORM); setError(''); setModal(true); }}>+ Add Admin</button>
        )}
      </h2>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No admins found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td>{row.name} {row.id === currentAdmin?.id && <em style={{ color: '#718096', fontSize: 12 }}>(you)</em>}</td>
                      <td>{row.email}</td>
                      <td><span className="badge badge-read">{row.role?.replace('_', ' ')}</span></td>
                      <td><span className={`badge badge-${row.isActive ? 'active' : 'inactive'}`}>{row.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td style={{ whiteSpace: 'nowrap' }}>{row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : '—'}</td>
                      <td>
                        {row.id !== currentAdmin?.id && currentAdmin?.role === 'super_admin' && (
                          <button className="btn-sm btn-sm-ghost" onClick={() => toggle(row.id)}>
                            {row.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>Add Admin User</h3>
            {error && <div style={{ color: '#c53030', background: '#fee2e2', padding: '8px 12px', borderRadius: 6, marginBottom: 12, fontSize: 14 }}>{error}</div>}
            <form onSubmit={save}>
              <div className="form-group">
                <label>Full Name *</label>
                <input required value={form.name} onChange={f('name')} />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" required value={form.email} onChange={f('email')} />
              </div>
              <div className="form-group">
                <label>Password * (min 8 characters)</label>
                <input type="password" required minLength={8} value={form.password} onChange={f('password')} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={form.role} onChange={f('role')}>
                  {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Creating...' : 'Create Admin'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
