import { useEffect, useMemo, useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

// A light schema per content section. `kind`:
//  - 'object'      : a record of `fields`
//  - 'list'        : an array of records, each with `fields`
//  - 'founder'     : object with a nested responsibilities string-list
const SECTIONS = {
  org: {
    label: 'Organization',
    kind: 'object',
    fields: ['name', 'shortName', 'tagline', 'location', 'email', 'phone', 'phoneDial', 'whatsapp', 'website', 'intro'],
    long: ['intro', 'tagline'],
  },
  vision: {
    label: 'Vision & Mission',
    kind: 'object',
    fields: ['vision', 'mission', 'tagline'],
    long: ['vision', 'mission', 'tagline'],
  },
  values: {
    label: 'Core Values',
    kind: 'list',
    fields: ['name', 'desc', 'color'],
    long: ['desc'],
  },
  programs: {
    label: 'Programs',
    kind: 'list',
    fields: ['id', 'icon', 'title', 'tagline', 'color', 'bg', 'description', 'impact', 'activities'],
    long: ['description', 'impact'],
    listFields: ['activities'],
  },
  aboutFacts: {
    label: 'About — Fast Facts',
    kind: 'list',
    fields: ['label', 'value'],
  },
  impactStats: {
    label: 'Impact Stats',
    kind: 'list',
    fields: ['value', 'suffix', 'label', 'desc'],
    long: ['desc'],
  },
  stories: {
    label: 'Testimonies',
    kind: 'list',
    fields: ['name', 'role', 'program', 'story'],
    long: ['story'],
  },
  leadership: {
    label: 'Leadership',
    kind: 'leadership',
  },
};

function TextInput({ label, value, onChange, long }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      {long
        ? <textarea rows={3} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        : <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} />}
    </div>
  );
}

function StringList({ label, items, onChange }) {
  const arr = Array.isArray(items) ? items : [];
  return (
    <div className="form-group">
      <label>{label}</label>
      {arr.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <input value={it} onChange={(e) => onChange(arr.map((x, j) => (j === i ? e.target.value : x)))} />
          <button type="button" className="btn-sm btn-sm-danger" onClick={() => onChange(arr.filter((_, j) => j !== i))}>×</button>
        </div>
      ))}
      <button type="button" className="btn-sm btn-sm-ghost" onClick={() => onChange([...arr, ''])}>+ Add</button>
    </div>
  );
}

