import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Tilt = ({ children, max = 4, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    gsap.set(el, { transformPerspective: 900 });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotationX: -py * 2 * max,
        rotationY: px * 2 * max,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.9,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [max]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};
