import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const STATUS_OPTIONS = ['pending', 'prayed', 'answered'];

export default function PrayersPage() {
  const { authFetch } = useAdminAuth();
  const [rows, setRows]     = useState([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [pages, setPages]   = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page, limit: 15, ...(search && { search }), ...(status && { status }) });
    authFetch(`/api/admin/prayers?${qs}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setRows(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, status]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, newStatus) => {
    await authFetch(`/api/admin/prayers/${id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
    load();
  };

  const del = async (id) => {
    if (!window.confirm('Delete this prayer request?')) return;
    await authFetch(`/api/admin/prayers/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2 className="admin-page-title">Prayer Requests ({total})</h2>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search name or request..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No prayer requests found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Request</th><th>Visibility</th><th>Status</th><th>Date</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td>{row.isAnonymous ? <em style={{ color: '#a0aec0' }}>Anonymous</em> : row.name}</td>
                      <td>
                        <button className="btn-sm btn-sm-ghost" onClick={() => setSelected(row)}
                          style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textAlign: 'left' }}>
                          {row.request?.substring(0, 60)}{row.request?.length > 60 ? '...' : ''}
                        </button>
                      </td>
                      <td><span className={`badge badge-${row.isPublic ? 'true' : 'false'}`}>{row.isPublic ? 'Public' : 'Private'}</span></td>
                      <td>
                        <select className="admin-select" style={{ fontSize: 12, padding: '2px 6px' }}
                          value={row.status} onChange={e => updateStatus(row.id, e.target.value)}>
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>{new Date(row.createdAt).toLocaleDateString()}</td>
                      <td>
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

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>Prayer Request</h3>
            <p><strong>From:</strong> {selected.isAnonymous ? 'Anonymous' : `${selected.name} <${selected.email}>`}</p>
            <p style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{selected.request}</p>
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
