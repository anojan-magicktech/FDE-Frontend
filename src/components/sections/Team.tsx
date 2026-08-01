import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { getImageUrl } from 'services/api';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchTeamMembers } from 'store/teamSlice';
import { useScrollReveal, revealVariants } from 'hooks/useScrollReveal';

export const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const teamMembers = useAppSelector((state) => state.team.members);
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  return (
    <section
      id="team"
      className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-zinc-200/80"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-gold/5 rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-royal-blue/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={revealVariants.fadeUp}
          initial="hidden"
          animate={isRevealed ? 'visible' : 'hidden'}
          className="text-center mb-16 transform-gpu"
        >
          <motion.div
            variants={revealVariants.fadeDown}
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
            className="inline-flex items-center px-4 py-1.5 border border-royal-blue/30 bg-royal-blue/5 rounded-full mb-6"
          >
            <span className="text-royal-blue-bright text-xs tracking-[0.2em] font-body font-semibold uppercase">
              OUR TEAM
            </span>
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-zinc-950">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-400">Expert Team</span>
          </h2>
          <p className="text-zinc-650 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
            The visionary minds dedicated to bringing your architectural dreams to life with precision and creativity.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={revealVariants.staggerContainer}
          initial="hidden"
          animate={isRevealed ? 'visible' : 'hidden'}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              variants={revealVariants.staggerItemScale}
              whileHover={{ y: -6 }}
              className="group relative transform-gpu"
            >
              <div className="relative overflow-hidden bg-zinc-50 border border-zinc-200/80 hover:border-gold/40 hover:shadow-xl hover:shadow-zinc-200/40 transition-all duration-300 h-full p-8 flex flex-col items-center text-center rounded-xl">
                {/* Avatar Placeholder or Image */}
                <div className="w-32 h-32 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/15 to-royal-blue/15 rounded-full" />
                  <div className="absolute inset-1 flex items-center justify-center rounded-full border border-zinc-200/85 group-hover:border-gold transition-colors duration-300 bg-white overflow-hidden">
                    {getImageUrl(member.profile_image) ? (
                      <img
                        src={getImageUrl(member.profile_image)}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <User size={40} className="text-zinc-400 group-hover:text-gold transition-colors duration-300" />
                    )}
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-zinc-900 mb-1 group-hover:text-gold transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="text-royal-blue-bright text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 font-body">
                  {member.role || member.posting}
                </div>

                {(member.education || member.experience) && (
                  <div className="mb-4 text-xs text-zinc-500 font-light space-y-1 font-body">
                    {member.education && <div>{member.education}</div>}
                    {member.experience && <div>{member.experience}</div>}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
