import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import RequireRole from './components/RequireRole';

import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Impact from './pages/Impact';
import GetInvolved from './pages/GetInvolved';
import Resources from './pages/Resources';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Leadership from './pages/Leadership';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import PostAuth from './pages/PostAuth';

import AdminApp from './admin/AdminApp';

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw new Error('Missing REACT_APP_CLERK_PUBLISHABLE_KEY — set it in client/.env');
}

function AppContent() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/login/*" element={<UserLogin />} />
            <Route path="/register/*" element={<UserRegister />} />
            <Route path="/post-auth" element={<PostAuth />} />
            <Route path="/dashboard" element={<RequireRole roles={null}><UserDashboard /></RequireRole>} />
          </Routes>
        </AnimatePresence>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <Router>
      <ClerkProviderWithRoutes />
    </Router>
  );
}

export default App;
