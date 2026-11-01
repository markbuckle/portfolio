import React, { useEffect, useId, useRef, useState } from 'react';

/* Drawn upright, in the same 24-unit, 2-stroke line style as the rest of the
   icons: an ogive body, two swept fins and a short flame. The
   flame is its own path so it can flare and flicker. */
const RocketIcon = ({ size = 25 }) => {
  /* The sidebar icons' silver ramp, top to bottom across the whole icon. The
     id is per instance because duplicate SVG ids in one document collide. */
  const gradientId = `rocket-grad-${useId().replace(/:/g, '')}`;
  return (
  <svg
    className="rocket-icon"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={`url(#${gradientId})`}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="2" x2="0" y2="22">
        <stop offset="0%" stopColor="#f0f0f0" />
        <stop offset="50%" stopColor="#a0a0a0" />
        <stop offset="100%" stopColor="#5a5a5a" />
      </linearGradient>
    </defs>
    {/* Hull, fins and flame move as one on hover; the fins and flame then add
        their own moves — see "rocket" in App.css. */}
    <g className="rocket-hull">
      <path d="M12 2.5C14.8 5 16 8.3 16 12.5V16H8V12.5C8 8.3 9.2 5 12 2.5Z" />
      <path className="rocket-fin rocket-fin-l" d="M8 12.5 5 16v3l3-2" />
      <path className="rocket-fin rocket-fin-r" d="M16 12.5 19 16v3l-3-2" />
      <path className="rocket-flame" d="M10.5 19 12 22l1.5-3" />
    </g>
  </svg>
  );
};

/* Length of the rumble before lift-off — keep in step with
   `back-to-top-rumble` in App.css. */
const RUMBLE_MS = 1000;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/* Scrolls to the top on its own curve instead of the browser's: slow off the
   mark, quick through the middle, easing in at the top. The duration scales
   with the distance so a short trip isn't dragged out. `instant` is what
   stops App.css's `scroll-behavior: smooth` from re-smoothing every frame.
   Returns a cancel function. */
const takeOff = (onDone) => {
  const from = window.scrollY;
  const duration = Math.min(2200, 700 + from * 0.35);
  let frame;
  let start;

  const step = (now) => {
    if (start === undefined) start = now;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from * (1 - easeInOutCubic(t)), behavior: 'instant' });
    if (t < 1) frame = requestAnimationFrame(step);
    else onDone();
  };

  frame = requestAnimationFrame(step);

  /* A wheel, touch or key press means the visitor has taken the controls back. */
  const abort = () => {
    cancelAnimationFrame(frame);
    cleanup();
    onDone();
  };
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  const cleanup = () => events.forEach((e) => window.removeEventListener(e, abort));
  events.forEach((e) => window.addEventListener(e, abort, { passive: true }));

  return () => {
    cancelAnimationFrame(frame);
    cleanup();
  };
};

export const Footer = () => {
  /* null → 'rumble' (vibrating on the pad) → 'lift' (scrolling) → null */
  const [phase, setPhase] = useState(null);
  const timerRef = useRef(null);
  const cancelRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    if (cancelRef.current) cancelRef.current();
  }, []);

  const scrollToTop = () => {
    if (phase) return; // ignore clicks mid-launch
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    setPhase('rumble');
    timerRef.current = setTimeout(() => {
      setPhase('lift');
      cancelRef.current = takeOff(() => {
        cancelRef.current = null;
        setPhase(null);
      });
    }, RUMBLE_MS);
  };

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mark Buckle</p>
        <button
          className={`back-to-top${phase ? ` is-${phase}` : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <RocketIcon />
        </button>
      </div>
    </footer>
  );
};
