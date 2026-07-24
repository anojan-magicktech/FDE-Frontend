import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { setLenisInstance } from 'lib/lenis';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'components/ui/sonner';
import { Navigation } from 'components/layout/Navigation';
import { Footer } from 'components/layout/Footer';
import { ContactModal } from 'components/layout/ContactModal';
import { FloatingContact } from 'components/layout/FloatingContact';
import ScrollToTop from 'components/layout/ScrollToTop';
import { Home } from 'pages/Home';
import { ServicesPage } from 'pages/ServicesPage';
import { ProjectsPage } from 'pages/ProjectsPage';
import { store } from 'store/store';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
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
          <Navigation onContactClick={handleContactModalOpen} />

          <main className="pt-16 lg:pt-20">
            <Routes>
              <Route path="/" element={<Home onContactClick={handleContactModalOpen} />} />
              <Route path="/services" element={<ServicesPage onContactClick={handleContactModalOpen} />} />
              <Route path="/projects" element={<ProjectsPage onContactClick={handleContactModalOpen} />} />
            </Routes>

            <Footer />
          </main>
          <FloatingContact />
          <ContactModal isOpen={isContactModalOpen} onClose={handleContactModalClose} />
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
