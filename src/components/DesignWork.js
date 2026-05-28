import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    // tag: 'Product Design · Full-Stack',
    title: 'LifeSync',
    subtitle: 'Text-to-Calendar Management Application',
    description:
      'A calendar management platform that makes booking appointments, events, and meetings easier than ever. Powered by an AI assistant that helps users stay organized like a personal CEO assistant. Shipped as a web and IOS application.',
    tools: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'GraphQL', 'PostgreSQL', 'Docker', 'Vercel'],
    liveUrl: 'https://thelifesync.vercel.app/',
    gitUrl: 'https://github.com/markbuckle/lifesync',
    image: null,
  },
  {
    id: 2,
    // tag: 'Product Design · Full-Stack',
    title: 'HealthLync',
    subtitle: 'Personalized Health Tracker',
    description:
      'Comprehensive health tracking application that enables users to make sense of complex medical information through intelligent data processing, OCR extraction, and AI-powered insights. Features include interactive dashboards, a RAG chatbot for medical information retrieval, and a guided onboarding tutorial system.',
    tools: ['Figma', 'Node.js', 'Express', 'Python', 'MongoDB', 'Plotly.js', 'OpenAI', 'Anthropic Claude', 'Docker'],
    liveUrl: 'https://www.earlyhealthlync.com/',
    gitUrl: 'https://github.com/markbuckle/health-tracker',
    image: null,
  },
  {
    id: 3,
    // tag: 'SaaS · Full-Stack',
    title: 'FeedFlo',
    subtitle: 'User Feedback Management Web Application',
    description:
      'A SaaS platform for collecting, organizing, and acting on product feedback. Built with authentication, subscription billing, and a clean dashboard that helps teams triage and prioritize user insights at scale.',
    tools: ['React', 'Next.js', 'TypeScript', 'Shadcn UI', 'Clerk', 'Supabase', 'PostgreSQL', 'Stripe', 'Vercel'],
    liveUrl: 'https://saasdashboard.vercel.app/',
    gitUrl: 'https://github.com/markbuckle/saas-app',
    image: null,
  },
];

const gradients = [
  'linear-gradient(90deg, #0a0a0a 0%, #353535 50%, #0a0a0a 100%)',
  'linear-gradient(90deg, #111111 0%, #383838 50%, #111111 100%)',
  'linear-gradient(90deg, #0f0f0f 0%, #363636 50%, #0f0f0f 100%)',
];

const CaseStudyCard = ({ study, index }) => (
  <motion.div
    className="case-study-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
  >
    {study.image ? (
      <img src={study.image} alt={study.title} className="case-study-image" />
    ) : (
      <div
        className="case-study-image"
        style={{
          background: gradients[index % gradients.length],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#111111',
          letterSpacing: '-0.02em',
          textShadow: '0 0 10px rgba(180,180,180,0.2), 0 0 20px rgba(140,140,140,0.1)',
        }}
      >
        {study.title}
      </div>
    )}

    <div className="case-study-content">
      <p className="case-study-tag">{study.tag}</p>
      <h3 className="case-study-title white-gradient-text">{study.subtitle}</h3>
      <p className="case-study-description">{study.description}</p>

      <div className="case-study-tools">
        <p className="tools-label">Tools used:</p>
        <div className="case-study-tools-tags">
          {study.tools.map((tool) => (
            <span key={tool} className="tool-tag">{tool}</span>
          ))}
        </div>
      </div>

      <div className="case-study-links">
        {study.liveUrl && (
          <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className="case-study-link case-study-link-ghost">
            <ExternalLink size={13} /> Live
          </a>
        )}
        {study.gitUrl && (
          <a href={study.gitUrl} target="_blank" rel="noopener noreferrer" className="case-study-link case-study-link-ghost">
            <Github size={13} /> Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const DesignWork = () => {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Projects</p>
        <h2 className="section-title"><span className="white-gradient-text">My </span><span style={{ background: 'linear-gradient(180deg, #00e5a0 0%, #00b87a 55%, #007a52 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>work</span></h2>
        <p className="section-subtitle">
          Here are a few of my end-to-end projects spanning from user research, architecture, design systems, and full-stack development through to the shipped product.
        </p>
      </motion.div>

      <div className="case-studies">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </div>
  );
};
