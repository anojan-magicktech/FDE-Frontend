import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, MapPin, User, Tag, Star, Quote, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from 'services/api';
import { getLenisInstance } from 'lib/lenis';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from 'components/ui/carousel';
import { AspectRatio } from 'components/ui/aspect-ratio';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProjects } from 'store/projectsSlice';
import type { Project } from 'types/project';
import MagicRings from 'components/ui/MagicRings';
import { useScrollReveal, revealVariants } from 'hooks/useScrollReveal';

interface ProjectsProps {
  isPreview?: boolean;
  hideHeader?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ isPreview = false, hideHeader = false }) => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.items);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.08 });

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');

  // Derived lists for dropdowns
  const uniqueStatuses = ['All', ...Array.from(new Set(projects.map((p) => p.status).filter(Boolean)))];
  const uniqueServices = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.service_type_details?.title).filter(Boolean))),
  ];

  // Filter Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      (project.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (project.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    const matchesService = serviceFilter === 'All' || project.service_type_details?.title === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Lock body scroll and Lenis when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      getLenisInstance()?.stop();
    } else {
      document.body.style.overflow = '';
      getLenisInstance()?.start();
    }
    return () => {
      document.body.style.overflow = '';
      getLenisInstance()?.start();
    };
  }, [selectedProject]);

  const displayedProjects = isPreview ? projects.slice(0, 3) : filteredProjects;

  return (
    <>
      <section
        id="projects"
        className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden"
        ref={ref}
        data-testid="projects-section"
      >
        {!hideHeader && (
          <MagicRings
            color="#d4af37"
            colorTwo="#4169e1"
            ringCount={5}
            speed={1}
            lineThickness={2}
            followMouse={true}
            mouseInfluence={0.2}
            opacity={0.45}
          />
        )}

        {/* Decorative subtle light color highlights */}
        <div className="absolute right-10 top-1/3 w-80 h-80 bg-gold/5 rounded-full blur-3xl opacity-30 z-0 pointer-events-none" />
        <div className="absolute left-10 bottom-1/3 w-96 h-96 bg-royal-blue/5 rounded-full blur-3xl opacity-40 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!hideHeader && (
            <motion.div
              variants={revealVariants.fadeUp}
              initial="hidden"
              animate={isRevealed ? 'visible' : 'hidden'}
              className="text-center mb-16 transform-gpu"
            >
              <div className="inline-flex items-center px-4 py-1.5 border border-royal-blue bg-royal-blue/10 rounded-full mb-6">
                <span className="text-royal-blue text-xs tracking-[0.2em] font-body font-bold uppercase">
                  PORTFOLIO
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                Portfolio of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500"> Excellence</span>
              </h2>
              <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
                Discover our diverse range of completed projects. Each structure tells a story of
                precision engineering, innovative design, and unwavering commitment to quality.
              </p>
            </motion.div>
          )}

          {/* Search and Filter Section - Redesigned to Light Premium Theme */}
          {!isPreview && (
            <motion.div
              variants={revealVariants.fadeUp}
              initial="hidden"
              animate={isRevealed ? 'visible' : 'hidden'}
              className="mb-16 p-6 rounded-xl bg-[#0c0c0c] border border-white/5 shadow-2xl space-y-4 transform-gpu"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-white/40" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects by title or location..."
                    className="block w-full pl-10 pr-4 py-3 border border-white/10 rounded-lg bg-zinc-900/60 text-white placeholder-white/20 focus:outline-none focus:bg-zinc-900 focus:border-gold/50 focus:ring-1 focus:ring-gold/25 text-sm transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  <div className="relative min-w-[170px]">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-30">
                      <Filter className="h-4 w-4 text-gold" />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 text-sm border border-white/10 bg-zinc-900/60 text-white/80 focus:outline-none focus:bg-zinc-900 focus:ring-1 focus:ring-gold/25 focus:border-gold/50 rounded-lg appearance-none cursor-pointer hover:bg-zinc-800 transition-colors relative z-20"
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                      }}
                    >
                      {uniqueStatuses.map((status) => (
                        <option key={status} value={status} className="bg-zinc-950 text-white py-2">
                          {status === 'All' ? 'All Statuses' : status}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-zinc-400 z-30">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative min-w-[170px]">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-30">
                      <Tag className="h-4 w-4 text-gold" />
                    </div>
                    <select
                      value={serviceFilter}
                      onChange={(e) => setServiceFilter(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 text-sm border border-white/10 bg-zinc-900/60 text-white/80 focus:outline-none focus:bg-zinc-900 focus:ring-1 focus:ring-gold/25 focus:border-gold/50 rounded-lg appearance-none cursor-pointer hover:bg-zinc-800 transition-colors relative z-20"
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                      }}
                    >
                      {uniqueServices.map((service) => (
                        <option key={service} value={service} className="bg-zinc-950 text-white py-2">
                          {service === 'All' ? 'All Services' : service}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-zinc-400 z-30">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={revealVariants.staggerContainer}
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={revealVariants.staggerItemScale}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden cursor-pointer rounded-xl bg-[#0c0c0c] border border-white/5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 transform-gpu"
                onClick={() => setSelectedProject(project)}
                data-testid={`project-card-${index}`}
              >
                {project.status && (
                  <div
                    className={`absolute top-4 right-4 z-20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest shadow-md backdrop-blur-md rounded-full border ${
                      project.status === 'Completed'
                        ? 'text-green-400 bg-black/80 border-green-500/20'
                        : project.status === 'In Process'
                        ? 'text-royal-blue-bright bg-black/80 border-blue-500/20'
                        : 'text-amber-400 bg-black/80 border-amber-500/20'
                    }`}
                  >
                    {project.status}
                  </div>
                )}
                <div className="aspect-[4/3] overflow-hidden bg-zinc-950">
                  <img
                    src={getImageUrl(project.main_image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  {project.service_type_details && (
                    <div className="mb-3">
                      <span className="inline-block px-2.5 py-1 bg-gold text-[#050505] text-[10px] font-body font-bold uppercase tracking-wider rounded-sm shadow-md">
                        {project.service_type_details.title}
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                  <div className="flex justify-between items-center text-white/80 text-xs font-body mb-4 gap-4">
                    {project.location && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-gold transition-colors z-20 relative text-left flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin size={12} className="mr-1 shrink-0 text-gold" />
                        <span className="leading-snug line-clamp-1">{project.location}</span>
                      </a>
                    )}
                    {project.date && (
                      <span className="flex items-center shrink-0">
                        <Calendar size={12} className="mr-1 text-gold" /> {project.date}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-gold font-semibold text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details <ArrowRight size={14} className="ml-1.5 text-gold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {isPreview && (
            <motion.div
              variants={revealVariants.fadeUp}
              initial="hidden"
              animate={isRevealed ? 'visible' : 'hidden'}
              className="flex justify-center mt-16 transform-gpu"
            >
              <Link
                to="/projects"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-royal-blue to-blue-700 text-white rounded-md font-semibold hover:shadow-lg transition-all duration-300 shadow-royal-blue/15 group"
              >
                See All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 25 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/75 hover:bg-gold text-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm border border-white/5"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image/Gallery Side */}
                  <div className="bg-[#050505] relative min-h-[250px] sm:min-h-[400px] lg:min-h-full flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/5">
                    {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 ? (
                      <Carousel className="w-full max-w-xl">
                        <CarouselContent>
                          {/* Add main image as first slide */}
                          <CarouselItem>
                            <div className="p-1">
                              <AspectRatio ratio={4 / 3} className="bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
                                <img
                                  src={getImageUrl(selectedProject.main_image)}
                                  alt={selectedProject.title}
                                  className="object-cover w-full h-full"
                                />
                              </AspectRatio>
                            </div>
                          </CarouselItem>
                          {selectedProject.gallery_images.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <div className="p-1">
                                <AspectRatio ratio={4 / 3} className="bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
                                  <img
                                    src={getImageUrl(img.image)}
                                    alt={img.caption || selectedProject.title}
                                    className="object-cover w-full h-full"
                                  />
                                </AspectRatio>
                                {img.caption && <p className="text-center text-white/50 text-xs mt-3 font-body">{img.caption}</p>}
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 bg-black/75 text-white border-none hover:bg-gold hover:text-black" />
                        <CarouselNext className="right-2 bg-black/75 text-white border-none hover:bg-gold hover:text-black" />
                      </Carousel>
                    ) : (
                      <div className="w-full max-w-xl p-1">
                        <AspectRatio ratio={4 / 3} className="bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
                          <img
                            src={getImageUrl(selectedProject.main_image)}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 bg-gradient-to-b from-zinc-950 to-black text-white">
                    <div className="mb-6">
                      {selectedProject.service_type_details && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-gold/15">
                          <Tag size={12} /> {selectedProject.service_type_details.title}
                        </span>
                      )}
                      <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                        {selectedProject.title}
                      </h2>

                      <div className="flex flex-wrap gap-6 mb-8 text-white/50 font-body text-xs sm:text-sm border-y border-white/5 py-6">
                        {selectedProject.client && (
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gold" />
                            <span>
                              Client: <span className="text-white font-medium">{selectedProject.client}</span>
                            </span>
                          </div>
                        )}
                        {selectedProject.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gold" />
                            <span>
                              Location:{' '}
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedProject.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gold hover:underline transition-colors"
                              >
                                {selectedProject.location}
                              </a>
                            </span>
                          </div>
                        )}
                        {selectedProject.date && (
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gold" />
                            <span>
                              Date: <span className="text-white font-medium">{selectedProject.date}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none font-body font-light text-white/70 leading-relaxed mb-8 whitespace-pre-wrap break-words text-base sm:text-lg">
                      {(selectedProject.description || selectedProject.main_description || '')
                        .replace(/<[^>]+>/g, '') // Strip HTML tags
                        .replace(/&nbsp;/g, ' ') // Replace html entities
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')}
                    </div>

                    {(selectedProject.client_review || selectedProject.client_rating) && (
                      <div className="bg-zinc-900/40 rounded-xl p-6 border border-white/5 mb-8 relative">
                        <Quote className="absolute top-4 right-4 text-gold/10 w-12 h-12 pointer-events-none" />
                        <h4 className="flex items-center gap-2 font-heading font-bold text-lg text-gold mb-4">
                          Client Feedback
                        </h4>
                        {selectedProject.client_rating && (
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(selectedProject.client_rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-gold fill-gold" />
                            ))}
                          </div>
                        )}
                        <p className="text-white/60 font-body font-light italic text-sm leading-relaxed">
                          "{selectedProject.client_review}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
