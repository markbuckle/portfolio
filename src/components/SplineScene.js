/*
  SplineScene — a Spline scene in a CSS-sized square box.

  Spline's runtime is large, so it stays out of the main bundle: the chunk is
  only requested once the box is within ~300px of the viewport. It stops
  drawing while scrolled out of view, and renders nothing if the scene or the
  browser's graphics fail. Reduced-motion visitors never download it.

  Why the runtime is driven directly instead of through @splinetool/react-spline:
  the component can't pass the runtime's `renderer` option. Left on auto, the
  runtime obeys each scene's own "renderer" export setting, and a scene set to
  WebGL gets the classic pipeline, which cannot compile materials like the
  About scene's 3D text (shader error, blank canvas). Passing
  renderer="webgpu" wins over that setting where the browser has WebGPU.

  Sizing: the runtime forces its canvas to the scene's authored 1080px in
  inline CSS, so in a small box only a corner of the scene shows. The
  `.spline-scene canvas` rule in App.css overrides that with !important, and the
  render buffer is matched to the box here (up to 2x for retina) so the GPU
  isn't drawing 1080px into a 200px box.
*/
import React, { useEffect, useRef } from 'react';

const MAX_PIXEL_RATIO = 2;

export const SplineScene = ({ scene, className = '', style, renderer }) => {
  const box = useRef(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let app = null;
    let canvas = null;
    let visible = false;
    let started = false;
    let cancelled = false;
    let resizeObserver = null;

    const fitToBox = () => {
      if (!app) return;
      const side = Math.round(el.clientWidth * Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
      if (side > 0) app.setSize(side, side);
    };

    const start = async () => {
      started = true;
      try {
        const { Application } = await import('@splinetool/runtime');
        if (cancelled) return;
        /* A fresh canvas per run: the runtime can't reuse one it has disposed. */
        canvas = document.createElement('canvas');
        el.appendChild(canvas);
        /* `renderer` is opt-in per scene: some scenes need WebGPU, but others
           (the envelope) render wrong on it, so the default stays on auto. */
        const options = { htmlContentMode: 'none' };
        if (renderer === 'webgpu' && 'gpu' in navigator) options.renderer = renderer;
        app = new Application(canvas, options);
        await app.load(scene);
        if (cancelled) return;
        fitToBox();
        resizeObserver = new ResizeObserver(fitToBox);
        resizeObserver.observe(el);
        if (!visible) app.stop();
      } catch (err) {
        console.error('Spline scene failed to load:', err);
        canvas?.remove();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        visible = entry.isIntersecting;
        if (visible && !started) start();
        else if (app) visible ? app.play() : app.stop();
      },
      { rootMargin: '300px' }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      resizeObserver?.disconnect();
      try {
        app?.dispose();
      } catch (err) {
        /* already torn down */
      }
      canvas?.remove();
    };
  }, [scene, renderer]);

  return <div ref={box} className={`spline-scene ${className}`.trim()} style={style} aria-hidden="true" />;
};
