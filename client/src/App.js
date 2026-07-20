import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Contact from './pages/Contact';
import Leadership from './pages/Leadership';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import PostAuth from './pages/PostAuth';

import AdminApp from './admin/AdminApp';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
