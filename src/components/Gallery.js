import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export const Gallery = ({ isPreview = false }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Lock scroll when selectedProject lightbox is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [selectedProject]);

  const displayedProjects = isPreview ? projectsData.slice(0, 3) : projectsData;

  return (
    <>
      <section
        id="gallery"
        className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden"
        ref={ref}
        data-testid="gallery-section"
      >
        {/* Glow decoration */}
        <div className="absolute right-10 top-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-1.5 border border-royal-blue/30 bg-royal-blue/5 rounded-full mb-6"
            >
              <span className="text-royal-blue-bright text-xs tracking-[0.2em] font-body font-semibold uppercase">
                GALLERY
              </span>
            </motion.div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Portfolio of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-400"> Excellence</span>
            </h2>
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
              Discover our diverse range of completed projects. Each structure tells a story of
              precision engineering, innovative design, and unwavering commitment to quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden cursor-pointer rounded-xl bg-[#0c0c0c] border border-white/5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
                data-testid={`gallery-item-${index}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 bg-gold text-black text-[10px] font-body font-bold uppercase tracking-wider rounded-sm shadow-md">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-royal-blue-bright font-semibold text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={14} className="mr-1.5" />
                    <span>View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {isPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center mt-16"
            >
              <Link to="/projects">
                <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-royal-blue to-blue-700 text-white rounded-md font-semibold hover:shadow-lg transition-all duration-300 shadow-royal-blue/15 group">
                  See All Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
            data-testid="gallery-lightbox"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 25 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-gold/20 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/75 hover:bg-gold text-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm border border-white/5"
                data-testid="lightbox-close"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto bg-black">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover max-h-[500px] lg:max-h-full"
                  />
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-zinc-950 to-black text-white">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gold text-black text-xs font-body font-bold uppercase tracking-wide rounded-sm shadow-md">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-gold to-royal-blue mb-6 rounded-full" />
                  <p className="text-white/70 text-base sm:text-lg font-body font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};