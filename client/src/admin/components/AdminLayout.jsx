import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import './AdminLayout.css';

const NAV = [
  { to: '/admin/dashboard',    label: 'Dashboard'    },
  { to: '/admin/contacts',     label: 'Contacts'     },
  { to: '/admin/prayers',      label: 'Prayers'      },
  { to: '/admin/volunteers',   label: 'Volunteers'   },
  { to: '/admin/subscribers',  label: 'Subscribers'  },
  { to: '/admin/news',         label: 'News'         },
  { to: '/admin/resources',    label: 'Resources'    },
  { to: '/admin/partners',     label: 'Partners'     },
  { to: '/admin/admins',       label: 'Admin Users'  },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className={`admin-shell${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="brand-cross">✝</span>
          <span className="brand-name">EECMI Admin</span>
        </div>
        <nav className="admin-nav">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav-link view-site">
            View Site
          </a>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarOpen(v => !v)}>
            &#9776;
          </button>
          <div className="topbar-right">
            <span className="topbar-user">
              {admin?.name} &mdash; <em>{admin?.role?.replace('_', ' ')}</em>
            </span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
