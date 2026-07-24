import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Building2,
  Ruler,
  Hammer,
  Home,
  Factory,
  Wrench,
  ArrowRight,
  HardHat,
  Truck,
  DraftingCompass,
  Paintbrush,
  Zap,
  Droplet,
  Warehouse,
  BrickWall,
  Shovel,
  Briefcase,
  Users,
  Lightbulb,
  Anchor,
  Settings,
  ShieldCheck,
  Cpu,
  Network,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api, { apiBaseUrl } from '../services/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { AspectRatio } from "./ui/aspect-ratio";

const iconMap = {
  Home,
  Building2,
  Ruler,
  Factory,
  Wrench,
  Hammer,
  HardHat,
  Truck,
  DraftingCompass,
  Paintbrush,
  Zap,
  Droplet,
  Warehouse,
  BrickWall,
  Shovel,
  Briefcase,
  Users,
  Lightbulb,
  Anchor,
  Settings,
  ShieldCheck,
  Cpu,
  Network
};

// Cache services data in memory to prevent layout shifts and stutters on route navigation
let cachedServices = null;

export const Services = ({ isPreview = false, hideHeader = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [services, setServices] = useState(cachedServices || []);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services/');
        setServices(response.data);
        cachedServices = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Control Lenis scrolling when modal is open/closed
  useEffect(() => {
    if (selectedService) {
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
  }, [selectedService]);

  const displayedServices = isPreview ? services.slice(0, 3) : services;

  const getImageUrl = (url) => {
    if (url && !url.startsWith('http')) {
      return `${apiBaseUrl}${url}`;
    }
    return url;
  };

  const handleGetQuote = () => {
    setSelectedService(null);
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        window.lenis?.scrollTo(contactSection, { offset: -80 });
      }
    }, 300);
  };

  return (
    <>
      <section
        id="services"
        className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden"
        ref={ref}
        data-testid="services-section"
      >
        {/* Ambient glow decoration */}
        <div className="absolute left-1/4 top-1/4 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
        <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl opacity-30 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!hideHeader && (
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
                className="inline-flex items-center px-4 py-1.5 border border-gold/30 bg-gold/5 rounded-full mb-6"
              >
                <span className="text-gold text-xs tracking-[0.2em] font-body font-semibold uppercase">
                  OUR SERVICES
                </span>
              </motion.div>
              
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                Engineering
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-400"> Excellence</span>
              </h2>
              <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
                Comprehensive construction and engineering solutions tailored to your vision. From
                concept to completion, we deliver precision at every stage.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedServices.map((service, index) => {
              const Icon = iconMap[service.icon];

              return (
                <motion.div
                  key={service.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-gradient-to-b from-[#0c0c0c] to-[#080808] p-8 border border-white/5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedService(service)}
                  data-testid={`service-card-${index}`}
                >
                  <div className="absolute top-0 left-0 w-1.5 h-0 bg-gradient-to-b from-royal-blue to-blue-600 group-hover:h-full transition-all duration-500" />
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-royal-blue/5 group-hover:bg-royal-blue/10 rounded-full transition-all duration-500" />

                  <div className="relative mb-6">
                    <div className="inline-flex p-4 rounded-lg bg-zinc-900 border border-white/5 group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-300 relative">
                      {Icon ? (
                        <Icon
                          className="text-royal-blue group-hover:text-gold transition-colors duration-300"
                          size={32}
                          strokeWidth={1.5}
                        />
                      ) : (
                        <Building2
                          className="text-royal-blue group-hover:text-gold transition-colors duration-300"
                          size={32}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-body font-light leading-relaxed mb-6 break-words whitespace-pre-line line-clamp-3 text-sm">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center text-royal-blue-bright group-hover:text-gold transition-colors duration-300">
                      <span className="text-sm font-body font-semibold tracking-wide">View Details</span>
                      <ArrowRight size={14} className="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="text-xs text-white/30 font-body">0{index + 1}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {isPreview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center mt-12"
            >
              <Link 
                to="/services"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-royal-blue to-blue-700 text-white rounded-md font-semibold hover:shadow-lg transition-all duration-300 shadow-royal-blue/15 group"
              >
                See All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
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
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/75 hover:bg-gold text-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm border border-white/5"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image/Gallery Side */}
                  <div className="bg-[#050505] relative min-h-[250px] sm:min-h-[400px] lg:min-h-full flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/5">
                    {(() => {
                      const allImages = [];
                      if (selectedService.image) allImages.push({ image: selectedService.image, id: 'main' });
                      if (selectedService.gallery_images && selectedService.gallery_images.length > 0) {
                        allImages.push(...selectedService.gallery_images);
                      }

                      if (allImages.length > 0) {
                        return (
                          <Carousel className="w-full max-w-xl">
                            <CarouselContent>
                              {allImages.map((img, idx) => (
                                <CarouselItem key={idx}>
                                  <div className="p-1">
                                    <AspectRatio ratio={4 / 3} className="bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
                                      <img
                                        src={getImageUrl(img.image)}
                                        alt={img.caption || selectedService.title}
                                        className="object-cover w-full h-full"
                                      />
                                    </AspectRatio>
                                    {img.caption && <p className="text-center text-gray-400 text-xs mt-3 font-body">{img.caption}</p>}
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 bg-black/75 text-white border-none hover:bg-gold hover:text-black" />
                            <CarouselNext className="right-2 bg-black/75 text-white border-none hover:bg-gold hover:text-black" />
                          </Carousel>
                        );
                      } else {
                        const Icon = iconMap[selectedService.icon];
                        return (
                          <div className="flex items-center justify-center w-full h-[300px] text-zinc-800">
                            {Icon ? <Icon size={120} strokeWidth={0.5} opacity={0.4} className="text-gold" /> : <Building2 size={120} strokeWidth={0.5} opacity={0.4} className="text-gold" />}
                          </div>
                        );
                      }
                    })()}
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 bg-gradient-to-b from-zinc-950 to-black text-white">
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-gold/15">
                        {(() => {
                          const Icon = iconMap[selectedService.icon];
                          return Icon && <Icon size={12} />;
                        })()}
                        Service Details
                      </div>

                      <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                        {selectedService.title}
                      </h2>

                      <div className="w-20 h-1 bg-gradient-to-r from-gold to-royal-blue mb-8 rounded-full" />
                    </div>

                    <div className="prose prose-invert max-w-none font-body font-light text-white/70 leading-relaxed mb-8 whitespace-pre-wrap break-words text-base sm:text-lg">
                      {(selectedService.description || "")
                        .replace(/<[^>]+>/g, '')
                        .replace(/&nbsp;/g, ' ')}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                      <h4 className="font-heading text-lg font-bold mb-2 text-white">Need this service?</h4>
                      <p className="text-white/50 mb-6 font-body font-light text-sm">Contact our engineering team to inspect and quote your project.</p>
                      
                      <button 
                        onClick={handleGetQuote}
                        className="px-8 py-3 bg-gradient-to-r from-gold to-gold-dim text-black font-body font-semibold rounded-md hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
                      >
                        Get a Quote
                      </button>
                    </div>
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