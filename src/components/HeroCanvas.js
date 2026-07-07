import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute float aScale;
  varying float vElev;
  varying float vDist;

  void main() {
    vec3 pos = position;

    float elev = sin(pos.x * 0.28 + uTime * 0.55) * sin(pos.z * 0.22 + uTime * 0.4) * 0.7;
    elev += sin(pos.x * 0.09 - uTime * 0.22) * 1.05;
    elev += cos(pos.z * 0.14 + uTime * 0.3) * 0.5;

    float mouseDist = distance(pos.xz, uMouse);
    elev += smoothstep(6.0, 0.0, mouseDist) * 1.3;

    pos.y += elev;
    vElev = elev;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vDist = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * aScale * (16.0 / -mvPosition.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vElev;
  varying float vDist;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.08, d);
    vec3 color = mix(uColorA, uColorB, clamp(vElev * 0.32 + 0.5, 0.0, 1.0));
    float fade = smoothstep(46.0, 14.0, vDist);
    gl_FragColor = vec4(color, alpha * fade * 0.7);
  }
`;

export const HeroCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth < 768;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    } catch {
      return; // WebGL unavailable — hero falls back to plain black background
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 4.6, 11);
    camera.lookAt(0, 0, -4);

    // Particle grid on the XZ plane, displaced vertically in the vertex shader
    const FIELD_W = 60;
    const FIELD_D = 42;
    const COLS = isSmall ? 90 : 150;
    const ROWS = isSmall ? 52 : 88;
    const count = COLS * ROWS;

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    let i = 0;
    for (let ix = 0; ix < COLS; ix++) {
      for (let iz = 0; iz < ROWS; iz++) {
        positions[i * 3] = (ix / (COLS - 1) - 0.5) * FIELD_W;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (iz / (ROWS - 1) - 0.5) * FIELD_D - 6;
        scales[i] = 0.6 + Math.random() * 0.9;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const uniforms = {
      uTime: { value: reducedMotion ? 3.2 : 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uSize: { value: (isSmall ? 2.3 : 2.9) * renderer.getPixelRatio() },
      uColorA: { value: new THREE.Color('#00e5a0') },
      uColorB: { value: new THREE.Color('#00d4ff') },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();

    const clock = new THREE.Clock();
    const targetMouse = new THREE.Vector2(999, 999);
    const targetParallax = new THREE.Vector2(0, 0);
    let rafId = 0;
    let inView = true;
    let running = false;

    const renderFrame = () => {
      if (!reducedMotion) uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetMouse, 0.06);
      camera.position.x += (targetParallax.x * 1.4 - camera.position.x) * 0.03;
      camera.position.y += (4.6 + targetParallax.y * 0.7 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -4);
      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      clock.start();
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      clock.stop();
      cancelAnimationFrame(rafId);
    };

    if (reducedMotion) {
      renderFrame(); // single static frame
    } else {
      start();
    }

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetMouse.set(nx * (FIELD_W * 0.5) * 0.55, ny * (FIELD_D * 0.5) * 0.7 - 6);
      targetParallax.set(nx, -ny);
    };
    const onPointerLeave = () => {
      targetMouse.set(999, 999);
      targetParallax.set(0, 0);
    };
    if (!isCoarse && !reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }

    const onResize = () => {
      setSize();
      if (reducedMotion) renderFrame();
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-canvas" ref={containerRef} aria-hidden="true" />;
};
