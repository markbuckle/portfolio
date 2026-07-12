import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'ai', label: 'AI' },
];

const SKILLS = {
  design: [
    'Figma', 'Wireframing', 'High Fidelity',
    'Prototyping', 'Design Systems', 'User Research', 'Usability Testing',
    
  ],
  development: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'Java', 'HTML', 'CSS', 'Tailwind CSS', 'PostgreSQL',
    'MongoDB', 'GraphQL', 'FastAPI', 'AWS', 'Docker', 'Git', 
  ],
  engineering: [
    'Systems Design', 'API Design', 'AI/ML Integration', 'RAG Pipelines',
    'Data Pipelines', 'Cloud Architecture', 'CI/CD', 'Database Architecture',
    'Performance Optimization', 'Agile / Scrum',
  ],
  ai: [
    'Prompt Engineering', 'RAG', 'Vector Databases', 'Claude Design', 'Claude Code', 'Claude API', 'Anthropic SDK', 'Model Fine-tuning', 'AI Safety', 'LangChain', 'AI Agents',
    'Multi-agent Systems',
  ],
};

const SkillChip = ({ name, delay }) => (
  <motion.div
    className="skill-chip"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, delay }}
  >
    {name}
  </motion.div>
);

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [indicator, setIndicator] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const tabRefs = useRef({});
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const measure = () => {
      const btn = tabRefs.current[activeTab];
      const track = trackRef.current;
      if (!btn || !track) return;
      const bRect = btn.getBoundingClientRect();
      const tRect = track.getBoundingClientRect();
      setIndicator({
        x: bRect.left - tRect.left,
        y: bRect.top - tRect.top,
        w: bRect.width,
        h: bRect.height,
      });
    };
    measure();
    // Web fonts often finish loading after this first measure, which reflows
    // button text width and leaves the pill sized to the fallback font.
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeTab]);

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Skills & Tools</p>
        <h2 className="section-title">
          <span className="white-gradient-text">What I </span>
          <span style={{
            background: 'linear-gradient(180deg, #00e5a0 0%, #00b87a 55%, #007a52 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>build</span>
          <span className="white-gradient-text"> with</span>
        </h2>
      </motion.div>

      <div className="skills-toggle-wrapper">
        <div className="skills-toggle-outer">
          <div className="skills-toggle-track" ref={trackRef} role="tablist">
            <svg
              className="skills-toggle-svg"
              width="100%"
              height="100%"
              role="presentation"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="skills-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#b0b0b0', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="skills-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#585858" />
                  <stop offset="45%" stopColor="#2f2f2f" />
                  <stop offset="100%" stopColor="#181818" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="0"
                rx={indicator.h / 2}
                ry={indicator.h / 2}
                stroke="url(#skills-grad)"
                strokeWidth="0.75"
                fill="url(#skills-fill)"
                style={{
                  width: `${indicator.w}px`,
                  height: `${indicator.h}px`,
                  transform: `translate(${indicator.x}px, ${indicator.y}px)`,
                  transition: 'width 0.28s cubic-bezier(0.16,1,0.3,1), height 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            </svg>

            {TABS.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`skills-toggle-btn${activeTab === tab.id ? ' skills-toggle-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="skills-grid"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {SKILLS[activeTab].map((skill, i) => (
              <SkillChip key={skill} name={skill} delay={i * 0.02} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
