import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const Hero = ({ onContactClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.lenis?.scrollTo(aboutSection, { offset: -80 });
    }
  };

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('projects');
    if (gallerySection) {
      window.lenis?.scrollTo(gallerySection, { offset: -80 });
    }
  };

  return (
    <section
  onMouseMove={handleMouseMove}
  className="relative min-h-[68vh] md:min-h-[78vh] w-full overflow-hidden bg-[#050505]"
  data-testid="hero-section"
>
      {/* Background Image with optimized loading & quality */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1761437855598-a84c2849dc6a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnb2xkJTIwYmxhY2slMjB0ZXh0dXJlJTIwYmFja2dyb3VuZCUyMGFic3RyYWN0fGVufDB8fHx8MTc3MDY0MjU0NXww&ixlib=rb-4.1.0&q=85')",
          filter: 'contrast(1.15) brightness(1)',
        }}
      />
      {/* Dark Luxury Vignette and Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#050505]/55 to-[#050505]/90" />
 {/* Premium Gold Glitter Mouse Reactive Animation */}
<motion.div
  className="absolute inset-0 pointer-events-none opacity-70"
  style={{
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.65) 0px, transparent 2.5px),
      radial-gradient(circle at 70% 40%, rgba(255, 215, 120, 0.55) 0px, transparent 2.5px),
      radial-gradient(circle at 40% 75%, rgba(212, 175, 55, 0.50) 0px, transparent 2.5px),
      radial-gradient(circle at 85% 70%, rgba(255, 223, 140, 0.45) 0px, transparent 2.5px)
    `,
    backgroundSize: '180px 180px',
  }}
  animate={{
  x: mousePosition.x * 0.15,
  y: mousePosition.y * 0.15,
  opacity: [0.45, 0.75, 0.5, 0.85, 0.45],
  backgroundPosition: [
    '0px 0px',
    '60px 120px',
    '-80px 40px',
    '140px -60px',
    '20px 180px',
    '0px 0px',
  ],
}}
transition={{
  x: { duration: 0.03, ease: 'linear' },
  y: { duration: 0.03, ease: 'linear' },
  opacity: {
    duration: 14,
    repeat: Infinity,
    ease: 'easeInOut',
  },
  backgroundPosition: {
    duration: 14,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}}
/>  
      {/* Interactive premium ambient background glow mesh */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-royal-blue/15 via-transparent to-gold/10 pointer-events-none"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
<div className="relative min-h-[68vh] md:min-h-[78vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center z-10">
      
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          {/* Subheading Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full shadow-lg shadow-gold/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-gold text-xs tracking-[0.25em] font-body font-semibold">
              PRECISION • INNOVATION • EXCELLENCE
            </span>
          </motion.div>

          {/* Main Headings */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-2">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Crafting the Future
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-300 to-gold-dim mt-2 drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
            </motion.span>
          </h1>

          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed"
          >
            Transforming architectural visions into engineering masterpieces. We deliver
            world-class construction solutions built on precision, trust, and uncompromising
            quality.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-3"
          >
            <motion.button
              onClick={onContactClick}
              className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dim text-black font-body font-semibold text-base tracking-wide rounded-md shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-testid="hero-cta-primary"
            >
              Start Your Project
            </motion.button>
            
            <motion.button
              onClick={scrollToGallery}
              className="px-8 py-4 border border-white/20 hover:border-royal-blue bg-white/5 hover:bg-royal-blue/10 text-white font-body font-medium text-base tracking-wide rounded-md transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-testid="hero-cta-secondary"
            >
              View Our Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300 text-gold" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.6, duration: 0.8 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/70 hover:text-royal-blue transition-colors focus:outline-none"
          data-testid="scroll-down-button"
        >
          <ChevronDown size={36} strokeWidth={1.5} className="animate-pulse" />
        </motion.button>
      </div>
    </section>
  );
};
