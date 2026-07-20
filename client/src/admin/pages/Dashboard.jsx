import { useEffect, useState } from 'react';
import {
  FiMail, FiHeart, FiUsers, FiLink, FiSend, FiFileText, FiBookOpen, FiShield,
} from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function Dashboard() {
  const { authFetch, isSuperAdmin } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => { if (d.success) setData(d); })
      .finally(() => setLoading(false));
  }, [authFetch]);

  if (loading) {
    return (
      <div>
        <h2 className="admin-page-title">Dashboard</h2>
        <div className="stats-grid">
          {Array.from({ length: 7 }).map((_, i) => <div key={i} className="stat-card-skeleton" />)}
        </div>
      </div>
    );
  }
  if (!data) return <div className="admin-empty">Failed to load dashboard.</div>;

  const { stats, recent, team } = data;

  const STATS = [
    { label: 'Total Contacts',    value: stats.contacts,    icon: FiMail,     color: '#2d6a4f' },
    { label: 'Prayer Requests',   value: stats.prayers,     icon: FiHeart,    color: '#c05621' },
    { label: 'Volunteers',        value: stats.volunteers,  icon: FiUsers,    color: '#6b46c1' },
    { label: 'Partners',          value: stats.partners,    icon: FiLink,     color: '#2b6cb0' },
    { label: 'Subscribers',       value: stats.subscribers, icon: FiSend,     color: '#0d9488' },
    { label: 'Published News',    value: stats.newPosts,    icon: FiFileText, color: '#b45309' },
    { label: 'Resources',         value: stats.resources,   icon: FiBookOpen, color: '#be185d' },
  ];

  return (
    <div>
      <h2 className="admin-page-title">Dashboard</h2>

      <div className="stats-grid">
        {STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card" style={{ '--stat-accent': s.color }}>
              <div>
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
              <div className="stat-icon"><Icon size={18} /></div>
            </div>
          );
        })}
      </div>

      {isSuperAdmin && team && (
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <FiShield size={16} color="#2d6a4f" />
            <strong style={{ fontSize: 15 }}>Team Overview</strong>
            <a href="/admin/team" style={{ fontSize: 13, color: '#2d6a4f', marginLeft: 'auto' }}>Manage team</a>
          </div>
          <div className="team-summary">
            <span className="team-summary-pill"><strong>{team.total}</strong> total</span>
            {Object.entries(team.byRole).map(([role, count]) => (
              <span key={role} className="team-summary-pill">
                <strong>{count}</strong> {role.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        <RecentList title="Recent Contacts" items={recent.contacts} renderRow={c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.subject}</td>
            <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
          </tr>
        )} headers={['Name', 'Subject', 'Status']} link="/admin/contacts" />

        <RecentList title="Recent Prayers" items={recent.prayers} renderRow={p => (
          <tr key={p.id}>
            <td>{p.isAnonymous ? 'Anonymous' : p.name}</td>
            <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.request}</td>
            <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
          </tr>
        )} headers={['Name', 'Request', 'Status']} link="/admin/prayers" />

        <RecentList title="Recent Volunteers" items={recent.volunteers} renderRow={v => (
          <tr key={v.id}>
            <td>{v.name}</td>
            <td>{(v.areas || []).join(', ') || '—'}</td>
            <td><span className={`badge badge-${v.status}`}>{v.status}</span></td>
          </tr>
        )} headers={['Name', 'Areas', 'Status']} link="/admin/volunteers" />

        <RecentList title="Recent Partners" items={recent.partners || []} renderRow={p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.organization || '—'}</td>
            <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
          </tr>
        )} headers={['Name', 'Organization', 'Status']} link="/admin/partners" />
      </div>
    </div>
  );
}

function RecentList({ title, items, renderRow, headers, link }) {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <strong style={{ fontSize: 15 }}>{title}</strong>
        <a href={link} style={{ fontSize: 13, color: '#2d6a4f' }}>View all</a>
      </div>
      {items.length === 0
        ? <div className="admin-empty" style={{ padding: '20px 0' }}>No entries yet.</div>
        : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{items.map(renderRow)}</tbody>
            </table>
          </div>
        )
      }
    </div>
  );
}
