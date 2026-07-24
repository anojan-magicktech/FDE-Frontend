import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ContactModal } from '@/components/ContactModal';
import { FloatingContact } from '@/components/FloatingContact';
import { Home } from '@/pages/Home';
import { ServicesPage } from '@/pages/ServicesPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import '@/App.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
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
    <Router>
      <ScrollToTop />
      <div className="App" data-testid="app-container">
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
  );
}

export default App;