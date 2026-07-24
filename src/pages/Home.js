import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '@/components/Hero';
import { StatsSection } from '@/components/StatsSection';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { ThreeDPlans } from '@/components/ThreeDPlans';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Team } from '@/components/Team';
import { Contact } from '@/components/Contact';

export const Home = ({ onContactClick }) => {
  const location = useLocation();
  const hasTarget = Boolean(location.state?.scrollTo);
  const [isReady, setIsReady] = useState(!hasTarget);

  useLayoutEffect(() => {
    const targetSection = location.state?.scrollTo;

    if (!targetSection) {
      setIsReady(true);
      return;
    }

    setIsReady(false);

    const scrollToTarget = () => {
      const section = document.getElementById(targetSection);

      if (!section) return;

      if (window.lenis) {
        window.lenis.scrollTo(section, {
          offset: -80,
          immediate: true,
        });
      } else {
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo(0, y);
      }
    };

    requestAnimationFrame(scrollToTarget);

    const timer1 = setTimeout(scrollToTarget, 150);
    const timer2 = setTimeout(scrollToTarget, 400);

    const showTimer = setTimeout(() => {
      scrollToTarget();
      setIsReady(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(showTimer);
    };
  }, [location.state]);

return (
  <>
    <div
      className={`transition-opacity duration-200 ${
        isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Hero onContactClick={onContactClick} />
      <StatsSection />
      <About />
      <Services isPreview={true} />
      <ThreeDPlans />
      <Projects isPreview={true} />
      <Testimonials />
      <WhyChooseUs />
      <Team />
      <Contact onContactClick={onContactClick} />
    </div>

    {!isReady && (
      <div className="fixed inset-x-0 top-16 lg:top-20 bottom-0 z-40 flex items-center justify-center pointer-events-none bg-transparent">
        <div className="relative w-16 h-16">
          {/* Soft outer glow */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gold/20 to-royal-blue/20 blur-md" />

          {/* Base ring */}
          <div className="absolute inset-0 rounded-full border-4 border-zinc-300/30" />

          {/* Spinning gold/blue ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-royal-blue animate-spin" />

          {/* Center dot */}
          <div className="absolute inset-[22px] rounded-full bg-gradient-to-r from-gold to-royal-blue" />
        </div>
      </div>
    )}
  </>
);
};