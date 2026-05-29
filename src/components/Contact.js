import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as GithubIcon } from '../assets/icons/social/github.svg';
import { ReactComponent as LinkedinIcon } from '../assets/icons/social/linkedin.svg';
// import emailLogo from '../assets/logos/email.svg';
import { EnvelopeAnimation } from './EnvelopeAnimation';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="section-container contact-section">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* <img src={emailLogo} alt="Email" className="contact-email-logo" /> */}
        <EnvelopeAnimation width={180} height={180} />
        <p className="section-label">Contact</p>
        <h2 className="section-title"><span className="white-gradient-text">Let's </span><span className="contact-title-accent">connect</span></h2>
        <div className="contact-social-row">
          <a href="https://github.com/markbuckle" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub">
            <GithubIcon width={45} height={45} />
          </a>
          <a href="https://www.linkedin.com/in/mark-buckle-146316326/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn">
            <LinkedinIcon width={45} height={45} />
          </a>
        </div>
        <p className="contact-description">
          I'm always open to learning more about product design, full-stack development and software engineering opportunities.
          Whether you have a project in mind or you would like to learn, please reach out.
        </p>
      </motion.div>

      <div className="contact-form-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="hero-cta btn-trace">
            <span className="hero-cta-label">Send message</span>
            <svg className="trace-svg" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="contact-trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00e5a0" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
              <rect className="trace-rect" x="1.5" y="1.5" rx="26.5" pathLength="600" stroke="url(#contact-trace-grad)" />
            </svg>
          </button>
          {status === 'sending' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <motion.span
                style={{
                  display: 'inline-block',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid rgba(0,229,160,0.2)',
                  borderTopColor: 'var(--accent)',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              />
              <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>Sending...</span>
            </div>
          )}
          {status === 'success' && <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Message sent! I'll get back to you soon.</p>}
          {status === 'error' && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Something went wrong. Please try again.</p>}
        </form>
      </div>
    </div>
  );
};
