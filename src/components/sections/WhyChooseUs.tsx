import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Shield, Users, Clock, type LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Award,
    title: 'Award-Winning Design',
    description:
      'Recognized for architectural excellence and innovative engineering solutions across multiple industry awards.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description:
      'Rigorous quality control at every stage ensures structures that meet and exceed international standards.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description:
      'Seasoned engineers, architects, and craftsmen with decades of combined experience in complex projects.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'Proven track record of completing projects on schedule without compromising quality or safety standards.',
  },
];

export const WhyChooseUs: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      id="why-choose-us"
      className="py-24 sm:py-32 bg-[#050505] text-white relative overflow-hidden border-t border-white/5"
      ref={ref}
      data-testid="why-choose-us-section"
    >
      {/* Subtle lines pattern background */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 border border-royal-blue/30 bg-royal-blue/5 rounded-full mb-6">
            <span className="text-royal-blue-bright text-xs tracking-[0.2em] font-body font-semibold uppercase">
              OUR VALUE
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
            Why Choose
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500"> Future Design Engineering</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
            We combine decades of engineering expertise with cutting-edge construction technology to
            deliver exceptional results that stand the test of time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative p-6 rounded-xl bg-[#0c0c0c] border border-white/5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 text-center transform-gpu"
                data-testid={`feature-${index}`}
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-royal-blue to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="mb-6 inline-flex p-5 rounded-lg bg-[#111111] border border-white/10 group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300">
                  <Icon
                    className="text-gold group-hover:scale-103 transition-transform duration-300"
                    size={32}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
