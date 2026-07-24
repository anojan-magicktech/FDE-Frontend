import React from 'react';
import { motion } from 'framer-motion';

export const PageHero = ({ title, subtitle, backgroundImage }) => {
    return (
        <section className="relative h-[55vh] min-h-[450px] w-full overflow-hidden flex items-center justify-center bg-[#050505]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
                style={{
                    backgroundImage: backgroundImage || "url('https://images.unsplash.com/photo-1761437855598-a84c2849dc6a?auto=format&fit=crop&w=1600&q=75')",
                    filter: 'contrast(1.1) brightness(0.8)',
                }}
            />

            {/* Premium luxury vignette gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#050505]/75 to-[#050505]" />
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

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                >
                    <motion.div
                        className="inline-flex items-center px-4 py-1.5 border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full shadow-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-gold text-xs tracking-[0.2em] font-body font-semibold uppercase">
                            {subtitle || 'Excellence in Engineering'}
                        </span>
                    </motion.div>

                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                        {title}
                    </h1>
                </motion.div>
            </div>
        </section>
    );
};
