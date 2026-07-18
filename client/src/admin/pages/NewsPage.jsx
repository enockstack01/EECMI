import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const EMPTY_FORM = { title: '', category: '', excerpt: '', content: '', author: '', status: 'draft', featured: false, imageUrl: '', readTime: '' };
const CATEGORIES = ['Community', 'Youth', 'Outreach', 'Discipleship', 'Partnership', 'Events', 'Other'];
const STATUS_OPTIONS = ['draft', 'published', 'archived'];

export default function NewsPage() {
  const { authFetch } = useAdminAuth();
  const [rows, setRows]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);
  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null); // null | 'create' | row (edit)
  const [form, setForm]       = useState(EMPTY_FORM);
  const [saving, setSaving]   = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page, limit: 15, ...(search && { search }), ...(status && { status }) });
    authFetch(`/api/admin/news?${qs}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setRows(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, status]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setModal('create'); };
  const openEdit   = (row) => { setForm({ ...EMPTY_FORM, ...row }); setModal(row); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = modal && modal !== 'create';
    const url    = isEdit ? `/api/admin/news/${modal.id}` : '/api/admin/news';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await authFetch(url, { method, body: JSON.stringify(form) });
    const data = await res.json();
    setSaving(false);
    if (data.success) { setModal(null); load(); }
    else alert(data.message || 'Save failed.');
  };

  const del = async (id) => {
    if (!window.confirm('Delete this news post?')) return;
    await authFetch(`/api/admin/news/${id}`, { method: 'DELETE' });
    load();
  };

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  return (
    <div>
      <h2 className="admin-page-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>News Posts ({total})</span>
        <button className="btn-primary" onClick={openCreate}>+ New Post</button>
      </h2>

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search title, category, author..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No news posts found.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Featured</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td style={{ maxWidth: 240 }}>{row.title}</td>
                      <td>{row.category || '—'}</td>
                      <td>{row.author || '—'}</td>
                      <td><span className={`badge badge-${row.status}`}>{row.status}</span></td>
                      <td><span className={`badge badge-${row.featured}`}>{row.featured ? 'Yes' : 'No'}</span></td>
                      <td style={{ whiteSpace: 'nowrap' }}>{new Date(row.createdAt).toLocaleDateString()}</td>
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
            <h3>{modal === 'create' ? 'New Post' : 'Edit Post'}</h3>
            <form onSubmit={save}>
              <div className="form-group">
                <label>Title *</label>
                <input required value={form.title} onChange={f('title')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={f('category')}>
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input value={form.author} onChange={f('author')} placeholder="Author name" />
                </div>
              </div>
              <div className="form-group">
                <label>Excerpt</label>
                <textarea rows={2} value={form.excerpt} onChange={f('excerpt')} />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea rows={6} value={form.content} onChange={f('content')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={f('status')}>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Read Time (e.g. 5 min)</label>
                  <input value={form.readTime} onChange={f('readTime')} placeholder="5 min" />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input value={form.imageUrl} onChange={f('imageUrl')} placeholder="https://..." />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={f('featured')} />
                <label htmlFor="featured" style={{ margin: 0 }}>Featured post</label>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModal(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
