import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { setLenisInstance } from 'lib/lenis';
import { saveScrollY } from 'lib/scrollMemory';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'components/ui/sonner';
import { Navigation } from 'components/layout/Navigation';
import { Footer } from 'components/layout/Footer';
import { ContactModal } from 'components/layout/ContactModal';
import { FloatingContact } from 'components/layout/FloatingContact';
import ScrollToTop from 'components/layout/ScrollToTop';
import { Home } from 'pages/Home';
import { ServicesPage } from 'pages/ServicesPage';
import { ProjectsPage } from 'pages/ProjectsPage';
import { AdminLogin } from 'pages/AdminLogin';
import { AdminDashboard } from 'pages/AdminDashboard';
import { store } from 'store/store';

function MainLayout({ onContactClick }: { onContactClick: () => void }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <>
      <Navigation onContactClick={onContactClick} />
      <main className="pt-16 lg:pt-20">
        <Routes>
          <Route path="/" element={<Home onContactClick={onContactClick} />} />
          <Route path="/services" element={<ServicesPage onContactClick={onContactClick} />} />
          <Route path="/projects" element={<ProjectsPage onContactClick={onContactClick} />} />
        </Routes>
        <Footer />
      </main>
      <FloatingContact />
    </>
  );
}

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // Continuously remember scroll position so a hard refresh can animate
  // from where you actually were back up to the top.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        saveScrollY(window.scrollY);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isContactModalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isContactModalOpen]);

  const handleContactModalOpen = () => {
    setIsContactModalOpen(true);
  };

  const handleContactModalClose = () => {
    setIsContactModalOpen(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen w-full" data-testid="app-container">
          <MainLayout onContactClick={handleContactModalOpen} />
          <ContactModal isOpen={isContactModalOpen} onClose={handleContactModalClose} />
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
