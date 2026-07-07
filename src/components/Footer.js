import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mark Buckle</p>
        <Magnetic strength={0.4}>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </Magnetic>
      </div>
    </footer>
  );
};
