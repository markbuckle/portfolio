import React from 'react';
import { motion } from 'framer-motion';

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
        <h2 className="section-title2">A builder who <span className="sweats-word">sweats<span className="sweat-drop" style={{ left: '50%' }}></span></span> the <span style={{ background: 'linear-gradient(180deg, #00e5a0 0%, #00b87a 55%, #007a52 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>UX</span></h2>
        <p className="about-bio">
          I design, develop and engineer solutions. With a mild obsession for next-level user interfaces, I like putting myself in the
          user's shoes when I build products.
        </p>
      </motion.div>

      <motion.div
        className="about-details-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="about-card">
          <div className="about-card-inner">
            <p className="about-detail-label">Education</p>
            <div className="about-detail-list">
              <p className="about-detail-value">B. Eng - Memorial University of Newfoundland</p>
              <p className="about-detail-value">Web Development & Product Design - GetCoding</p>
              <p className="about-detail-value">Precision Health certification - University of Calgary</p>
            </div>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-inner">
            <p className="about-detail-label">Focus Areas</p>
            <div className="about-detail-list">
              <p className="about-detail-value">Full-stack Development</p>
              <p className="about-detail-value">Product Design</p>
              <p className="about-detail-value">Engineering and Architecture</p>
              <p className="about-detail-value">AI-Powered Products</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
