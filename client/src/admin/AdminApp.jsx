import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import RequireRole from '../components/RequireRole';
import { ADMIN_ROLES } from '../hooks/useRole';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import ContactsPage from './pages/ContactsPage';
import PrayersPage from './pages/PrayersPage';
import VolunteersPage from './pages/VolunteersPage';
import SubscribersPage from './pages/SubscribersPage';
import NewsPage from './pages/NewsPage';
import ResourcesPage from './pages/ResourcesPage';
import TeamPage from './pages/TeamPage';
import PartnersPage from './pages/PartnersPage';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Navigate to="/login" replace />} />
      <Route
        path="*"
        element={
          <RequireRole roles={ADMIN_ROLES}>
            <AdminAuthProvider>
              <AdminLayout>
                <Routes>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard"   element={<Dashboard />} />
                  <Route path="contacts"    element={<ContactsPage />} />
                  <Route path="prayers"     element={<PrayersPage />} />
                  <Route path="volunteers"  element={<VolunteersPage />} />
                  <Route path="subscribers" element={<SubscribersPage />} />
                  <Route path="news"        element={<NewsPage />} />
                  <Route path="resources"   element={<ResourcesPage />} />
                  <Route path="partners"    element={<PartnersPage />} />
                  <Route path="team"        element={<TeamPage />} />
                </Routes>
              </AdminLayout>
            </AdminAuthProvider>
          </RequireRole>
        }
      />
    </Routes>
  );
}
