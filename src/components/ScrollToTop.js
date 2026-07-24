import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Always stop browser from restoring old scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isPageReload = navigationEntry?.type === 'reload';

    const scrollTopNow = () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    // On refresh/reload: force top multiple times because browser/Lenis may restore late
    if (isPageReload) {
      scrollTopNow();

      requestAnimationFrame(scrollTopNow);

      const timer1 = setTimeout(scrollTopNow, 50);
      const timer2 = setTimeout(scrollTopNow, 150);
      const timer3 = setTimeout(scrollTopNow, 400);

      window.history.replaceState({}, document.title, window.location.pathname);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    // For navbar section navigation, don't touch it.
    // Home.js handles your correct section jump + loader.
    if (location.state?.scrollTo) {
      return;
    }

    // Normal route change
    scrollTopNow();
  }, [location.pathname, location.state]);

  return null;
}