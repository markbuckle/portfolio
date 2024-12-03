import React from "react";
import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import ComputerIcon from '@mui/icons-material/Computer';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const SidebarItem = ({ icon, name, to, isOpen }) => {
  return (
    <Link smooth to={to} className={`sidebar-link`}>
      <motion.div 
        className='sidebar-item'
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(3.5px)",
          cursor: 'pointer'
        }}
        transition={{
          type: 'none',
          duration: 0.1
        }}
      >
        <motion.div className='sidebar-icon'>
          {icon}
        </motion.div>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {name}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarVariants = {
    open: {
      width: "15rem",
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 20
      }
    },
    closed: {
      width: "4rem",
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="sidebar-container"
      data-state={isOpen ? "open" : "closed"}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <motion.div className="sidebar">
        <motion.div
          className="toggle-button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            scale: 1.1
          }}
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </motion.div>

        <div className="spacer">
          {/* Headshot Section */}
          <div className={`sidebar-headshot ${isOpen ? 'visible' : 'hidden'}`}>
            <img
              src="/headshot.jpg"
              alt=""
              className="headshot-image"
            />
          </div>
          {/* Social Icons */}
          <div className={`sidebar-social-icons ${isOpen ? 'visible' : 'hidden'}`}>
            <a
              href="https://github.com/markbuckle"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mark-buckle-146316326/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <SidebarItem icon={<HomeIcon />} name="Home" to="#banner" isOpen={isOpen} />
            <SidebarItem icon={<PersonIcon />} name="About" to="#about" isOpen={isOpen} />
            <SidebarItem icon={<ComputerIcon />} name="Skills" to="#skills" isOpen={isOpen} />
            <SidebarItem icon={<CodeIcon />} name="Projects" to="#projects" isOpen={isOpen} />
            <SidebarItem icon={<ContactPageIcon />} name="Resume" to="#resume" isOpen={isOpen} />
            <SidebarItem icon={<EmailIcon />} name="Contact" to="#contact" isOpen={isOpen} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
