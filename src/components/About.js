import React from 'react';
import { useTraceFire, scrollToHash, isPlainClick } from '../hooks/useTraceFire';
import { CtaArrow } from './CtaArrow';
import { ScrollReveal } from './ScrollReveal';

/* Flip to true to bring back the Focus Areas / Education plaques. */
const SHOW_DETAIL_CARDS = false;

/* Pill CTA whose perimeter trace runs on click, holding the scroll until it
   finishes. Each instance needs its own gradientId — duplicate SVG ids in one
   document collide — and its own hook state, so the two buttons can't fire
   each other. */
const CtaButton = ({ href, label, gradientId, className = '', arrow = 'elbow' }) => {
  const { firing, fire, handleAnimationEnd } = useTraceFire();

  const handleClick = (e) => {
    if (!isPlainClick(e)) return;
    e.preventDefault();
    fire(() => scrollToHash(href));
  };

  return (
    <a
      href={href}
      className={`hero-cta btn-trace ${className}${firing ? ' is-firing' : ''}`.trim()}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className="hero-cta-label">
        {label}
        {arrow === 'right' && <span className="cta-arrow-glyph"> →</span>}
      </span>
      {arrow === 'elbow' && <CtaArrow />}
      <svg className="trace-svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5a0" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
        <rect className="trace-rect" x="1.5" y="1.5" rx="26.5" pathLength="600" stroke={`url(#${gradientId})`} />
      </svg>
    </a>
  );
};

export const About = () => {
  return (
    <div className="section-container">
      {/* One reveal per element rather than one for the block: each crosses the
          fade window at its own height on the screen, so the stack cascades
          instead of arriving as a slab. The small `delay` bumps deepen a
          cascade the 35px between a label and its title barely registers on. */}
      <ScrollReveal as="p" className="section-label">About Me</ScrollReveal>
      <ScrollReveal as="h2" className="section-title2" delay={0.08}><span className="white-gradient-text">A builder who </span><span className="sweats-word">sweats<span className="sweat-drop" style={{ left: '50%' }}></span></span><span className="white-gradient-text"> the </span><span style={{ background: 'linear-gradient(180deg, #00e5a0 0%, #00b87a 55%, #007a52 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>UX</span></ScrollReveal>
      <ScrollReveal as="p" className="about-bio" delay={0.14}>
        I have a mild obsession for next-level user interfaces. I currently build products and tools at <a href="https://verafin.com/canada/" target="_blank" rel="noopener noreferrer" className="bio-link">Nasdaq-Verafin</a>
      </ScrollReveal>
      <ScrollReveal as="p" className="about-bio" delay={0.18}>
        When I'm not building, you can probably find me hiking with my dog Bimber, listening to a podcast and/or travelling somewhere new
      </ScrollReveal>

      {SHOW_DETAIL_CARDS && (
      <ScrollReveal className="about-details-row" delay={0.2}>
        <div className="about-card">
          <div className="about-card-inner">
            <p className="about-detail-label">Focus Areas</p>
            <div className="about-card-rule" aria-hidden="true"></div>
            <div className="about-detail-list">
              <p className="about-detail-value">Full-stack Development</p>
              <p className="about-detail-value">Product Design</p>
              <p className="about-detail-value">Engineering and Architecture</p>
              <p className="about-detail-value">AI-Powered Products</p>
            </div>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-inner">
            <p className="about-detail-label">Education</p>
            <div className="about-card-rule" aria-hidden="true"></div>
            <div className="about-detail-list">
              <p className="about-detail-value">B. Eng - Memorial University of Newfoundland</p>
              <p className="about-detail-value">Web Development & Product Design - GetCoding</p>
              <p className="about-detail-value">Precision Health certification - University of Calgary</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
      )}

      <ScrollReveal className="about-cta-row" delay={0.2}>
        <CtaButton href="#projects" label="View my work" gradientId="about-trace-grad" />
        {/* Hidden for now — uncomment to bring back. The mobile type/padding
            rules for .about-cta-row in App.css exist to keep this label on one
            line, so leave those in place. */}
        {/*
        <CtaButton
          href="#projects"
          label="How I approach design and engineering"
          gradientId="about-trace-grad-2"
          className="hero-cta--invert"
          arrow="right"
        />
        */}
      </ScrollReveal>
    </div>
  );
};
