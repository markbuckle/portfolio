import React, { Suspense, useEffect, useRef, useState } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const SCENE = 'https://prod.spline.design/vPOxKKw66QSzNnjZ/scene.splinecode';

class Boundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const RENDER_SCALE = 2;

export const EnvelopeSpline = ({ width = 180, height = 180 }) => {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="envelope-spline" style={{ width, height, overflow: 'hidden' }} aria-hidden="true">
      <style>{`.envelope-spline canvas { width: 100% !important; height: 100% !important; display: block; }`}</style>
      {near && (
        <Boundary>
          <Suspense fallback={null}>
            <Spline
              scene={SCENE}
              style={{ width: '100%', height: '100%' }}
              onLoad={(app) => app.setSize(width * RENDER_SCALE, height * RENDER_SCALE)}
            />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
};
