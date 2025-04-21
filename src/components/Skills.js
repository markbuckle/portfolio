import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import 'boxicons/css/boxicons.min.css';

const skillsData = [
  {
    id: 1,
    title: "JavaScript",
    description: "API calls. Sync and Async behavior. Frontend and backend JS frameworks.",
    icon: "bx bxl-javascript",
    tag: ["All", "Frontend"],
  },
  {
    id: 2,
    title: "React",
    description: "Components, Typescript (TSX), JSX, React Props, State, Hooks, Async Data, Conditional Rendering, Async/Await, Data Fetching",
    icon: "bx bxl-react",
    tag: ["All", "Frontend"],
  },
  {
    id: 3,
    title: "Node.js",
    description: "Express JS, PassportJS, JWTs, OAuth, and file handling",
    icon: "bx bxl-nodejs",
    tag: ["All", "Backend"],
  },
  {
    id: 4,
    title: "Python",
    description: "Data Analysis and Machine Learning concepts. Django Web Frameworks",
    icon: "bx bxl-python",
    tag: ["All", "Backend"],
  },
  {
    id: 5,
    title: "Java",
    description: "Object-oriented programming, encapsulation, constructors, inheritance, Maven, and Scala.",
    icon: "bx bxl-java",
    tag: ["All", "Backend"],
  },
  {
    id: 6,
    title: "HTML/HTML5",
    description: "Block and Inline level modern tags, tables, forms, templating, code formatting.",
    icon: "bx bxl-html5",
    tag: ["All", "Frontend"],
  },
  {
    id: 7,
    title: "CSS",
    description: "Flexbox, Grids, Layering, Responsive Design. Used CSS frameworks such as Tailwind and BootStrap.",
    icon: "bx bxl-css3",
    tag: ["All", "Frontend"],
  },
  {
    id: 8,
    title: "PostgreSQL",
    description: "Queries and connecting DB with various backend frameworks like Django, Spring Boot, NodeJS.",
    icon: "bx bxl-postgresql",
    tag: ["All", "Database"],
  },
  {
    id: 9,
    title: "MongoDB",
    description: "Queries, Connections, Clusters and connecting with other frameworks.",
    icon: "bx bxl-mongodb",
    tag: ["All", "Database"],
  },
  {
    id: 10,
    title: "AWS",
    description: "SDK, IAM, Lambda, EC2, S3, Cloudwatch, Beanstalk for scalable cloud deployments.",
    icon: "bx bxl-aws",
    tag: ["All", "Cloud"],
  },
  {
    id: 11,
    title: "Project Management",
    description: "Agile and Waterfall Methodology. Earned-Value Management.",
    icon: "bx bx-group",
    tag: ["All", "Other"],
  },
  {
    id: 12,
    title: "Docker",
    description: "Building, managing and deploying containerized applications for consistent environments.",
    icon: "bx bxl-docker",
    tag: ["All", "Containers"],
  },
  {
    id: 13,
    title: "Colima",
    description: "Container runtime for macOS with Docker compatibility and optimized resource management.",
    icon: "bx bx-server",
    tag: ["All", "Containers"],
  },
  {
    id: 14,
    title: "OpenAI",
    description: "Integrating GPT models for natural language processing, content generation and analysis.",
    icon: "bx bx-brain",
    tag: ["All", "AI Integration"],
  },
  {
    id: 15,
    title: "Anthropic",
    description: "Implementing Claude models for conversational AI with enhanced reasoning capabilities.",
    icon: "bx bx-conversation",
    tag: ["All", "AI Integration"],
  },
  {
    id: 16,
    title: "HuggingFace",
    description: "Leveraging open-source models for text classification, sentiment analysis and language tasks.",
    icon: "bx bx-chip",
    tag: ["All", "AI Integration"],
  },
  {
    id: 17,
    title: "Mistral",
    description: "Deploying efficient language models for specialized domain applications and content generation.",
    icon: "bx bx-bot",
    tag: ["All", "AI Integration"],
  },
  {
    id: 18,
    title: "SFTP",
    description: "Implementing secure file transfer protocols for encrypted data transmission in sensitive environments.",
    icon: "bx bx-lock-alt",
    tag: ["All", "Cybersecurity"],
  },
  {
    id: 19,
    title: "OAuth",
    description: "Setting up federated authentication workflows for secure API access and user authorization.",
    icon: "bx bx-key",
    tag: ["All", "Cybersecurity"],
  },
  {
    id: 20,
    title: "JWT",
    description: "Implementing JSON Web Tokens for stateless authentication and secure information exchange.",
    icon: "bx bx-certification",
    tag: ["All", "Cybersecurity"],
  },
  {
    id: 21,
    title: "Okta",
    description: "Configuring identity management services for enterprise-grade authentication and user lifecycle management.",
    icon: "bx bx-shield-quarter",
    tag: ["All", "Cybersecurity"],
  },
  {
    id: 22,
    title: "Windows",
    description: "Building and deploying applications in Windows environments with .NET integration capabilities.",
    icon: "bx bxl-windows",
    tag: ["All", "Operating Systems"],
  },
  {
    id: 23,
    title: "Linux (Ubuntu)",
    description: "Managing server environments, shell scripting, and deployment automation for web applications.",
    icon: "bx bxl-tux",
    tag: ["All", "Operating Systems"],
  },
  {
    id: 24,
    title: "Mac",
    description: "Developing cross-platform applications with macOS-specific optimizations and tooling.",
    icon: "bx bxl-apple",
    tag: ["All", "Operating Systems"],
  },
  {
    id: 25,
    title: "CI/CD",
    description: "Implementing automated testing and deployment pipelines for continuous software delivery.",
    icon: "bx bx-infinite",
    tag: ["All", "DevOps"],
  },
  {
    id: 26,
    title: "GitHub",
    description: "Managing repositories, pull requests, actions, and collaborative workflows for effective version control.",
    icon: "bx bxl-github",
    tag: ["All", "DevOps"],
  },
  {
    id: 27,
    title: "VS Code",
    description: "Utilizing extensions, debugging tools, and integrated terminal for efficient frontend and backend development.",
    icon: "bx bxl-visual-studio",
    tag: ["All", "DevOps"],
  },
  {
    id: 28,
    title: "IntelliJ",
    description: "Leveraging advanced refactoring, code analysis, and integrated tooling for Java and enterprise application development.",
    icon: "bx bxl-java",
    tag: ["All", "DevOps"],
  },
  {
    id: 29,
    title: "Salesforce",
    description: "Building custom CRM solutions for financial cybersecurity projects, including secure client reporting, compliance tracking, and automated project status management.",
    icon: "bx bx-cloud",
    tag: ["All", "Other"],
  },
];

const SkillTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected ? "selected-tag" : "tag";
  return (
    <button
      className={`${buttonStyles} tag-base`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

const SkillCard = ({ title, description, icon }) => {
  return (
    <div className="skills-card-full">
      <i className={`bx ${icon}`}></i>
      <div className="skills-card-content">
        <h5 className="skill-title">{title}</h5>
        <p className="skill-description">{description}</p>
      </div>
    </div>
  );
};

export const Skills = () => {
  const [tag, setTag] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
    setIsVisible(false); // Reset visibility for re-animation 
    setTimeout(() => setIsVisible(true), 100); // Add slight delay to restart animation
  };

  const filteredSkills = tag === "All"
    ? skillsData
    : skillsData.filter((skill) =>
        skill.tag.includes(tag)
      );

  const cardVariants = {
    initial: { y: 0, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="skills" id="skills">
      <div className="skills-gradient-top-right"></div>
      <div className="skills-gradient-bottom-left"></div>
      <div className="skills-content">
        <h1 className="skills-title">
          My Skills
        </h1>
        <div className="tags-container">
          <SkillTag
            onClick={handleTagChange}
            name="All"
            isSelected={tag === "All"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Frontend"
            isSelected={tag === "Frontend"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Backend"
            isSelected={tag === "Backend"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Database"
            isSelected={tag === "Database"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Cloud"
            isSelected={tag === "Cloud"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Containers"
            isSelected={tag === "Containers"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="AI Integration"
            isSelected={tag === "AI Integration"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Cybersecurity"
            isSelected={tag === "Cybersecurity"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Operating Systems"
            isSelected={tag === "Operating Systems"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="DevOps"
            isSelected={tag === "DevOps"}
          />
          <SkillTag
            onClick={handleTagChange}
            name="Other"
            isSelected={tag === "Other"}
          />
        </div>
        <div ref={ref} className="skills-list-grid">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.3, delay: index * 0.3 }}
              className="skills-grid-item"
            >
              <SkillCard
                key={skill.id}
                title={skill.title}
                description={skill.description}
                icon={skill.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};