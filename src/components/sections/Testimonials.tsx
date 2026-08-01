import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Twitter, Linkedin, Youtube, Facebook, MapPin, Instagram } from 'lucide-react';
import { getImageUrl } from 'services/api';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchTestimonials } from 'store/testimonialsSlice';
import type { Testimonial } from 'types/testimonial';
import { useScrollReveal, revealVariants } from 'hooks/useScrollReveal';

interface ReviewCardProps {
  review: Testimonial;
}

const getPlatformIcon = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case 'twitter':
      return <Twitter size={14} className="text-[#1DA1F2]" />;
    case 'linkedin':
      return <Linkedin size={14} className="text-[#0077b5]" />;
    case 'youtube':
      return <Youtube size={14} className="text-[#FF0000]" />;
    case 'facebook':
      return <Facebook size={14} className="text-[#1877F2]" />;
    case 'instagram':
      return <Instagram size={14} className="text-[#E1306C]" />;
    case 'google':
      return <span className="text-xs font-bold text-blue-500">G</span>;
    case 'yelp':
      return <span className="text-xs font-bold text-red-600">Y</span>;
    default:
      return <MapPin size={14} className="text-gold" />;
  }
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] p-6 mx-4 bg-zinc-50 border border-zinc-200/80 hover:border-gold/40 rounded-xl shadow-md hover:shadow-zinc-200/40 transition-all duration-300 relative overflow-hidden group snap-center transform-gpu">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-royal-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-start mb-6">
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-200/85 group-hover:border-gold transition-colors duration-300 bg-zinc-100">
            {getImageUrl(review.photo) ? (
              <img src={getImageUrl(review.photo)} alt={review.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">
                {review.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-zinc-200/80 flex items-center justify-center">
            {getPlatformIcon(review.platform)}
          </div>
        </div>
        <Quote className="text-gold transition-colors duration-300" size={36} strokeWidth={1.5} />
      </div>

      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < review.rating ? 'text-gold fill-gold' : 'text-zinc-300'}`}
          />
        ))}
      </div>

      <p className="text-zinc-650 font-body font-light text-sm sm:text-base leading-relaxed mb-6 italic line-clamp-4 h-[6rem]">
        "{review.description}"
      </p>

      <div className="border-t border-zinc-200/80 pt-4 mt-auto">
        <h4 className="font-heading text-lg font-bold text-zinc-900 group-hover:text-gold transition-colors">
          {review.name}
        </h4>
        {review.role && <p className="text-zinc-500 text-xs font-body mt-0.5">{review.role}</p>}
      </div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.testimonials.items);
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // Ensure we have enough items for a smooth marquee loop
  const getMarqueeItems = (): Testimonial[] => {
    if (reviews.length === 0) return [];
    let items = [...reviews];
    while (items.length < 6) {
      items = [...items, ...reviews];
    }
    return [...items, ...items];
  };

  const marqueeItems = getMarqueeItems();
  const duration = Math.max(40, marqueeItems.length * 3.5);

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-white overflow-hidden relative border-t border-zinc-200/80"
      ref={ref}
      data-testid="testimonials-section"
    >
      {/* Background elements */}
      <div className="absolute left-10 top-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <motion.div
          variants={revealVariants.fadeUp}
          initial="hidden"
          animate={isRevealed ? 'visible' : 'hidden'}
          className="text-center transform-gpu"
        >
          <motion.div
            variants={revealVariants.fadeDown}
            initial="hidden"
            animate={isRevealed ? 'visible' : 'hidden'}
            className="inline-flex items-center px-4 py-1.5 border border-royal-blue/30 bg-royal-blue/5 rounded-full mb-6"
          >
            <span className="text-royal-blue-bright text-xs tracking-[0.2em] font-body font-semibold uppercase">
              TESTIMONIALS
            </span>
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight mb-6">
            Client
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-400"> Testimonials</span>
          </h2>
          <p className="text-zinc-650 text-lg sm:text-xl max-w-3xl mx-auto font-body font-light">
            Don't just take our word for it. Hear what our satisfied clients have to say about
            their experience working with Future Design Engineering.
          </p>
        </motion.div>
      </div>

      <style>{`
    @keyframes marquee {
        0% {
            transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(-50%, 0, 0);
        }
    }

    .animate-marquee {
        animation: marquee ${duration}s linear infinite;
        will-change: transform;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
    }

    .hover-pause:hover .animate-marquee {
        animation-play-state: paused;
    }
`}</style>

      <motion.div
        variants={revealVariants.fadeUp}
        initial="hidden"
        animate={isRevealed ? 'visible' : 'hidden'}
        className="relative w-full hover-pause z-10 transform-gpu"
      >
        {/* Gradient Masks for Fade Effect - matched to white background */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white via-white/75 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white via-white/75 to-transparent pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee transform-gpu">
          {marqueeItems.map((review, index) => (
            <ReviewCard key={`${review.id || 'review'}-${index}`} review={review} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
