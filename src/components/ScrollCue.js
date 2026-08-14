import React, { useId, useState } from 'react';
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
  Two-way cue that bobs gently at rest. On click, colour sweeps along the arrow
  from left to right; once it has had a run at it the arrow turns half a circle
  anticlockwise, and the page moves only when that turn finishes — the same
  deferred-navigation contract as the pill CTAs.

  The turn is not undone. The arrow is left pointing back the way it came, so
  the cue reads as "return" for the section you just landed in, and a second
  click carries on round another half turn — always anticlockwise, never an
  unwind — and scrolls to `up` instead. Which way it currently points is the
  whole of its state; the timings live on --cue-* in App.css.
*/
export const ScrollCue = ({
  to,
  up,
  label = 'Scroll to the next section',
  upLabel = 'Scroll back to the previous section',
}) => {
  const [flipped, setFlipped] = useState(false);
  /* Each direction turns from a different resting angle, so they need separate
     keyframes — and the hook has to wait on whichever one this click will run.
     Safe to key off `flipped` because it only changes once the turn is over. */
  const { firing, fire, handleAnimationEnd } = useTraceFire(
    flipped ? 'cue-spin-up' : 'cue-spin-down'
  );
  /* Per-instance gradient id — there is more than one cue on the page, and
     duplicate SVG ids in one document collide. Colons are stripped because
     useId's output embeds them. */
  const gradientId = `cue-grad-${useId().replace(/:/g, '')}`;

  const target = flipped ? up : to;

  const handleClick = (e) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    fire(() => {
      /* Batched with the hook's own setFiring, so the class that holds the new
         resting angle lands on the same commit that drops the animation — the
         arrow never flashes back through its old angle in between. */
      setFlipped((f) => !f);
      /* Going up, line up the target's bottom edge — see scrollToHash. */
      scrollToHash(target, flipped ? 'end' : 'start');
    });
  };

  return (
    <a
      href={target}
      className={`scroll-cue${firing ? ' is-firing' : ''}${flipped ? ' is-flipped' : ''}`}
      aria-label={flipped ? upLabel : label}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* One wrapper carries the bob so both copies stay in registration. */}
      <span className="scroll-cue-bob">
        {/* The half turn needs its own wrapper — the bob already owns the
            transform above, and one element can only carry one. Nesting the
            lit window inside the rotation keeps the sweep running along the
            arrow's own stroke as it turns. */}
        <span className="scroll-cue-spin">
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
      </span>
    </a>
  );
};
