const navigationEntry = performance.getEntriesByType('navigation')[0] as
  | PerformanceNavigationTiming
  | undefined;

/**
 * Whether the browser document itself was loaded via a reload. This value
 * is fixed for the whole document lifetime — it does NOT reflect whether
 * the current in-app route is "fresh", since client-side navigations never
 * create a new navigation entry.
 */
export const isInitialPageLoadReload = navigationEntry?.type === 'reload';

let initialLocationKey: string | null = null;

/**
 * Captures the history-entry key the app booted with. Comparing a later
 * location's key against this tells you whether you're still on the exact
 * entry the document was loaded with, vs. having since navigated away
 * (even back to the same pathname, which gets a new key).
 */
export function isOriginalLoadLocation(locationKey: string): boolean {
  if (initialLocationKey === null) {
    initialLocationKey = locationKey;
  }
  return locationKey === initialLocationKey;
}
