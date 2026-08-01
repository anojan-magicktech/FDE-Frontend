import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenisInstance } from 'lib/lenis';
import { isInitialPageLoadReload, isOriginalLoadLocation } from 'lib/pageLoad';
import { Hero } from 'components/sections/Hero';
import { StatsSection } from 'components/sections/StatsSection';
import { About } from 'components/sections/About';
import { Services } from 'components/sections/Services';
import { ThreeDPlans } from 'components/sections/ThreeDPlans';
import { Projects } from 'components/sections/Projects';
import { Testimonials } from 'components/sections/Testimonials';
import { WhyChooseUs } from 'components/sections/WhyChooseUs';
import { Team } from 'components/sections/Team';
import { Contact } from 'components/sections/Contact';
import type { RouteLocationState } from 'types/nav';

interface HomeProps {
  onContactClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onContactClick }) => {
  const location = useLocation();
  const routeState = location.state as RouteLocationState | null;
  const hasTarget = Boolean(routeState?.scrollTo);
  const [isReady, setIsReady] = useState(!hasTarget);

  useLayoutEffect(() => {
    const targetSection = routeState?.scrollTo;

    // Only the entry the document actually loaded with counts as "reload" —
    // a later in-app navigation to Home with a scrollTo target (e.g. from
    // the Services/Projects pages) must still scroll to that section.
    const isPageReload = isInitialPageLoadReload && isOriginalLoadLocation(location.key);

    if (!targetSection || isPageReload) {
      setIsReady(true);
      return;
    }

    setIsReady(false);

    const scrollToTarget = () => {
      const section = document.getElementById(targetSection);

      if (!section) return;

      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(section, {
          offset: -80,
          immediate: true,
        });
      } else {
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo(0, y);
      }
    };

    const rafId = requestAnimationFrame(scrollToTarget);

    const timer1 = setTimeout(scrollToTarget, 150);
    const timer2 = setTimeout(scrollToTarget, 400);

    const showTimer = setTimeout(() => {
      scrollToTarget();
      setIsReady(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 500);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(showTimer);
    };
  }, [routeState, location.key]);

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
