import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'LifeSync',
    description: 'AI-powered life management platform with smart dashboard, appointment booking, task management, and AI assistant.',
    stack: 'React · TypeScript · Tailwind · FastAPI · GraphQL · PostgreSQL · Docker',
    previewUrl: '#',
    gitUrl: '',
  },
  {
    id: 2,
    title: 'HealthLync',
    description: 'Personalized health tracker with OCR document processing, interactive dashboards, and RAG chatbot.',
    stack: 'Node.js · Express · MongoDB · PostgreSQL · Plotly.js · OpenAI · Anthropic',
    previewUrl: 'https://www.earlyhealthlync.com/',
    gitUrl: '',
  },
  {
    id: 3,
    title: 'FeedFlo',
    description: 'User feedback SaaS tool for collecting and managing product feedback.',
    stack: 'React · Next.js · Shadcn-UI · Clerk · Supabase · PostgreSQL · Stripe',
    previewUrl: 'https://saasdashboard.vercel.app/',
    gitUrl: 'https://github.com/markbuckle/saas-app',
  },
  {
    id: 4,
    title: 'DocChat',
    description: 'AI-powered PDF upload chatbot for conversational document analysis.',
    stack: 'Python · Streamlit',
    previewUrl: 'https://thepdfchatbot.streamlit.app/',
    gitUrl: 'https://github.com/markbuckle/chatbot',
  },
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <div className="project-card-body">
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-desc">{project.description}</p>
      <p className="project-card-stack">{project.stack}</p>

      <div className="project-card-links">
        {project.previewUrl && project.previewUrl !== '#' && (
          <a href={project.previewUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={12} /> Live
          </a>
        )}
        {project.gitUrl && (
          <a href={project.gitUrl} target="_blank" rel="noopener noreferrer">
            <Github size={12} /> Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const Projects = () => {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-label">Software Projects</p>
        <h2 className="section-title">Products I've shipped</h2>
        <p className="section-subtitle">
          Full-stack applications showcasing my development skills across
          web, AI, and data-driven products.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
};
