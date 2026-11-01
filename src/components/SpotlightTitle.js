import React, { useId, useState } from 'react';

/* Localised white spotlight for a title, after the footer wordmark in the
   Dispatch project. Four stacked layers share one SVG so they register exactly:

     base     the dim letters at rest
     inner    a soft white band just inside each letter's edge
     edge     a 1px outline, with a faint fill
     hotspot  a tighter, brighter version of the inner band right under the cursor

   The last three sit under radial masks centred on the pointer (--spot-x/-y,
   set straight on the element so a mouse move never re-renders). Nothing glows
   outside a letter. The title is real SVG <text> rather than paths, so the
   font, size and tracking all inherit from CSS and any title works.

   Every lit layer is derived from the letters' filled silhouette by a filter,
   never by stroking the text. A font draws some letters from overlapping
   contours (the crossbar over the stem of a "t"), and a stroke outlines each
   contour separately — so the overlaps showed up as lines crossing inside the
   letter. A filter sees only the merged shape, so there is nothing to cross.

   Blur and outline widths are in px — an SVG filter can't read a CSS variable
   — and are sized for the 2rem title; the mask radii live in App.css. */
const INNER_GLOW_BLUR = 2.2;
const INNER_GLOW_OPACITY = 0.4;
const EDGE_WIDTH = 0.6;
const HOTSPOT_BLUR = 1.4;
const HOTSPOT_OPACITY = 1;

/* The same glyphs every layer draws. Centred in the svg, which fills the
   wrapper — and the wrapper is sized by the invisible HTML copy of the title. */
const Glyphs = ({ text, className }) => (
  <text
    className={className}
    x="50%"
    y="50%"
    textAnchor="middle"
    dominantBaseline="central"
  >
    {text}
  </text>
);

export const SpotlightTitle = ({ text, className = '' }) => {
  const [isLit, setIsLit] = useState(false);
  const innerGlowId = useId();
  const edgeId = useId();
  const hotspotId = useId();

  const moveSpotlight = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - bounds.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - bounds.top}px`);
  };

  return (
    <span
      className={`spotlight-title ${className}`.trim()}
      onPointerEnter={(e) => {
        moveSpotlight(e);
        setIsLit(true);
      }}
      onPointerMove={moveSpotlight}
      onPointerLeave={() => setIsLit(false)}
      onPointerCancel={() => setIsLit(false)}
    >
      {/* Invisible, but it is what sizes the box and what a screen reader or a
          text selection finds. */}
      <span className="spotlight-title-text">{text}</span>
      <svg className="spotlight-title-svg" aria-hidden="true" focusable="false">
        <Glyphs text={text} className="spotlight-title-base" />
      </svg>

      <span className={`spotlight-title-lit${isLit ? ' is-lit' : ''}`} aria-hidden="true">
        {/* The masks go on the svg elements themselves — a mask on a group
            inside one is unreliable in Safari, which is also why the hotspot
            gets its own svg. */}
        <svg className="spotlight-title-svg spotlight-title-mask" focusable="false">
          <defs>
            {/* Explicit regions throughout: the default 10% margin is a few px
                at this size, which would clip the blur short. */}
            {/* Inside edge: the letter minus a blurred copy of itself, which
                leaves a band that is brightest at the edge and fades inwards. */}
            <filter id={innerGlowId} x="-10%" y="-60%" width="120%" height="220%">
              <feGaussianBlur in="SourceAlpha" stdDeviation={INNER_GLOW_BLUR} result="soft" />
              <feComposite in="SourceAlpha" in2="soft" operator="out" result="band" />
              <feFlood floodColor="#fff" floodOpacity={INNER_GLOW_OPACITY} />
              <feComposite in2="band" operator="in" />
            </filter>
            {/* Outline: the letter minus a slightly shrunk copy of itself. */}
            <filter id={edgeId} x="-10%" y="-60%" width="120%" height="220%">
              <feMorphology in="SourceAlpha" operator="erode" radius={EDGE_WIDTH} result="core" />
              <feComposite in="SourceAlpha" in2="core" operator="out" result="rim" />
              <feFlood style={{ floodColor: 'var(--text-primary)' }} />
              <feComposite in2="rim" operator="in" />
            </filter>
            <filter id={hotspotId} x="-10%" y="-60%" width="120%" height="220%">
              <feGaussianBlur in="SourceAlpha" stdDeviation={HOTSPOT_BLUR} result="soft" />
              <feComposite in="SourceAlpha" in2="soft" operator="out" result="band" />
              <feFlood floodColor="#fff" floodOpacity={HOTSPOT_OPACITY} />
              <feComposite in2="band" operator="in" />
            </filter>
          </defs>
          <Glyphs text={text} className="spotlight-title-wash" />
          <g filter={`url(#${innerGlowId})`}>
            <Glyphs text={text} className="spotlight-title-source" />
          </g>
          <g filter={`url(#${edgeId})`}>
            <Glyphs text={text} className="spotlight-title-source" />
          </g>
        </svg>
        <svg
          className="spotlight-title-svg spotlight-title-mask spotlight-title-mask--hotspot"
          focusable="false"
        >
          <g filter={`url(#${hotspotId})`}>
            <Glyphs text={text} className="spotlight-title-source" />
          </g>
        </svg>
      </span>
    </span>
  );
};
