import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiMail, FiHeart, FiUsers, FiSend, FiFileText,
  FiBookOpen, FiLink, FiShield, FiMenu, FiLogOut,
} from 'react-icons/fi';
import { useAdminAuth } from '../context/AdminAuthContext';
import './AdminLayout.css';

const NAV = [
  { to: '/admin/dashboard',    label: 'Dashboard',    icon: FiGrid },
  { to: '/admin/contacts',     label: 'Contacts',     icon: FiMail },
  { to: '/admin/prayers',      label: 'Prayers',      icon: FiHeart },
  { to: '/admin/volunteers',   label: 'Volunteers',   icon: FiUsers },
  { to: '/admin/subscribers',  label: 'Subscribers',  icon: FiSend },
  { to: '/admin/news',         label: 'News',         icon: FiFileText },
  { to: '/admin/resources',    label: 'Resources',    icon: FiBookOpen },
  { to: '/admin/partners',     label: 'Partners',     icon: FiLink },
  { to: '/admin/team',         label: 'Team',         icon: FiShield, superAdminOnly: true },
];

export default function AdminLayout({ children }) {
  const { admin, isSuperAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const nav = NAV.filter(item => !item.superAdminOnly || isSuperAdmin);
  const initials = (admin?.name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className={`admin-shell${sidebarOpen ? ' sidebar-open' : ''}`}>
      {sidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="brand-cross">✝</span>
          <span className="brand-name">EECMI Admin</span>
        </div>
        <nav className="admin-nav">
          {nav.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={16} /> <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav-link view-site">
            View Site
          </a>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarOpen(v => !v)} aria-label="Toggle menu">
            <FiMenu size={20} />
          </button>
          <div className="topbar-right">
            <div className="topbar-user">
              <span className="topbar-avatar">{initials}</span>
              <span className="topbar-user-info">
                <strong>{admin?.name}</strong>
                <em>{admin?.role?.replace('_', ' ')}</em>
              </span>
            </div>
            <button className="btn-logout" onClick={handleLogout}><FiLogOut size={14} /> <span>Logout</span></button>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
