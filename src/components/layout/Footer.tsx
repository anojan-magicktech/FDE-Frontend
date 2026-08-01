import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLenisInstance } from 'lib/lenis';
import type { NavLink } from 'types/nav';
import { useScrollReveal, revealVariants } from 'hooks/useScrollReveal';

// lucide-react doesn't ship a TikTok glyph (brand logos aren't part of its
// outline icon set), so it's drawn as a small inline mark instead.
const TikTokIcon: React.FC<{ size?: number; strokeWidth?: number; className?: string }> = ({
  size = 18,
  className,
}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.08 });

  const quickLinks: NavLink[] = [
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: '3D Plans', id: '3d-planning' },
    { label: 'Projects', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Our Value', id: 'why-choose-us' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1CMWtk8Gge/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/future_design_engineering?igsh=YnVvdzFyYzJqYmNs&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/future-design-engineering-pvt-ltd/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@futuredesignengineering?si=Ic9KYv8lMx5BDkhU', label: 'YouTube' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@future.design.eng?_r=1&_t=ZS-98Vvr7uaF6N', label: 'TikTok' },
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      if (id === 'services') {
        navigate('/services');
      } else if (id === 'gallery') {
        navigate('/projects');
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            getLenisInstance()?.scrollTo(element, { offset: -80 });
          }
        }, 150);
      }
    } else {
      // On home page: scroll locally instead of navigating
      const targetId = id === 'gallery' ? 'projects' : id;
      const element = document.getElementById(targetId);
      if (element) {
        getLenisInstance()?.scrollTo(element, { offset: -80 });
      }
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-16 md:pt-24 pb-12 border-t border-white/5" data-testid="footer-section" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16"
          variants={revealVariants.staggerContainer}
          initial="hidden"
          animate={isRevealed ? 'visible' : 'hidden'}
        >
          {/* Brand Info */}
          <motion.div className="lg:col-span-2 space-y-6" variants={revealVariants.staggerItem}>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                }
                getLenisInstance()?.scrollTo(0);
              }}
            >
              <div className="font-heading text-3xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-400">FUTURE DESIGN</span>
                <div className="text-white/80 text-[10px] tracking-[0.25em] font-body font-light mt-1">ENGINEERING</div>
              </div>
            </div>

            <p className="text-white/60 font-body font-light text-sm leading-relaxed max-w-sm">
              Building Sri Lanka's future with precision engineering, innovative design, and
              uncompromising quality. Your trusted partner in construction excellence.
            </p>

            <div className="space-y-3 font-body text-xs sm:text-sm text-white/50">
              <div className="flex items-center space-x-3 hover:text-gold transition-colors w-fit">
                <Phone size={16} strokeWidth={1.5} className="text-gold" />
                <a href="tel:+94775824660">+94 77 582 4660</a>
              </div>
              <div className="flex items-center space-x-3 hover:text-gold transition-colors w-fit">
                <Mail size={16} strokeWidth={1.5} className="text-gold" />
                <a href="mailto:futuredesignengineering8@gmail.com">futuredesignengineering8@gmail.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-gold" />
                <span>Periyapathi Vathiry Karaveddy, Jaffna, Sri Lanka</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={revealVariants.staggerItem}>
            <h3 className="font-heading text-lg font-bold mb-6 text-white border-b border-white/5 pb-2 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/50 hover:text-gold transition-colors font-body text-sm text-left"
                    data-testid={`footer-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div variants={revealVariants.staggerItem}>
            <h3 className="font-heading text-lg font-bold mb-6 text-white border-b border-white/5 pb-2 tracking-wide">Connect With Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded bg-zinc-950 border border-white/5 hover:border-gold hover:bg-gold/15 transition-all duration-300 group"
                    whileHover={{ y: -3 }}
                    data-testid={`social-link-${social.label.toLowerCase()}`}
                    aria-label={social.label}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-white/60 group-hover:text-gold transition-colors"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/5 pt-8"
          variants={revealVariants.fadeUp}
          initial="hidden"
          animate={isRevealed ? 'visible' : 'hidden'}
        >
          <div className="flex justify-center md:justify-start">
            <p className="text-white/30 text-xs font-body text-center md:text-left">
              © {currentYear} Future Design Engineering. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
