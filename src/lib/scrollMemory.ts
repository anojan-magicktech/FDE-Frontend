const KEY = 'fde:lastScrollY';

/**
 * Persists scroll position across a hard reload (sessionStorage survives it,
 * unlike component/module state). Used so a refresh can visibly animate
 * from where you actually were back up to the top, instead of either
 * teleporting instantly or having nothing to animate from because the
 * position was never known.
 */
export function saveScrollY(y: number) {
  try {
    sessionStorage.setItem(KEY, String(Math.round(y)));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — safe to ignore
  }
}

export function readSavedScrollY(): number {
  try {
    const raw = sessionStorage.getItem(KEY);
    const value = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}
