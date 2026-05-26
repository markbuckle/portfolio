import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const roles = ['Product Designer', 'Software Developer', 'Engineer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
      if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles]);

  return (
    <div className="hero">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">Mark Buckle</h1>
        <p className="hero-title-line">
          <span className="typed">{text}</span>
          <span className="cursor" />
        </p>
        <p className="hero-description">
          I design and build products that bridge technical feasibility with user-centered design.
          {/* Passionate about innovation, cybersecurity, and shipping fast. */}
        </p>
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
      </motion.div>
    </div>
  );
};
