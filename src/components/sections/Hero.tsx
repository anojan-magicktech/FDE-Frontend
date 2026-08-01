import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { getLenisInstance } from 'lib/lenis';
import Aurora from 'components/ui/Aurora';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      getLenisInstance()?.scrollTo(aboutSection, { offset: -80 });
    }
  };

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('projects');
    if (gallerySection) {
      getLenisInstance()?.scrollTo(gallerySection, { offset: -80 });
    }
  };

  return (
    <section
      className="relative min-h-[75vh] md:min-h-[85vh] w-full overflow-hidden bg-[#050505]"
      data-testid="hero-section"
    >
      {/* ReactBits Vibrant Aurora Shader Background */}
      <Aurora
        colorStops={['#f3d061', '#405ff7', '#ffffff']}
        blend={0.6}
        amplitude={1.2}
        speed={1}
      />

      <div className="relative min-h-[75vh] md:min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center z-10">
        <div className="space-y-6 max-w-4xl">
          {/* Subheading Badge */}
          <div className="inline-flex items-center px-4 py-2 border border-gold/40 bg-black/40 backdrop-blur-md rounded-full shadow-lg shadow-gold/10">
            <span className="text-gold text-xs tracking-[0.25em] font-body font-semibold">
              PRECISION • INNOVATION • EXCELLENCE
            </span>
          </div>

          {/* Main Headings */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-2 drop-shadow-lg">
            <span className="block">Crafting the Future</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold-dim mt-2 drop-shadow-md">
              Of Engineering
            </span>
          </h1>

          {/* Intro Text */}
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed drop-shadow">
            Transforming architectural visions into engineering masterpieces. We deliver
            world-class construction solutions built on precision, trust, and uncompromising
            quality.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-3">
            <motion.button
              onClick={onContactClick}
              className="px-8 py-4 bg-gradient-to-r from-gold to-gold-dim text-black font-body font-semibold text-base tracking-wide rounded-md shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 transform-gpu"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              data-testid="hero-cta-primary"
            >
              Start Your Project
            </motion.button>

            <motion.button
              onClick={scrollToGallery}
              className="px-8 py-4 border border-gold/40 hover:border-royal-blue bg-black/30 hover:bg-royal-blue/20 text-white font-body font-medium text-base tracking-wide rounded-md transition-all duration-300 flex items-center gap-2 group backdrop-blur-sm shadow-md"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              data-testid="hero-cta-secondary"
            >
              View Our Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300 text-gold" />
            </motion.button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold hover:text-royal-blue transition-colors focus:outline-none z-20"
          data-testid="scroll-down-button"
        >
          <ChevronDown size={36} strokeWidth={1.5} className="animate-pulse" />
        </button>
      </div>
    </section>
  );
};
