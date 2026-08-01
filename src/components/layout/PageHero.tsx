import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => {
  return (
    <section className="relative h-[48vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center bg-[#050505]">
      {/* Ambient Radial Backdrop Glow */}
      <div className="absolute inset-0 bg-radial from-gold/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <motion.div
            className="inline-flex items-center px-4 py-1.5 border border-gold/40 bg-black/40 backdrop-blur-md rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gold text-xs tracking-[0.2em] font-body font-semibold uppercase">
              {subtitle || 'Excellence in Engineering'}
            </span>
          </motion.div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
