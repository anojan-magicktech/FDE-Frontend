import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenisInstance } from 'lib/lenis';
import { isInitialPageLoadReload, isOriginalLoadLocation } from 'lib/pageLoad';
import { readSavedScrollY } from 'lib/scrollMemory';
import type { RouteLocationState } from 'types/nav';

export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Stop browser from restoring old scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Only the very first commit on the entry the document actually loaded
    // with counts as "reload" — later in-app navigations (even after an
    // earlier reload this session) must NOT be treated as one.
    const isPageReload = isInitialPageLoadReload && isOriginalLoadLocation(location.key);

    // A single smooth animated scroll — no repeated/competing calls, which
    // is what caused the visible "flicker" (each retry snapped/restarted
    // the scroll rather than letting one animation play out).
    const scrollTopSmooth = () => {
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (isPageReload) {
      // Jump invisibly (before paint) to where we actually were, then
      // animate from there up to the top — otherwise there's nothing to
      // visibly scroll away from (we start at 0 already).
      const savedY = readSavedScrollY();
      if (savedY > 0) {
        window.scrollTo(0, savedY);
      }
      scrollTopSmooth();
      window.history.replaceState({}, document.title, window.location.pathname);
      return undefined;
    }

    // For navbar section navigation, Home.tsx handles section jump
    if ((location.state as RouteLocationState | null)?.scrollTo) {
      return undefined;
    }

    // Normal route change to a different page — snap to top immediately.
    // No visible animation here: you're on a new page, not watching a
    // scroll transition from wherever the previous page happened to be.
    window.scrollTo(0, 0);
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    return undefined;
  }, [location.pathname, location.state, location.key]);

  return null;
}
