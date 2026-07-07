import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroCanvas } from './HeroCanvas';
import { PRELOADER_DONE_EVENT, shouldShowPreloader } from './Preloader';

gsap.registerPlugin(ScrollTrigger);

const NAME = 'Mark Buckle';
const ROLES = ['Product Designer', 'Software Developer', 'Engineer'];

export const Hero = () => {
  const [started, setStarted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const rootRef = useRef(null);

  // Intro reveal — waits for the preloader curtain if it's showing this session
  useEffect(() => {
    const root = rootRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setStarted(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.hero-name-char', { yPercent: 115 });
      gsap.set('.hero-fade', { opacity: 0, y: 22 });
    }, root);

    const play = () => {
      setStarted(true);
      ctx.add(() => {
        gsap.timeline({ defaults: { ease: 'power4.out' } })
          .to('.hero-name-char', { yPercent: 0, duration: 1.05, stagger: 0.035 }, 0.05)
          .to('.hero-fade', { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' }, 0.45);
      });
    };

    let removeListener = null;
    if (shouldShowPreloader()) {
      window.addEventListener(PRELOADER_DONE_EVENT, play, { once: true });
      removeListener = () => window.removeEventListener(PRELOADER_DONE_EVENT, play);
    } else {
      play();
    }

    return () => {
      removeListener?.();
      ctx.revert();
    };
  }, []);

  // Subtle parallax: hero content drifts up and fades as you scroll away
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      gsap.to('.hero-inner', {
        yPercent: -14,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Typewriter — starts once the intro begins
  useEffect(() => {
    if (!started) return;
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        return;
      }
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, started]);

  return (
    <div className="hero" ref={rootRef}>
      <HeroCanvas />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-inner">
        <p className="hero-greeting hero-fade">Hello, I'm</p>
        <h1 className="hero-name" aria-label={NAME}>
          {NAME.split(' ').map((word) => (
            <span className="hero-name-word" key={word} aria-hidden="true">
              {word.split('').map((ch, i) => (
                <span className="hero-name-char" key={i}>{ch}</span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-title-line hero-fade">
          <span className="typed">{text}</span>
          <span className="cursor" />
        </p>
        <p className="hero-description hero-fade">
          I design and build products that bridge user-centered design with technical feasibility
        </p>
        <div className="hero-fade">
          <a href="#projects" className="hero-cta btn-trace">
            <span className="hero-cta-label">View my work <span style={{ fontSize: '1.1rem' }}>→</span></span>
            <svg className="trace-svg" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="hero-trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00e5a0" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
              <rect className="trace-rect" x="1.5" y="1.5" rx="26.5" pathLength="600" stroke="url(#hero-trace-grad)" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
