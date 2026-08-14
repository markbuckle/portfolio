import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { ReactComponent as GithubIcon } from '../assets/icons/social/github.svg';
import { ReactComponent as LinkedinIcon } from '../assets/icons/social/linkedin.svg';
import { EnvelopeAnimation } from './EnvelopeAnimation';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const isSending = status === 'sending';
  const isSent = status === 'success';

  const nameInputRef = useRef(null);

  /* Same reset handleChange does, but reachable without typing: after a send
     the fields are already blank, so there is nothing to clear — only the
     success state standing between them and the next message. */
  const handleReset = () => {
    setStatus('');
    nameInputRef.current?.focus();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    /* Clear a finished state once they start a new message — otherwise the
       button would still read "Sent with Resend!" while they type the next
       one. */
    if (status === 'success' || status === 'error') setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return; // a second submit mid-send would post twice
    /* Driven by status rather than a one-shot fire(): the trace has to keep
       looping for as long as the request is in flight, which is a duration
       nothing knows up front. */
    setStatus('sending');
    try {
      /* Resend's API key can't be shipped to the browser the way EmailJS's
         public key could, so the send happens in api/contact.js instead. */
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      /* fetch only rejects on network failure — a 400 or 500 still resolves,
         and would otherwise fall through and report success. */
      if (!response.ok) {
        const { error } = await response.json().catch(() => ({}));
        throw new Error(error || `Request failed with status ${response.status}`);
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
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
        <EnvelopeAnimation width={180} height={180} />
        <p className="section-label">Contact</p>
        <h2 className="section-title"><span className="white-gradient-text">Let's </span><span className="contact-title-accent">connect</span></h2>
        <p className="contact-subtitle">
          Inspired and wired with{' '}
          <a
            href="https://resend.com/home"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-subtitle-link"
          >
            Resend
          </a>
        </p>
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
          Whether you have a project in mind or you would like to learn, please reach out
        </p>
      </motion.div>

      <div className="contact-form-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            ref={nameInputRef}
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
          <div className="contact-submit-row">
            <button
              type="submit"
              className={`hero-cta btn-trace${isSending ? ' is-sending' : ''}`}
            >
              {isSending && <span className="cta-spinner" aria-hidden="true" />}
              <span className="hero-cta-label">
                {isSending ? 'Sending…' : isSent ? 'Sent with Resend!' : 'Send message'}
              </span>
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
            {/* Only offered once there is something to reset. type="button" is
                load-bearing: the default inside a form is submit, which would
                fire a second send instead of clearing the state. */}
            {isSent && (
              <motion.button
                type="button"
                className="contact-refresh"
                onClick={handleReset}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <RotateCcw size={16} aria-hidden="true" />
                <span>Refresh to send another</span>
              </motion.button>
            )}
          </div>
          {/* The sending indicator lives inside the button now — see the
              spinner and label above. */}
          {status === 'success' && <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginTop: '0.5rem' }}>I'll get back to you soon.</p>}
          {status === 'error' && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>Something went wrong. Please try again.</p>}
        </form>
      </div>
    </div>
  );
};
