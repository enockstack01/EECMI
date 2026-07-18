import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const STATUSES = ['pending', 'active', 'inactive'];

export default function PartnersPage() {
  const { authFetch } = useAdminAuth();
  const [data, setData]     = useState([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [pages, setPages]   = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 20 });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    authFetch(`/api/admin/partners?${params}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setData(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    await authFetch(`/api/admin/partners/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    load();
    if (selected?.id === id) setSelected(p => ({ ...p, status }));
  };

  const deletePartner = async (id) => {
    if (!window.confirm('Delete this partnership request?')) return;
    await authFetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
    load();
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div>
      <h2 className="admin-page-title">Partnership Requests</h2>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search name, email, organization..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="admin-count">{total} total</span>
      </div>

      {loading ? <div className="admin-loading">Loading...</div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Organization</th>
                <th>Type</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={7} className="admin-empty">No partnership requests yet.</td></tr>
              ) : data.map(p => (
                <tr key={p.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td>{p.organization || '—'}</td>
                  <td>{p.partnerType}</td>
                  <td>{p.email}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <select
                      className={`badge badge-${p.status}`}
                      value={p.status}
                      onChange={e => updateStatus(p.id, e.target.value)}
                      style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <button className="btn-danger-sm" onClick={() => deletePartner(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="admin-pagination">
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      )}

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Partnership Request — {selected.name}</h3>
              <button onClick={() => setSelected(null)} className="admin-modal-close">✕</button>
            </div>
            <div className="admin-modal-body">
              <table className="admin-detail-table">
                <tbody>
                  <tr><th>Name</th><td>{selected.name}</td></tr>
                  <tr><th>Email</th><td>{selected.email}</td></tr>
                  <tr><th>Organization</th><td>{selected.organization || '—'}</td></tr>
                  <tr><th>Partner Type</th><td>{selected.partnerType}</td></tr>
                  <tr><th>Partnership Areas</th><td>{(selected.partnershipAreas || []).join(', ') || '—'}</td></tr>
                  <tr><th>Status</th><td><span className={`badge badge-${selected.status}`}>{selected.status}</span></td></tr>
                  <tr><th>Submitted</th><td>{new Date(selected.createdAt).toLocaleString()}</td></tr>
                </tbody>
              </table>
              {selected.message && (
                <div style={{ marginTop: 16 }}>
                  <strong>Message / Partnership Vision:</strong>
                  <p style={{ marginTop: 8, whiteSpace: 'pre-wrap', color: '#555', lineHeight: 1.7 }}>{selected.message}</p>
                </div>
              )}
              <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {STATUSES.map(s => (
                  <button key={s} className={`badge badge-${s}`} style={{ border: 'none', cursor: 'pointer', padding: '6px 14px' }}
                    onClick={() => updateStatus(selected.id, s)}>
                    Mark {s}
                  </button>
                ))}
                <button className="btn-danger-sm" onClick={() => deletePartner(selected.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
