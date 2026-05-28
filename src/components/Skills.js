import React from 'react';
import { motion } from 'framer-motion';

const designSkills = [
  'Figma', 'NanoBanana', 'Claude Design', 'Wireframing', 'High Fidelity','Prototyping',
  'Design Systems', 'User Research', 'Usability Testing', 'Information Architecture',
];

const devSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'Java', 'HTML', 'CSS', 'Tailwind CSS',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'FastAPI',
  'AWS', 'Docker', 'Git',
];

const engineeringSkills = [
  'Systems Design', 'API Design', 'AI/ML Integration', 'RAG Pipelines',
  'Data Pipelines', 'Cloud Architecture', 'CI/CD', 'Database Architecture',
  'Performance Optimization', 'Technical Scoping', 'Agile / Scrum',
];

const SkillChip = ({ name, delay }) => (
  <motion.div
    className="skill-chip"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
  >
    {name}
  </motion.div>
);

export const Skills = () => {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Skills & Tools</p>
        <h2 className="section-title"><span className="white-gradient-text">What I </span><span style={{ background: 'linear-gradient(180deg, #00e5a0 0%, #00b87a 55%, #007a52 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>build</span><span className="white-gradient-text"> with</span></h2>
      </motion.div>

      <div className="skills-groups">
        <div>
          <p className="skills-group-label">Design</p>
          <div className="skills-grid">
            {designSkills.map((skill, i) => (
              <SkillChip key={skill} name={skill} delay={i * 0.03} />
            ))}
          </div>
        </div>

        <div>
          <p className="skills-group-label">Development</p>
          <div className="skills-grid">
            {devSkills.map((skill, i) => (
              <SkillChip key={skill} name={skill} delay={i * 0.03} />
            ))}
          </div>
        </div>

        <div>
          <p className="skills-group-label">Engineering</p>
          <div className="skills-grid">
            {engineeringSkills.map((skill, i) => (
              <SkillChip key={skill} name={skill} delay={i * 0.03} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
