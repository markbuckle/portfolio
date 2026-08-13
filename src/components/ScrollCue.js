import React, { useId } from 'react';
import { useTraceFire, scrollToHash, isPlainClick } from '../hooks/useTraceFire';

const CHEVRON = 'M5 9.5 12 16 19 9.5';

/* Box trimmed to the stroke's ink bounds, round caps included, so the reveal
   window maps exactly onto the arrow. With a plain 0 0 24 24 box the sweep
   spends its first fifth crossing empty space before it reaches the tip. */
const VIEW_BOX = '4.2 4.95 15.6 15.6';

const Chevron = ({ className, stroke, gradient }) => (
  <svg className={className} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
    {gradient && (
      <defs>
        <linearGradient id={gradient} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5a0" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
    )}
    <path d={CHEVRON} stroke={stroke} />
  </svg>
);

/*
  Down-chevron cue that bobs gently at rest. On click, colour sweeps along the
  arrow from left to right; the page only moves to the next section once the
  arrow is fully lit — same deferred-navigation contract as the pill CTAs.
*/
export const ScrollCue = ({ to, label = 'Scroll to the next section' }) => {
  const { firing, fire, handleAnimationEnd } = useTraceFire('cue-fill');
  /* Per-instance gradient id — there is more than one cue on the page, and
     duplicate SVG ids in one document collide. Colons are stripped because
     useId's output embeds them. */
  const gradientId = `cue-grad-${useId().replace(/:/g, '')}`;

  const handleClick = (e) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    fire(() => scrollToHash(to));
  };

  return (
    <a
      href={to}
      className={`scroll-cue${firing ? ' is-firing' : ''}`}
      aria-label={label}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* One wrapper carries the bob so both copies stay in registration. */}
      <span className="scroll-cue-bob">
        <Chevron className="scroll-cue-chevron scroll-cue-chevron--base" />
        {/* Lit copy under a window that opens left to right. */}
        <span className="scroll-cue-lit" aria-hidden="true">
          <Chevron
            className="scroll-cue-chevron scroll-cue-chevron--lit"
            stroke={`url(#${gradientId})`}
            gradient={gradientId}
          />
        </span>
      </span>
    </a>
  );
};
