import React from 'react';
import { motion } from 'framer-motion';
import { useTraceFire, scrollToHash, isPlainClick } from '../hooks/useTraceFire';
import { CtaArrow } from './CtaArrow';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">About Me</p>
        <h2 className="section-title2"><span className="white-gradient-text">A builder who </span><span className="sweats-word">sweats<span className="sweat-drop" style={{ left: '50%' }}></span></span><span className="white-gradient-text"> the </span><span style={{ background: 'linear-gradient(180deg, #00e5a0 0%, #00b87a 55%, #007a52 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>UX</span></h2>
        <p className="about-bio">
          I have a mild obsession for next-level user interfaces. I currently build products and tools at <a href="https://verafin.com/canada/" target="_blank" rel="noopener noreferrer" className="bio-link">Nasdaq-Verafin</a>
        </p>
        <p className="about-bio">
          When I'm not building, you can probably find me hiking with my dog Bimber, listening to a podcast and/or travelling somewhere new.
        </p>
      </motion.div>

      {SHOW_DETAIL_CARDS && (
      <motion.div
        className="about-details-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
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
      </motion.div>
      )}

      <motion.div
        className="about-cta-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
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
      </motion.div>
    </div>
  );
};
