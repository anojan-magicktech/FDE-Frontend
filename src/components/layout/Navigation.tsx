import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLenisInstance } from 'lib/lenis';
import type { NavLink } from 'types/nav';

interface NavigationProps {
  onContactClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll and Lenis scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
      getLenisInstance()?.stop();
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
      getLenisInstance()?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
      getLenisInstance()?.start();
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
    getLenisInstance()?.start();
  };

  const dedicatedRoutes: Record<string, string> = {
    services: '/services',
    projects: '/projects',
  };

  const scrollToSection = (id: string) => {
    closeMobileMenu();

    const targetId = id === 'gallery' ? 'projects' : id;

    // Services/Projects have their own dedicated pages — if we're on one of
    // those pages (or the other one), go straight there instead of detouring
    // through Home.
    if (location.pathname !== '/' && dedicatedRoutes[targetId]) {
      navigate(dedicatedRoutes[targetId]);
      return;
    }

    const scrollNow = () => {
      const element = document.getElementById(targetId);

      if (element) {
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(element, {
            offset: -80,
            duration: 1.1,
          });
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    if (location.pathname !== '/') {
      navigate('/', {
        state: {
          scrollTo: targetId,
        },
      });
      return;
    }

    setTimeout(() => {
      scrollNow();
    }, 80);
  };

  const handleLogoClick = () => {
    closeMobileMenu();

    if (location.pathname !== '/') {
      navigate('/');

      setTimeout(() => {
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 250);
    } else {
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleMobileProjectClick = () => {
    closeMobileMenu();

    setTimeout(() => {
      onContactClick();
    }, 250);
  };

  const navLinks: NavLink[] = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: '3D Plans', id: '3d-planning' },
    { label: 'Projects', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Our Value', id: 'why-choose-us' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]"
        data-testid="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={handleLogoClick}
              data-testid="logo-link"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center bg-black rounded-lg border border-gold/30 p-0 overflow-hidden shadow-inner">
                  <img
                    src="/logo.png"
                    alt="FD"
                    className="w-[92%] h-[92%] object-contain scale-[1.70]"
                    loading="eager"
                    decoding="sync"
                    draggable="false"
                  />
                </div>

                <div className="font-heading tracking-tight">
                  <div className="text-gold text-sm lg:text-lg font-bold leading-tight tracking-[0.05em]">
                    FUTURE DESIGN
                  </div>
                  <div className="text-white text-[8px] lg:text-[10px] tracking-[0.25em] font-body font-light opacity-80 mt-0.5">
                    ENGINEERING
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-2 font-body font-normal text-sm tracking-wide transition-all relative group text-white/80 hover:text-gold"
                  data-testid={`nav-link-${link.id}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-gold to-royal-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                onClick={onContactClick}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-royal-blue to-blue-700 text-white font-body text-sm font-semibold tracking-wide border border-royal-blue/30 rounded-md shadow-lg shadow-royal-blue/20 overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 10px 20px -10px rgba(65, 105, 225, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                data-testid="nav-cta-button"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Start Your Project
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-gold to-gold-dim opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                  style={{ mixBlendMode: 'difference' }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2 hover:text-gold transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[45] lg:hidden bg-black/70 backdrop-blur-sm"
            data-testid="mobile-menu"
            onClick={closeMobileMenu}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 h-full w-[78vw] max-w-[320px] bg-[#050505] border-l border-gold/20 shadow-2xl shadow-black/60 flex flex-col pt-20"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

              <div className="px-6 pb-3 border-b border-white/10" />

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      onClick={() => scrollToSection(link.id)}
                      className="group text-left text-white/90 hover:text-gold transition-colors flex items-center justify-between py-3.5 border-b border-white/5"
                      data-testid={`mobile-nav-link-${link.id}`}
                    >
                      <span className="font-body text-[17px] font-medium tracking-[0.02em]">{link.label}</span>
                      <ChevronRight
                        className="text-gold group-hover:translate-x-1 transition-transform"
                        size={17}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-8 pt-5 border-t border-white/10">
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleMobileProjectClick}
                  className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-dim text-black font-body font-bold text-sm tracking-wider rounded-md flex items-center justify-center shadow-lg shadow-gold/20"
                  data-testid="mobile-cta-button"
                >
                  Start Your Project
                  <ChevronRight size={16} className="ml-2" />
                </motion.button>

                <div className="mt-5 space-y-3 text-white/55 text-xs font-body">
                  <a
                    href="tel:+94775824660"
                    className="flex items-center gap-2 hover:text-gold transition-colors"
                  >
                    <Phone size={14} className="text-gold" />
                    <span>+94 77 582 4660</span>
                  </a>

                  <a
                    href="mailto:futuredesignengineering8@gmail.com"
                    className="flex items-center gap-2 hover:text-gold transition-colors"
                  >
                    <Mail size={14} className="text-gold" />
                    <span className="break-all">futuredesignengineering8@gmail.com</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Periyapathi+Vathiry+Karaveddy+Jaffna+Sri+Lanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 hover:text-gold transition-colors"
                  >
                    <MapPin size={14} className="text-gold mt-0.5" />
                    <span>Karaveddy, Jaffna, Sri Lanka</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
