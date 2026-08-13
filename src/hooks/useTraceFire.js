import { useCallback, useEffect, useRef, useState } from 'react';

/*
  Drives the CTA click sequence: the gradient trace runs the button's
  perimeter, drains into the label, and only then does the caller act
  (navigate, submit, …). The wait keys off the label's `animationend` rather
  than a hardcoded delay, so the timings in App.css (--trace-dur / --fill-dur)
  stay the single source of truth — retune them there and this follows.
*/

/* The last step of the sequence — see @keyframes trace-fill in App.css. */
const FINAL_ANIMATION = 'trace-fill';

/* animationend never lands if the browser drops the animation — a throttled
   background tab, a node replaced mid-flight. Without this the click would be
   swallowed and the button would sit there dead. Comfortably past trace+fill. */
const FAILSAFE_MS = 3200;

export const useTraceFire = () => {
  const [firing, setFiring] = useState(false);
  /* Mirrors `firing` for the callbacks — state would be stale inside them. */
  const firingRef = useRef(false);
  const timerRef = useRef(null);
  const onCompleteRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const finish = useCallback(() => {
    if (!firingRef.current) return;
    clearTimeout(timerRef.current);
    firingRef.current = false;
    setFiring(false);
    const done = onCompleteRef.current;
    onCompleteRef.current = null;
    if (done) done();
  }, []);

  /* Call on click. `onComplete` runs once the border has circled the button
     and the light has washed through the label. */
  const fire = useCallback((onComplete) => {
    /* Nothing to wait on when the animation is suppressed — act at once. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete();
      return;
    }
    if (firingRef.current) return; // ignore repeat clicks mid-sequence
    firingRef.current = true;
    onCompleteRef.current = onComplete;
    setFiring(true);
    timerRef.current = setTimeout(finish, FAILSAFE_MS);
  }, [finish]);

  /* Goes on the button root. The perimeter rect's animation bubbles up here
     too, hence the name check — only the label's fill ends the sequence. */
  const handleAnimationEnd = useCallback((e) => {
    if (e.animationName === FINAL_ANIMATION) finish();
  }, [finish]);

  return { firing, fire, handleAnimationEnd };
};

/* Same-page hash navigation, minus the anchor's instant jump. Bare
   `scrollIntoView()` follows the CSS `scroll-behavior`, which App.css already
   flips to `auto` under prefers-reduced-motion. */
export const scrollToHash = (hash) => {
  const target = document.querySelector(hash);
  if (!target) return;
  target.scrollIntoView();
  /* Keep the URL in step with the view — replace, not push, so the trace
     doesn't stack a history entry per click. */
  window.history.replaceState(null, '', hash);
};

/* Left-click without modifiers is the only case we hijack — ctrl/cmd/shift
   clicks should still open the section the way the browser intends. */
export const isPlainClick = (e) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
