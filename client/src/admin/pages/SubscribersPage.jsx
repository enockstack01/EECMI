import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function SubscribersPage() {
  const { authFetch } = useAdminAuth();
  const [rows, setRows]     = useState([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [pages, setPages]   = useState(1);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page, limit: 20, ...(search && { search }), ...(active !== '' && { active }) });
    authFetch(`/api/admin/subscribers?${qs}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setRows(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, active]);

  useEffect(() => { load(); }, [load]);

  const toggle = async (id) => {
    await authFetch(`/api/admin/subscribers/${id}/toggle`, { method: 'PATCH' });
    load();
  };

  const del = async (id) => {
    if (!window.confirm('Unsubscribe and delete this subscriber?')) return;
    await authFetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2 className="admin-page-title">Newsletter Subscribers ({total})</h2>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search email or name..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={active} onChange={e => { setActive(e.target.value); setPage(1); }}>
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No subscribers found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Email</th><th>Name</th><th>Status</th><th>Subscribed</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td>{row.email}</td>
                      <td>{row.name || '—'}</td>
                      <td><span className={`badge badge-${row.isActive ? 'active' : 'inactive'}`}>{row.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td style={{ whiteSpace: 'nowrap' }}>{new Date(row.createdAt).toLocaleDateString()}</td>
                      <td style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-sm btn-sm-ghost" onClick={() => toggle(row.id)}>
                          {row.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="btn-sm btn-sm-danger" onClick={() => del(row.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        <div className="admin-pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
