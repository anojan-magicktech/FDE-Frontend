import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, X, Maximize2, Cpu, Ruler, Layout } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

const plansData = [
    {
        id: 1,
        title: 'Modern Residential Villa',
        category: '3D Render & Planning',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=75',
        description: 'A photorealistic 3D architectural rendering of a contemporary biophilic villa. The design features floor-to-ceiling glass, steel-supported cantilevers, and integrated green terraces to blend sustainable living with structural luxury.',
        details: {
            software: 'Revit + Lumion',
            scale: '1:50',
            phase: 'Design Visualization'
        }
    },
    {
        id: 2,
        title: 'Commercial Skyscraper Frame',
        category: 'CAD Wireframe Model',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75',
        description: 'A complex structural CAD model representing the core steel frame and load-bearing columns of a 45-story commercial tower. Engineered for optimal seismic resistance, aerodynamic wind loads, and foundational stress distribution.',
        details: {
            software: 'AutoCAD + SAP2000',
            scale: '1:100',
            phase: 'Structural Engineering'
        }
    },
    {
        id: 3,
        title: 'Industrial Warehouse Facility',
        category: 'BIM Model Layout',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=75',
        description: 'A complete Building Information Modeling (BIM) layout for a sustainable logistics hub. Optimizes warehouse layout space, HVAC ductwork distribution, electrical trays, and pre-cast concrete column scheduling.',
        details: {
            software: 'Tekla Structures',
            scale: '1:200',
            phase: 'Pre-construction BIM'
        }
    },
    {
        id: 4,
        title: 'Concrete Bridge Foundation',
        category: 'Structural 3D Design',
        image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=75',
        description: '3D finite element mesh planning for a high-strength reinforced concrete arch bridge. Features precise load trajectory analysis, shear stress mappings, and rebar reinforcement grids designed for mass public transit.',
        details: {
            software: 'ANSYS + Civil 3D',
            scale: '1:150',
            phase: 'Geotechnical & Stress'
        }
    },
    {
        id: 5,
        title: 'Urban Retail Complex',
        category: 'Exterior Model Perspective',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=75',
        description: '3D exterior spatial model planning for a multi-level pedestrian-friendly shopping and retail complex. Focuses on structural aesthetics, solar heat gain mitigation, and optimized natural light distribution via architectural skylights.',
        details: {
            software: 'SketchUp + V-Ray',
            scale: '1:75',
            phase: 'Concept Rendering'
        }
    }
];

export const ThreeDPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Control Lenis scrolling when plan details modal is open
    useEffect(() => {
        if (selectedPlan) {
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
    }, [selectedPlan]);

    return (
        <>
            <section
                ref={ref}
                id="3d-planning"
                className="py-24 sm:py-32 bg-white text-zinc-900 border-t border-zinc-200/80 relative overflow-hidden"
                data-testid="3d-planning-section"
            >
                {/* Ambient glow decoration */}
                <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] bg-royal-blue/5 rounded-full blur-3xl opacity-20 z-0 pointer-events-none" />
                <div className="absolute left-1/4 bottom-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl opacity-15 z-0 pointer-events-none" />

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
                                3D PLANNING & MODELING
                            </span>
                        </motion.div>

                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight mb-6">
                            Architectural &
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500"> 3D Visualization</span>
                        </h2>
                        <p className="text-zinc-650 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
                            Explore our precise CAD designs, interactive structural models, and 3D architectural blueprints. 
                            We visualize every steel frame, concrete column, and spatial layout long before construction begins.
                        </p>
                    </motion.div>

                    {/* Carousel Container */}
                    <div className="relative px-4">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full max-w-5xl mx-auto"
                        >
                            <CarouselContent className="-ml-4">
                                {plansData.map((plan, index) => (
                                    <CarouselItem key={plan.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={inView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            whileHover={{ y: -6 }}
                                            className="group bg-zinc-50 border border-zinc-200/80 hover:border-gold/40 hover:shadow-xl hover:shadow-zinc-200/40 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                                            onClick={() => setSelectedPlan(plan)}
                                        >
                                            <div className="aspect-[4/3] overflow-hidden bg-zinc-950 relative">
                                                <img
                                                    src={plan.image}
                                                    alt={plan.title}
                                                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <div className="flex items-center justify-center p-3 rounded-full bg-gold text-black shadow-lg">
                                                        <Maximize2 size={18} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-2 block">
                                                    {plan.category}
                                                </span>
                                                <h3 className="font-heading text-xl font-bold text-zinc-900 mb-3 group-hover:text-gold transition-colors duration-300">
                                                    {plan.title}
                                                </h3>
                                                <p className="text-zinc-500 text-xs font-body line-clamp-2 leading-relaxed mb-4">
                                                    {plan.description}
                                                </p>
                                                <div className="flex items-center gap-1 text-[11px] font-semibold text-royal-blue group-hover:text-gold transition-colors duration-300">
                                                    View Details & Specs <ArrowRight size={12} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            
                            {/* Navigation Arrows */}
                            <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 bg-white hover:bg-gold text-zinc-900 hover:text-black border-zinc-200 w-10 h-10 transition-all duration-300" />
                            <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 bg-white hover:bg-gold text-zinc-900 hover:text-black border-zinc-200 w-10 h-10 transition-all duration-300" />
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* Lightbox / Details Modal */}
            <AnimatePresence>
                {selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedPlan(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.93, opacity: 0, y: 25 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.93, opacity: 0, y: 25 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="relative w-full max-w-5xl bg-zinc-950 border border-gold/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPlan(null)}
                                className="absolute top-4 right-4 z-20 p-2.5 bg-black/75 hover:bg-gold text-white hover:text-black rounded-full transition-all duration-300 backdrop-blur-sm border border-white/5"
                                data-testid="plan-lightbox-close"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Image Side */}
                                <div className="bg-[#050505] relative aspect-[4/3] lg:aspect-auto min-h-[300px] lg:min-h-[500px] flex items-center justify-center">
                                    <img
                                        src={selectedPlan.image}
                                        alt={selectedPlan.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                </div>

                                {/* Content/Details Side */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-zinc-950 to-black text-white">
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-gold text-black text-[10px] font-body font-bold uppercase tracking-wider rounded-sm shadow-md">
                                            {selectedPlan.category}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                                        {selectedPlan.title}
                                    </h3>
                                    <div className="w-16 h-1 bg-gradient-to-r from-gold to-royal-blue mb-6 rounded-full" />
                                    <p className="text-white/70 text-base font-body font-light leading-relaxed mb-8">
                                        {selectedPlan.description}
                                    </p>

                                    {/* Tech Specs */}
                                    <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 text-left">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                                                <Cpu size={12} />
                                                <span>Software</span>
                                            </div>
                                            <p className="text-white font-medium text-sm leading-normal">{selectedPlan.details.software}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                                                <Ruler size={12} />
                                                <span>Scale</span>
                                            </div>
                                            <p className="text-white font-medium text-sm leading-normal">{selectedPlan.details.scale}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                                                <Layout size={12} />
                                                <span>Phase</span>
                                            </div>
                                            <p className="text-white font-medium text-sm leading-normal">{selectedPlan.details.phase}</p>
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
