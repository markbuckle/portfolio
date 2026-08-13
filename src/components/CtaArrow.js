import React from 'react';

/* Elbow: shaft turns the corner and points down. The box is 16x22 and the
   shaft sits at y=11 — dead centre — so that flex centring lands the
   horizontal run on the text's midline, leaving room below for the descent.

   Shared by the hero and About CTAs so the two stay identical by
   construction rather than by two copies of the same path data. */
const ELBOW = ['M1 11h7a2 2 0 0 1 2 2v5', 'M7 16 10 19 13 16'];

export const CtaArrow = () => (
  <svg className="cta-arrow" viewBox="0 0 16 22" aria-hidden="true" focusable="false">
    {ELBOW.map((d) => <path key={d} d={d} />)}
  </svg>
);
