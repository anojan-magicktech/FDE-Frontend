import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLenisInstance } from 'lib/lenis';
import type { NavLink } from 'types/nav';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks: NavLink[] = [
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
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
    <footer className="bg-[#050505] text-white pt-16 md:pt-24 pb-12 border-t border-white/5" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
            </motion.div>

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
          </div>

          {/* Quick Links */}
          <div>
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
          </div>

          {/* Socials & Business Hours */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6 text-white border-b border-white/5 pb-2 tracking-wide">Connect With Us</h3>
            <div className="flex space-x-3 mb-8">
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

            <div>
              <h4 className="font-heading text-sm font-bold mb-3 text-white/80">Business Hours</h4>
              <div className="text-white/50 text-xs font-body space-y-1 font-light">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/30 text-xs font-body text-center md:text-left">
              © {currentYear} Future Design Engineering. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button className="text-white/30 hover:text-gold text-xs font-body transition-colors">
                Privacy Policy
              </button>
              <button className="text-white/30 hover:text-gold text-xs font-body transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
