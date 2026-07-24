import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingContact = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email Us',
      href: 'mailto:futuredesignengineering8@gmail.com',
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+94775824660',
    },
    {
      icon: MapPin,
      label: 'Find Us',
      href: 'https://maps.google.com/?q=Periyapathi+Vathiry+Karaveddy+Jaffna+Sri+Lanka',
      target: '_blank',
    },
  ];

  return (
    <>
      {/* Desktop Floating Contact */}
      <div
        className="hidden md:flex floating-contact-container fixed top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 transition-all duration-300"
        style={{ right: 'var(--removed-body-scroll-bar-size, 0px)' }}
      >
        {contactLinks.map((link, index) => (
          <ContactItem key={index} link={link} index={index} />
        ))}
      </div>

      {/* Mobile Floating Contact Arrow */}
      <div className="md:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ x: 90, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="flex flex-col gap-2 mr-2"
            >
              {contactLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: index * 0.04 }}
                    className="w-11 h-11 rounded-full bg-gradient-to-r from-gold via-amber-300 to-gold-dim text-black flex items-center justify-center shadow-lg shadow-black/30 border border-gold/40"
                    aria-label={link.label}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          whileTap={{ scale: 0.94 }}
          className="w-9 h-14 rounded-l-full bg-gradient-to-r from-gold via-amber-300 to-gold-dim text-black flex items-center justify-center shadow-lg shadow-black/30 border-y border-l border-gold/40"
          aria-label="Toggle contact buttons"
        >
          {isMobileOpen ? (
            <ChevronRight size={22} strokeWidth={2.4} />
          ) : (
            <ChevronLeft size={22} strokeWidth={2.4} />
          )}
        </motion.button>
      </div>
    </>
  );
};

const ContactItem = ({ link, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = link.icon;

  const handleClick = (e) => {
    if (link.label === 'Email Us') {
      const confirmed = window.confirm(
        'Would you like to open your default email client to send us a message?'
      );

      if (!confirmed) {
        e.preventDefault();
      }
    }
  };

  return (
    <motion.a
      href={link.href}
      target={link.target}
      rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={`flex items-center justify-end relative overflow-hidden transition-all duration-300 rounded-l-md bg-gradient-to-r from-gold via-amber-300 to-gold-dim text-black border-y border-l border-gold/30 ${
        isHovered
          ? 'shadow-lg shadow-black/25 pr-4 border-gold/50 scale-x-105 origin-right'
          : 'shadow-sm shadow-black/10 pr-0 border-gold/30'
      }`}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5 + index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ height: '3.5rem' }}
    >
      <motion.div
        className="flex items-center justify-center"
        initial={{ width: '3.5rem' }}
        animate={{ width: isHovered ? 'auto' : '3.5rem' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full">
          <Icon size={24} strokeWidth={2} />
        </span>

        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2 }}
              className="font-semibold whitespace-nowrap overflow-hidden"
            >
              {link.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.a>
  );
};