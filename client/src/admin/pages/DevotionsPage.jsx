import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const EMPTY_FORM = {
  title: '', series: 'Daily Devotion', scriptureRef: '', description: '', body: '',
  type: 'text', externalUrl: '', coverImageUrl: '', author: 'EECMI Team', status: 'draft',
};
const TYPES = ['text', 'pdf', 'document', 'image', 'audio', 'video', 'link'];
const STATUS_OPTIONS = ['draft', 'published'];
const ACCEPT_FOR_TYPE = {
  pdf: '.pdf,application/pdf',
  document: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt',
  image: 'image/*',
  audio: 'audio/*',
  video: 'video/*',
  link: '*',
};
const UPLOAD_LABEL = { document: 'document', image: 'image' };
const UPLOAD_HINT = {
  document: 'PDF, Word, PowerPoint, Excel or text file.',
  image: 'JPEG, PNG or WEBP image.',
};

export default function DevotionsPage() {
  const { authFetch, authUpload } = useAdminAuth();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadsOn, setUploadsOn] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const qs = new URLSearchParams({ page, limit: 15, ...(search && { search }), ...(status && { status }) });
    authFetch(`/api/admin/devotions?${qs}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) { setRows(d.data); setTotal(d.total); setPages(d.pages); } })
      .finally(() => setLoading(false));
  }, [authFetch, page, search, status]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    authFetch('/api/admin/devotions/upload-status')
      .then((r) => r.json())
      .then((d) => setUploadsOn(d?.data?.fileUploads !== false))
      .catch(() => {});
  }, [authFetch]);

  const openCreate = () => { setForm(EMPTY_FORM); setFile(null); setModal('create'); };
  const openEdit = (row) => { setForm({ ...EMPTY_FORM, ...row }); setFile(null); setModal(row); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const isEdit = modal && modal !== 'create';
    const url = isEdit ? `/api/admin/devotions/${modal.id}` : '/api/admin/devotions';
    const method = isEdit ? 'PUT' : 'POST';

    let res;
    if (file) {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
      fd.append('file', file);
      res = await authUpload(url, fd, method);
    } else {
      res = await authFetch(url, { method, body: JSON.stringify(form) });
    }
    const data = await res.json();
    setSaving(false);
    if (data.success) { setModal(null); load(); }
    else alert(data.message || 'Save failed.');
  };

  const del = async (id) => {
    if (!window.confirm('Delete this devotion?')) return;
    await authFetch(`/api/admin/devotions/${id}`, { method: 'DELETE' });
    load();
  };

  const togglePublish = async (row) => {
    await authFetch(`/api/admin/devotions/${row.id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: row.status === 'published' ? 'draft' : 'published' }),
    });
    load();
  };

  const f = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div>
      <h2 className="admin-page-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Devotion Materials ({total})</span>
        <button className="btn-primary" onClick={openCreate}>+ New Devotion</button>
      </h2>

      {!uploadsOn && (
        <div className="alert alert-error" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
          File uploads are off (CLOUDINARY_URL not set on the server). You can still publish text devotions or paste an external file link.
        </div>
      )}

      <div className="admin-toolbar">
        <input className="admin-search" placeholder="Search title, series, author…" value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        <select className="admin-select" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading">Loading...</div> : rows.length === 0
          ? <div className="admin-empty">No devotions yet.</div>
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Title</th><th>Series</th><th>Type</th><th>Status</th><th>Views</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td style={{ maxWidth: 240 }}>{row.title}</td>
                      <td>{row.series || '—'}</td>
                      <td>{row.type}</td>
                      <td><span className={`badge badge-${row.status}`}>{row.status}</span></td>
                      <td>{row.views || 0}</td>
                      <td className="admin-actions-cell">
                        <button className="btn-sm btn-sm-ghost" onClick={() => togglePublish(row)}>
                          {row.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button className="btn-sm btn-sm-ghost" onClick={() => openEdit(row)}>Edit</button>
                        <button className="btn-sm btn-sm-danger" onClick={() => del(row.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        <div className="admin-pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page} of {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>

      {modal !== null && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal === 'create' ? 'New Devotion' : 'Edit Devotion'}</h3>
            <form onSubmit={save}>
              <div className="form-group">
                <label>Title *</label>
                <input required value={form.title} onChange={f('title')} />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Series</label>
                  <input value={form.series} onChange={f('series')} placeholder="e.g. Daily Bread" />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select value={form.type} onChange={f('type')}>
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Scripture reference</label>
                <input value={form.scriptureRef} onChange={f('scriptureRef')} placeholder="e.g. Psalm 23:1" />
              </div>
              <div className="form-group">
                <label>Short description</label>
                <textarea rows={2} value={form.description} onChange={f('description')} />
              </div>
              <div className="form-group">
                <label>Devotion text (for reading devotions)</label>
                <textarea rows={5} value={form.body} onChange={f('body')} placeholder="Leave blank for file / link devotions." />
              </div>
              {form.type !== 'text' && (
                <>
                  <div className="form-group">
                    <label>Upload {UPLOAD_LABEL[form.type] || 'file'} {uploadsOn ? '' : '(disabled)'}</label>
                    <input type="file" disabled={!uploadsOn} accept={ACCEPT_FOR_TYPE[form.type] || '*'}
                      onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    {UPLOAD_HINT[form.type] && (
                      <small style={{ color: 'var(--gray-500)' }}>{UPLOAD_HINT[form.type]}</small>
                    )}
                    {modal !== 'create' && modal.fileUrl && !file && (
                      <small style={{ color: 'var(--gray-500)' }}>Current: <a href={modal.fileUrl} target="_blank" rel="noreferrer">file</a> — choose a new one to replace.</small>
                    )}
                  </div>
                  <div className="form-group">
                    <label>…or external URL</label>
                    <input value={form.externalUrl} onChange={f('externalUrl')} placeholder="https://…" />
                  </div>
                </>
              )}
              <div className="form-group">
                <label>Cover image URL (optional)</label>
                <input value={form.coverImageUrl} onChange={f('coverImageUrl')} placeholder="https://…" />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Author</label>
                  <input value={form.author} onChange={f('author')} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={f('status')}>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
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
