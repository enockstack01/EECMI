import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const EMPTY_FORM = { title: '', type: '', description: '', fileUrl: '', externalUrl: '', status: 'draft', year: new Date().getFullYear().toString() };
const RESOURCE_TYPES = ['PDF', 'Video', 'Audio', 'Article', 'Book', 'Curriculum', 'Report', 'Other'];
const STATUS_OPTIONS = ['draft', 'published'];

export default function ResourcesPage() {
  const { authFetch } = useAdminAuth();
  const [rows, setRows]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [saving, setSaving]   = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page, limit: 15, ...(search && { search }), ...(status && { status }) });
    authFetch(`/api/admin/resources?${qs}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setRows(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, status]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setModal('create'); };
  const openEdit   = (row) => { setForm({ ...EMPTY_FORM, ...row, year: row.year?.toString() || '' }); setModal(row); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = modal && modal !== 'create';
    const url    = isEdit ? `/api/admin/resources/${modal.id}` : '/api/admin/resources';
    const method = isEdit ? 'PUT' : 'POST';
    const res  = await authFetch(url, { method, body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (data.success) { setModal(null); load(); }
    else alert(data.message || 'Save failed.');
  };

  const del = async (id) => {
    if (!window.confirm('Delete this resource?')) return;
    await authFetch(`/api/admin/resources/${id}`, { method: 'DELETE' });
    load();
  };

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <h2 className="admin-page-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Resources ({total})</span>
        <button className="btn-primary" onClick={openCreate}>+ New Resource</button>
      </h2>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search title, type, description..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No resources found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Type</th><th>Year</th><th>Status</th><th>Downloads</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td style={{ maxWidth: 260 }}>{row.title}</td>
                      <td>{row.type || '—'}</td>
                      <td>{row.year || '—'}</td>
                      <td><span className={`badge badge-${row.status}`}>{row.status}</span></td>
                      <td>{row.downloads || 0}</td>
                      <td style={{ display: 'flex', gap: 6 }}>
                        <button className="btn-sm btn-sm-ghost" onClick={() => openEdit(row)}>Edit</button>
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

      {modal !== null && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>{modal === 'create' ? 'New Resource' : 'Edit Resource'}</h3>
            <form onSubmit={save}>
              <div className="form-group">
                <label>Title *</label>
                <input required value={form.title} onChange={f('title')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={f('type')}>
                    <option value="">Select...</option>
                    {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input value={form.year} onChange={f('year')} placeholder="2024" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={3} value={form.description} onChange={f('description')} />
              </div>
              <div className="form-group">
                <label>File URL</label>
                <input value={form.fileUrl} onChange={f('fileUrl')} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>External URL</label>
                <input value={form.externalUrl} onChange={f('externalUrl')} placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={f('status')}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
