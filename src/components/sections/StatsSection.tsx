import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Award, Users, CheckCircle, type LucideIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchCompletedProjectCount } from 'store/statsSlice';

const currentYear = new Date().getFullYear();
const startYear = 2024;
const yearsExperience = currentYear - startYear;

interface CounterProps {
  target: number;
  suffix: string;
  inView: boolean;
}

const Counter: React.FC<CounterProps> = ({ target, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | undefined;
    const duration = 1000; // Optimized duration to prevent CPU thrashing on scroll
    let animationFrameId: number | undefined;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    dispatch(fetchCompletedProjectCount());
  }, [dispatch]);

  const stats: Stat[] = [
    {
      icon: Building2,
      number: projectCount,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group p-6 rounded-xl bg-gradient-to-b from-[#0c0c0c] to-[#080808] border border-white/5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
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
                  <Counter target={stat.number} suffix={stat.suffix} inView={inView} />
                </div>

                {/* Description */}
                <h3 className="font-heading text-lg font-bold text-white mb-2 tracking-wide">{stat.label}</h3>
                <p className="text-white/50 text-xs sm:text-sm font-body font-light leading-relaxed">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