export default function SiteContentPage() {
  const { authFetch } = useAdminAuth();
  const [key, setKey] = useState('org');
  const [content, setContent] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const schema = SECTIONS[key];

  useEffect(() => {
    setLoading(true);
    authFetch('/api/admin/content')
      .then((r) => r.json())
      .then((d) => { if (d.success) setContent(d.data); })
      .finally(() => setLoading(false));
  }, [authFetch]);

  useEffect(() => {
    if (content) setDraft(JSON.parse(JSON.stringify(content[key])));
    setMsg('');
  }, [content, key]);

  const save = async () => {
    setSaving(true);
    setMsg('');
    const res = await authFetch(`/api/admin/content/${key}`, { method: 'PUT', body: JSON.stringify({ data: draft }) });
    const d = await res.json();
    setSaving(false);
    if (d.success) { setContent((c) => ({ ...c, [key]: d.data })); setMsg('Saved. Changes are live on the website and app.'); }
    else setMsg(d.message || 'Save failed.');
  };

  const reset = async () => {
    if (!window.confirm('Reset this section to the built-in default?')) return;
    const res = await authFetch(`/api/admin/content/${key}/reset`, { method: 'POST' });
    const d = await res.json();
    if (d.success) { setContent((c) => ({ ...c, [key]: d.data })); setMsg('Reset to default.'); }
  };

  const dirty = useMemo(
    () => content && JSON.stringify(draft) !== JSON.stringify(content[key]),
    [draft, content, key],
  );

  return (
    <div>
      <h2 className="admin-page-title">Platform Content</h2>
      <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: -8, marginBottom: '1.25rem' }}>
        Everything shown on the public website and the mobile app. Edits go live immediately.
      </p>

      <div className="admin-toolbar">
        <select className="admin-select" value={key} onChange={(e) => setKey(e.target.value)}>
          {Object.entries(SECTIONS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
        </select>
      </div>

      <div className="admin-card" style={{ padding: '1.5rem' }}>
        {loading || !draft ? <div className="admin-loading">Loading…</div> : (
          <>
            {schema.kind === 'object' && (
              <div style={{ display: 'grid', gap: 4 }}>
                {schema.fields.map((fld) => (
                  <TextInput key={fld} label={fld} long={schema.long?.includes(fld)}
                    value={draft[fld]} onChange={(v) => setDraft({ ...draft, [fld]: v })} />
                ))}
              </div>
            )}

            {schema.kind === 'list' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(draft || []).map((row, i) => (
                  <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 10, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <strong style={{ fontSize: '0.85rem' }}>#{i + 1}</strong>
                      <button type="button" className="btn-sm btn-sm-danger"
                        onClick={() => setDraft(draft.filter((_, j) => j !== i))}>Remove</button>
                    </div>
                    {schema.fields.map((fld) => (
                      schema.listFields?.includes(fld)
                        ? <StringList key={fld} label={fld} items={row[fld]}
                            onChange={(v) => setDraft(draft.map((r, j) => (j === i ? { ...r, [fld]: v } : r)))} />
                        : <TextInput key={fld} label={fld} long={schema.long?.includes(fld)}
                            value={row[fld]} onChange={(v) => setDraft(draft.map((r, j) => (j === i ? { ...r, [fld]: v } : r)))} />
                    ))}
                  </div>
                ))}
                <button type="button" className="btn-sm btn-sm-ghost"
                  onClick={() => setDraft([...(draft || []), Object.fromEntries(schema.fields.map((fld) => [fld, schema.listFields?.includes(fld) ? [] : '']))])}>
                  + Add item
                </button>
              </div>
            )}

            {schema.kind === 'leadership' && (
              <div style={{ display: 'grid', gap: 4 }}>
                <h4>Founder</h4>
                {['name', 'title', 'role', 'initials', 'bio'].map((fld) => (
                  <TextInput key={fld} label={fld} long={fld === 'bio'}
                    value={draft.founder?.[fld]}
                    onChange={(v) => setDraft({ ...draft, founder: { ...draft.founder, [fld]: v } })} />
                ))}
                <StringList label="responsibilities" items={draft.founder?.responsibilities}
                  onChange={(v) => setDraft({ ...draft, founder: { ...draft.founder, responsibilities: v } })} />
                <h4 style={{ marginTop: 16 }}>Advisory board</h4>
                {(draft.advisory || []).map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <input placeholder="name" value={row.name || ''} onChange={(e) => setDraft({ ...draft, advisory: draft.advisory.map((r, j) => (j === i ? { ...r, name: e.target.value } : r)) })} />
                    <input placeholder="role" value={row.role || ''} onChange={(e) => setDraft({ ...draft, advisory: draft.advisory.map((r, j) => (j === i ? { ...r, role: e.target.value } : r)) })} />
                    <input placeholder="initials" style={{ width: 70 }} value={row.initials || ''} onChange={(e) => setDraft({ ...draft, advisory: draft.advisory.map((r, j) => (j === i ? { ...r, initials: e.target.value } : r)) })} />
                    <button type="button" className="btn-sm btn-sm-danger" onClick={() => setDraft({ ...draft, advisory: draft.advisory.filter((_, j) => j !== i) })}>×</button>
                  </div>
                ))}
                <button type="button" className="btn-sm btn-sm-ghost" onClick={() => setDraft({ ...draft, advisory: [...(draft.advisory || []), { name: 'Advisory Board Member', role: '', initials: 'AB' }] })}>+ Add member</button>
              </div>
            )}

            <div className="form-actions" style={{ marginTop: 20, alignItems: 'center' }}>
              <button type="button" className="btn-cancel" onClick={reset}>Reset to default</button>
              <button type="button" className="btn-primary" disabled={saving || !dirty} onClick={save}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              {msg && <span style={{ fontSize: '0.85rem', color: msg.startsWith('Saved') || msg.startsWith('Reset') ? 'var(--forest-green)' : '#B4413C' }}>{msg}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
