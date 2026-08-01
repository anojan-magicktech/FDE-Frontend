import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Users, CheckCircle, type LucideIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCompletedProjectCount } from 'store/statsSlice';
import CountUp from 'components/ui/CountUp';
import { useScrollReveal, revealVariants } from 'hooks/useScrollReveal';

const currentYear = new Date().getFullYear();
const startYear = 2024;
const yearsExperience = Math.max(2, currentYear - startYear);

interface Stat {
  icon: LucideIcon;
  number: number;
  suffix: string;
  label: string;
  description: string;
}

export const StatsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const projectCount = useAppSelector((state) => state.stats.projectCount);
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.15 });

  useEffect(() => {
    dispatch(fetchCompletedProjectCount());
  }, [dispatch]);

  const displayProjectCount = projectCount > 0 ? projectCount : 500;

  const stats: Stat[] = [
    {
      icon: Building2,
      number: displayProjectCount,
      suffix: '+',
      label: 'Completed Projects',
      description: 'Delivered across Sri Lanka',
    },
    {
      icon: Users,
      number: 5,
      suffix: '+',
      label: 'Expert Engineers',
      description: 'Experienced professionals',
    },
    {
      icon: Award,
      number: yearsExperience,
      suffix: '+',
      label: 'Years Experience',
      description: 'Building structural excellence',
    },
    {
      icon: CheckCircle,
      number: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Uncompromising trust and quality',
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-[#050505] relative overflow-hidden border-y border-white/5"
      ref={ref}
      data-testid="stats-section"
    >
      {/* Premium subtle grids pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={revealVariants.staggerContainer}
          initial="hidden"
          animate={isRevealed ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={revealVariants.staggerItemScale}
                className="text-center group p-6 rounded-xl bg-gradient-to-b from-[#0c0c0c] to-[#080808] border border-white/5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 transform-gpu"
                data-testid={`stat-card-${index}`}
              >
                {/* Icon Wrapper */}
                <div className="mb-6 inline-flex p-5 rounded-lg bg-zinc-900 border border-white/5 group-hover:border-royal-blue group-hover:bg-royal-blue/10 transition-all duration-300">
                  <Icon
                    className="text-gold group-hover:scale-105 transition-transform duration-300"
                    size={32}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Counter */}
                <div className="font-heading text-4xl sm:text-5xl font-bold text-gold mb-2 tracking-tight">
                  <CountUp
                    to={stat.number}
                    suffix={stat.suffix}
                    duration={1.8}
                    delay={index * 0.15}
                    startWhen={isRevealed}
                  />
                </div>

                {/* Description */}
                <h3 className="font-heading text-lg font-bold text-white mb-2 tracking-wide">{stat.label}</h3>
                <p className="text-white/60 text-xs sm:text-sm font-body font-light leading-relaxed">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
