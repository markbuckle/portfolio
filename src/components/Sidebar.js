import React from 'react';
import { motion } from 'framer-motion';
import headshotImg from '../assets/img/headshot.jpg';
import { HashLink as Link } from 'react-router-hash-link';
import { ChevronRight, ChevronLeft, FileDown } from 'lucide-react';
import homeIcon from '../assets/icons/nav/home.svg';
import aboutIcon from '../assets/icons/nav/about.svg';
import projectsIcon from '../assets/icons/nav/projects.svg';
import skillsIcon from '../assets/icons/nav/skills.svg';
import contactIcon from '../assets/icons/nav/contact.svg';
import { ReactComponent as GithubIcon } from '../assets/icons/social/github.svg';
import { ReactComponent as LinkedinIcon } from '../assets/icons/social/linkedin.svg';

const navItems = [
  { icon: <img src={homeIcon} alt="Home" width={24} height={24} />, name: 'Home', to: '#home' },
  { icon: <img src={aboutIcon} alt="About" width={24} height={24} />, name: 'About', to: '#about' },
  { icon: <img src={projectsIcon} alt="Projects" width={24} height={24} />, name: 'Projects', to: '#projects' },
  { icon: <img src={skillsIcon} alt="Skills" width={24} height={24} />, name: 'Skills', to: '#skills' },
  { icon: <img src={contactIcon} alt="Contact" width={24} height={24} />, name: 'Contact', to: '#contact' },
];

const SidebarItem = ({ icon, name, to, isOpen }) => (
  <Link smooth to={to} className="sidebar-link">
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
  const variants = {
    open: { width: 'var(--sidebar-width-open)', transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { width: 'var(--sidebar-width-closed)', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <motion.div
      className="sidebar-container"
      data-state={isOpen ? 'open' : 'closed'}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      <div className="sidebar">
        {/* Toggle — pinned top */}
        <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </div>

        {/* Center group — headshot + social + nav, vertically centered */}
        <div className="sidebar-center">
          {/* Headshot */}
          <div className={`sidebar-headshot-wrapper ${isOpen ? '' : 'hidden'}`}>
            <img
              src={headshotImg}
              alt="Mark Buckle"
              className="sidebar-headshot"
            />
          </div>

          {/* Social icons */}
          <div className={`sidebar-social ${isOpen ? '' : 'hidden'}`}>
            <a href="https://github.com/markbuckle" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon width={30} height={30} />
            </a>
            <a href="https://www.linkedin.com/in/mark-buckle-146316326/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon width={30} height={30} />
            </a>
          </div>

          {/* Nav links */}
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <SidebarItem key={item.name} {...item} isOpen={isOpen} />
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
  );
};
