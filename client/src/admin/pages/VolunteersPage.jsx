import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const STATUS_OPTIONS = ['pending', 'active', 'inactive'];

export default function VolunteersPage() {
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
    authFetch(`/api/admin/volunteers?${qs}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setRows(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, status]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, newStatus) => {
    await authFetch(`/api/admin/volunteers/${id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
    load();
  };

  const del = async (id) => {
    if (!window.confirm('Delete this volunteer application?')) return;
    await authFetch(`/api/admin/volunteers/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h2 className="admin-page-title">Volunteers ({total})</h2>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search name, email, location..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No volunteers found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>Location</th><th>Areas</th><th>Status</th><th>Date</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td>
                        <button className="btn-sm btn-sm-ghost" onClick={() => setSelected(row)}>{row.name}</button>
                      </td>
                      <td>{row.email}</td>
                      <td>{row.location || '—'}</td>
                      <td style={{ maxWidth: 180 }}>{(row.areas || []).join(', ') || '—'}</td>
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
            <h3>{selected.name}</h3>
            <p><strong>Email:</strong> {selected.email}</p>
            {selected.phone && <p><strong>Phone:</strong> {selected.phone}</p>}
            {selected.location && <p><strong>Location:</strong> {selected.location}</p>}
            {selected.skills && <p><strong>Skills:</strong> {selected.skills}</p>}
            {selected.areas?.length > 0 && <p><strong>Interest Areas:</strong> {selected.areas.join(', ')}</p>}
            {selected.availability && <p><strong>Availability:</strong> {selected.availability}</p>}
            {selected.motivation && (
              <>
                <p><strong>Motivation:</strong></p>
                <p style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{selected.motivation}</p>
              </>
            )}
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
