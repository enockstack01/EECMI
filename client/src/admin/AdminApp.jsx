import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ContactsPage from './pages/ContactsPage';
import PrayersPage from './pages/PrayersPage';
import VolunteersPage from './pages/VolunteersPage';
import SubscribersPage from './pages/SubscribersPage';
import NewsPage from './pages/NewsPage';
import ResourcesPage from './pages/ResourcesPage';
import AdminsPage from './pages/AdminsPage';
import PartnersPage from './pages/PartnersPage';

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
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
                  <Route path="admins"      element={<AdminsPage />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}
