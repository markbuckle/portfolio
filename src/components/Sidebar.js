import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Sidebar headshot is hidden for now — restore this with the markup below.
// import headshotImg from '../assets/img/headshot.jpg';
import { HashLink as Link } from 'react-router-hash-link';
import { FileDown, Menu } from 'lucide-react';
import chevronRightIcon from '../assets/icons/nav/chevron-right.svg';
import chevronLeftIcon from '../assets/icons/nav/chevron-left.svg';
import { HomeIcon, AboutIcon, ProjectsIcon, SkillsIcon, ContactIcon, BurgerIcon } from './NavIcons';

const navItems = [
  { icon: <HomeIcon />, name: 'Home', to: '#home' },
  { icon: <AboutIcon />, name: 'About', to: '#about' },
  { icon: <ProjectsIcon />, name: 'Projects', to: '#projects' },
  { icon: <SkillsIcon />, name: 'Skills', to: '#skills' },
  { icon: <ContactIcon />, name: 'Contact', to: '#contact' },
];

const SidebarItem = ({ icon, name, to, isOpen, onNavigate }) => (
  <Link smooth to={to} className="sidebar-link" onClick={onNavigate}>
    <div className="sidebar-item" data-label={name}>
      <span className="sidebar-item-icon">{icon}</span>
      {isOpen && (
        <motion.span
          className="sidebar-item-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {name}
        </motion.span>
      )}
    </div>
  </Link>
);

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
  // On phones the panel just appears/disappears — no width tween or slide.
  const duration = isMobile() ? 0 : 0.3;
  const variants = {
    open: { width: 'var(--sidebar-width-open)', transition: { duration, ease: 'easeInOut' } },
    closed: { width: 'var(--sidebar-width-closed)', transition: { duration, ease: 'easeInOut' } },
  };

  // Phones: hold the menu open ~1s after a tap so the touched icon's hover
  // animation (the :active/:hover state persists on touch) is visible first.
  const closeTimer = useRef(null);
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  const CLOSE_DELAY = 750;

  const FADE_MS = 280;
  const [closing, setClosing] = useState(false);
  useEffect(() => { if (!isOpen) setClosing(false); }, [isOpen]);

  // Fade out first, then unmount/close once the fade has finished.
  const fadeClose = (delay) => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setClosing(true);
      closeTimer.current = setTimeout(() => setIsOpen(false), FADE_MS);
    }, delay);
  };

  const closeOnMobile = () => {
    if (isMobile()) fadeClose(CLOSE_DELAY);
  };

  const handleToggle = () => {
    if (isOpen && isMobile()) fadeClose(CLOSE_DELAY);
    else setIsOpen(!isOpen);
  };

  const handleBackdrop = () => {
    if (isMobile()) fadeClose(0);
    else setIsOpen(false);
  };

  return (
    <>
    {!isOpen && (
      <button
        className="mobile-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        aria-expanded={false}
      >
        <Menu size={20} />
      </button>
    )}
    {isOpen && <div className={`sidebar-backdrop${closing ? ' is-closing' : ''}`} onClick={handleBackdrop} aria-hidden="true" />}
    <motion.div
      className={`sidebar-container${closing ? ' is-closing' : ''}`}
      data-state={isOpen ? 'open' : 'closed'}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      <div className="sidebar">
        {/* Toggle — pinned top */}
        <div className="sidebar-toggle" onClick={handleToggle}>
          <img
            className="toggle-chevron"
            src={isOpen ? chevronLeftIcon : chevronRightIcon}
            alt={isOpen ? 'Collapse' : 'Expand'}
            width={18}
            height={18}
          />
          {/* Phones only (see App.css): the open hamburger replaces the chevron. */}
          <BurgerIcon />
        </div>

        {/* Center group — nav, vertically centered */}
        <div className="sidebar-center">
          {/* Headshot — hidden for now. Uncomment along with the import at the
              top of this file; .sidebar-headshot styles are still in App.css. */}
          {/*
          <div className={`sidebar-headshot-wrapper ${isOpen ? '' : 'hidden'}`}>
            <img
              src={headshotImg}
              alt="Mark Buckle"
              className="sidebar-headshot"
            />
          </div>
          */}

          {/* Nav links */}
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <SidebarItem key={item.name} {...item} isOpen={isOpen} onNavigate={closeOnMobile} />
            ))}
          </nav>
        </div>

        {/* Resume download — pinned bottom */}
        <div className="sidebar-download" style={{ display: 'none' }}>
          <a href="/resume.pdf" download className="sidebar-link">
            <div className="sidebar-item">
              <span className="sidebar-item-icon"><FileDown size={18} /></span>
              {isOpen && (
                <motion.span
                  className="sidebar-item-label accent-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  Resume
                </motion.span>
              )}
            </div>
          </a>
        </div>
      </div>
    </motion.div>
    </>
  );
};
