import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const ROLES = ['super_admin', 'admin', 'editor', 'user'];

export default function TeamPage() {
  const { authFetch, admin: currentAdmin } = useAdminAuth();
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId]   = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    authFetch('/api/admin/team')
      .then(r => r.json())
      .then(d => { if (d.success) setRows(d.data); })
      .finally(() => setLoading(false));
  }, [authFetch]);

  useEffect(() => { load(); }, [load]);

  const changeRole = async (id, role) => {
    setBusyId(id);
    await authFetch(`/api/admin/team/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) });
    await load();
    setBusyId(null);
  };

  const toggleBan = async (id) => {
    setBusyId(id);
    await authFetch(`/api/admin/team/${id}/ban`, { method: 'PATCH' });
    await load();
    setBusyId(null);
  };

  return (
    <div>
      <h2 className="admin-page-title">Team</h2>
      <p style={{ color: '#718096', fontSize: 14, marginTop: -12, marginBottom: 20 }}>
        Anyone who signs up joins as a regular user. Promote them to admin, editor, or super admin here.
        Roles and accounts are managed through Clerk &mdash; there's no separate password to set.
      </p>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No team members found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Sign-in</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rows.map(row => {
                    const isSelf = row.id === currentAdmin?.id;
                    return (
                      <tr key={row.id}>
                        <td>{row.name} {isSelf && <em style={{ color: '#718096', fontSize: 12 }}>(you)</em>}</td>
                        <td>{row.email}</td>
                        <td>
                          <select
                            className="admin-select"
                            style={{ fontSize: 12, padding: '2px 6px' }}
                            value={row.role}
                            disabled={isSelf || busyId === row.id}
                            onChange={e => changeRole(row.id, e.target.value)}
                          >
                            {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                          </select>
                        </td>
                        <td><span className={`badge badge-${row.banned ? 'inactive' : 'active'}`}>{row.banned ? 'Banned' : 'Active'}</span></td>
                        <td style={{ whiteSpace: 'nowrap' }}>{row.lastSignInAt ? new Date(row.lastSignInAt).toLocaleDateString() : '—'}</td>
                        <td>
                          {!isSelf && (
                            <button className="btn-sm btn-sm-ghost" disabled={busyId === row.id} onClick={() => toggleBan(row.id)}>
                              {row.banned ? 'Unban' : 'Ban'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}
