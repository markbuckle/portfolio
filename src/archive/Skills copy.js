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
    title: "TypeScript",
    description: "Enums, Interfaces, Classes, Constructors, Datatypes, Decorators, Modules, Any, using strict mode.",
    icon: "bx bxl-react",
    tag: ["All", "Frontend"],
  },
  {
    id: 3,
    title: "React",
    description: "Components, TSX, JSX, React Props, State, Hooks, Async Data, Conditional Rendering, Async/Await, Data Fetching",
    icon: "bx bxl-react",
    tag: ["All", "Frontend"],
  },
  {
    id: 4,
    title: "Node.js",
    description: "Express JS, PassportJS, JWTs, OAuth, and file handling",
    icon: "bx bxl-nodejs",
    tag: ["All", "Backend"],
  },
  {
    id: 5,
    title: "Python",
    description: "Data Analysis and Machine Learning concepts. Django Web Frameworks",
    icon: "bx bxl-python",
    tag: ["All", "Backend"],
  },
  {
    id: 6,
    title: "Java",
    description: "Object-oriented programming, encapsulation, constructors, inheritance, Maven, and Scala.",
    icon: "bx bxl-java",
    tag: ["All", "Backend"],
  },

  {
    id: 7,
    title: "HTML/HTML5",
    description: "Block and Inline level modern tags, tables, forms, templating, code formatting.",
    icon: "bx bxl-html5",
    tag: ["All", "Frontend"],
  },
  {
    id: 8,
    title: "CSS",
    description: "Flexbox, Grids, Layering, Responsive Design. Used CSS frameworks such as Tailwind and BootStrap.",
    icon: "bx bxl-css3",
    tag: ["All", "Frontend"],
  },
  {
    id: 9,
    title: "PostgreSQL",
    description: "Queries and connecting DB with various backend frameworks like Django, Spring Boot, NodeJS.",
    icon: "bx bxl-postgresql",
    tag: ["All", "Database"],
  },
  {
    id: 10,
    title: "MongoDB",
    description: "Queries, Connections, Clusters and connecting with other frameworks.",
    icon: "bx bxl-mongodb",
    tag: ["All", "Database"],
  },
  {
    id: 11,
    title: "AWS",
    description: "SDK, IAM, Lambda, EC2, S3, Cloudwatch, Beanstalk",
    icon: "bx bxl-aws",
    tag: ["All", "Cloud"],
  },
  {
    id: 12,
    title: "Project Management",
    description: "Agile and Waterfall Methodology. Earned-Value Management.",
    icon: "bx bx-group",
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
