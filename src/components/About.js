import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-white text-zinc-900 relative overflow-hidden"
      ref={ref}
      data-testid="about-section"
    >
      {/* Decorative premium geometric background elements */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-royal-blue/5 rounded-full blur-3xl opacity-40 z-0 pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl opacity-40 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Container with hardware-accelerated fade-up to prevent stutter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="transform-gpu"
          >
            <div className="relative h-[400px] lg:h-[520px] overflow-hidden rounded-2xl border border-zinc-150 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1742657412680-34071a591862?auto=format&fit=crop&w=800&q=70"
                alt="About Future Design"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-4 py-2 bg-[#050505]/85 border border-gold/30 backdrop-blur-md rounded-lg shadow-lg">
                  <span className="text-gold font-body font-semibold text-xs tracking-wider uppercase">
                    ARCHITECTURAL EXCELLENCE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-8 transform-gpu"
          >
            <div>
              <div className="inline-flex items-center px-4 py-1.5 border border-royal-blue bg-royal-blue/10 rounded-full mb-6">
                <span className="text-royal-blue text-xs tracking-[0.2em] font-body font-bold uppercase">
                  ABOUT US
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-zinc-950">
                Building Sri Lanka's
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500 block mt-2">
                  Architectural Future
                </span>
              </h2>

              <div className="space-y-4 text-zinc-700 font-body font-normal text-base sm:text-lg leading-relaxed text-justify">
                <p>
                  Future Design Engineering stands as Sri Lanka's premier construction and
                  engineering firm, dedicated to transforming visionary concepts into built
                  reality. With over two decades of excellence, we've established ourselves as
                  trusted partners in creating structures that define skylines and communities.
                </p>
                <p>
                  Our approach combines cutting-edge engineering methodologies with timeless
                  craftsmanship. Every project reflects our commitment to precision, innovation,
                  and client satisfaction. From residential masterpieces to commercial landmarks,
                  we deliver solutions that exceed expectations.
                </p>
                <p>
                  Based in Jaffna, our team of expert engineers, architects, and craftsmen bring
                  international standards to local projects. We don't just build structures – we
                  craft legacies that stand the test of time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};