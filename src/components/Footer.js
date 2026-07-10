import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mark Buckle</p>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};
