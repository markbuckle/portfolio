import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const PRELOADER_KEY = 'mb-preloader-shown';
export const PRELOADER_DONE_EVENT = 'preloader:done';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const shouldShowPreloader = () => {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(PRELOADER_KEY);
  } catch {
    return true;
  }
};

export const Preloader = () => {
  const [show] = useState(shouldShowPreloader);
  const [gone, setGone] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!show) {
      window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      return;
    }

    document.documentElement.classList.add('is-preloading');
    const root = rootRef.current;
    const counter = { value: 0 };
    const counterEl = root.querySelector('.preloader-counter');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          try {
            sessionStorage.setItem(PRELOADER_KEY, '1');
          } catch {}
          document.documentElement.classList.remove('is-preloading');
          window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
          setGone(true);
        },
      });

      tl.to('.preloader-word span', { y: 0, duration: 0.7, stagger: 0.06 }, 0.1)
        .to(
          counter,
          {
            value: 100,
            duration: 1.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              counterEl.textContent = String(Math.round(counter.value)).padStart(3, '0');
            },
          },
          0.1
        )
        .to('.preloader-bar-fill', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0.1)
        .to('.preloader-word span', { y: '-112%', duration: 0.5, stagger: 0.04, ease: 'power3.in' }, '+=0.15')
        .to('.preloader-meta, .preloader-bar', { opacity: 0, duration: 0.3 }, '<')
        .to(root, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '-=0.2');
    }, root);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove('is-preloading');
    };
  }, [show]);

  if (!show || gone) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-name">
        <span className="preloader-word"><span>Mark</span></span>
        <span className="preloader-word"><span>Buckle</span></span>
      </div>
      <div className="preloader-meta">
        <span className="preloader-roles">design · develop · engineer</span>
        <span className="preloader-counter">000</span>
      </div>
      <div className="preloader-bar"><div className="preloader-bar-fill" /></div>
    </div>
  );
};
