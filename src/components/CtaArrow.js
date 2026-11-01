import React from 'react';

/* Elbow: shaft turns the corner and points down. The box is 16x22 and the
   shaft sits at y=11 — dead centre — so that flex centring lands the
   horizontal run on the text's midline, leaving room below for the descent.

   The shaft and the head are separate elements so the hover/click animation
   can draw the one while the other travels along it. The head is drawn
   pointing right with its tip at the origin and positioned by transform; its
   resting pose (tip at the foot of the drop, rotated to point down) is set in
   App.css. The shaft's path and the keyframes there are the same geometry —
   change one and the other has to follow.

   Shared by the hero and About CTAs so the two stay identical by
   construction rather than by two copies of the same path data. */
export const CtaArrow = () => (
  <svg className="cta-arrow" viewBox="0 0 16 22" aria-hidden="true" focusable="false">
    <path className="cta-arrow-shaft" pathLength="1" d="M1 11h7a2 2 0 0 1 2 2v6" />
    <path className="cta-arrow-head" d="M-3 -3 0 0 -3 3" />
  </svg>
);
