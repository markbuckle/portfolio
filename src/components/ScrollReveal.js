import React, { useEffect, useRef } from 'react';
import { cubicBezier, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/*
  Scroll-linked reveal. Content fades and lifts into place as it climbs the
  screen, holds while it sits there, then slips back out over the top edge.

  Nothing here has a duration — opacity and offset are read off the element's
  position on screen, so the reveal tracks the wheel rather than firing a fixed
  animation the instant the element clips an edge. Items therefore resolve in
  the order they climb, so a label / title / body stack cascades on its own, and
  the whole thing is reversible in both directions.

  Renders as whatever tag it is given rather than wrapping one, because the CSS
  leans on real sibling relationships in places — `.about-bio + .about-bio`
  would stop matching the moment each paragraph gained a wrapper div.
*/

/*
  The whole journey as one scroll range with four stops. Progress reads
  0 / ⅓ / ⅔ / 1 at each in turn:

    0   the element's top edge touches the bottom of the screen
    ⅓   that top edge has climbed to 65% of the way up — arrived
    ⅔   the bottom edge drops to 10% from the top — starting to leave
    1   the bottom edge clears the top of the screen — gone

  Both thresholds are set by the same constraint. Sections are a viewport tall
  and every arrow and CTA lands a section's top edge against the top of the
  screen, so on arrival a section's content is spread across roughly the top two
  thirds: the label lands about 8-12% down, the lowest element (About's CTA row)
  about 63%. Arriving at 65% means the bottom of that spread is resolved;
  leaving at 10% means the top of it has not started dissolving yet. Widen
  either and something in a section you just navigated to greets you
  half-transparent — which is a bug, not an effect.

  That caps the exit at a short band, and it is geometry rather than taste: a
  header sits ~10% down on arrival and is gone by 0%, so there is only ever
  ~10vh of screen for it to dissolve across. Taller content (the case study
  card, the skills grid) keys off its own bottom edge and so gets the full band
  as its tail clears the top, which is the moment that actually reads.

  One tracker with four stops rather than two trackers with two each: every
  tracked element re-walks its offsetParent chain on each scroll frame, so a
  second tracker would double that cost across ~20 elements for nothing.
*/
const OFFSET = ['start end', 'start 65%', 'end 10%', 'end start'];
const ARRIVED = 1 / 3;
const LEAVING = 2 / 3;

/* Opacity fills before the lift finishes, so an element reads as settled while
   its last pixels of travel run out instead of arriving and then brightening. */
const FADE_IN_BY = ARRIVED * 0.85;

/* …and holds into the first quarter of the exit band, which is the last of the
   margin against a just-landed header: full opacity survives down to a bottom
   edge 7.5% from the top, under every landed-header position from a 4rem-padded
   phone (8%) to a 6rem-padded desktop (13%). */
const FADE_OUT_FROM = LEAVING + 0.25 * (1 - LEAVING);

/* Rises under a decelerate and leaves under an accelerate, so it settles on
   arrival and slips away on exit rather than easing the same at both ends. The
   middle segment holds a constant, so its easing never applies. */
const EASE_IN = cubicBezier(0.33, 1, 0.68, 1);
const EASE_OUT = cubicBezier(0.32, 0, 0.67, 0);
const LINEAR = (v) => v;

/* Opacity gets a gentler in-out of its own rather than tracking the offset's
   curve — it lingers faint on the way in and lets go late on the way out, which
   is what reads as a dissolve rather than a dimmer switch. */
const FADE_CURVE = cubicBezier(0.4, 0, 0.6, 1);

/* Overdamped — this is smoothing, not bounce. Without it the reveal is welded
   rigidly to scroll position, which reads as stepped rather than fluid because
   a wheel notch is a discrete jump of ~100px. The spring rounds those steps off
   and adds a short settle once the scroll stops, which is most of what
   separates this from a tween. */
const SPRING = { stiffness: 200, damping: 24, mass: 0.4, restDelta: 0.0005 };

export const ScrollReveal = ({
  as = 'div',
  /* Fraction of the *entry* window to sit out before starting, for deepening a
     cascade beyond what the elements' own spacing gives — a label and the title
     35px under it are only ~10% of the window apart on their own. Keep it well
     under FADE_IN_BY; the gap between the two is the whole fade. */
  delay = 0,
  distance = 32,
  style,
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: OFFSET });
  const progress = useSpring(scrollYProgress, SPRING);

  /* useScroll takes its first measurement in a layout effect and useSpring
     subscribes in a later one, so the spring misses that first value and would
     sit at 0 until something scrolled — anything already on screen at load (a
     refresh partway down the page) stuck invisible. Jump rather than set: set
     would spring up from 0, flashing content that is meant to be long gone over
     the top. */
  useEffect(() => { progress.jump(scrollYProgress.get()); }, [progress, scrollYProgress]);

  const opacity = useTransform(
    progress,
    [delay * ARRIVED, FADE_IN_BY, FADE_OUT_FROM, 1],
    [0, 1, 1, 0],
    { ease: [FADE_CURVE, LINEAR, FADE_CURVE] }
  );
  const y = useTransform(
    progress,
    [delay * ARRIVED, ARRIVED, LEAVING, 1],
    [distance, 0, 0, -distance * 0.6],
    { ease: [EASE_IN, LINEAR, EASE_OUT] }
  );

  const Tag = motion[as];

  return (
    <Tag ref={ref} style={reducedMotion ? style : { ...style, opacity, y }} {...rest}>
      {children}
    </Tag>
  );
};
