import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";

const projectsData = [
  {
    id: 1,
    title: "HealthLync",
    description: "Personalized Health Tracker",
    image: projImg3,
    tag: ["All", "Web"],
    gitUrl: "https://github.com/markbuckle/health-tracker",
    previewUrl: "https://the-health-tracker.vercel.app/",
    techStack: "Built with html, handlebars, css, javascript, node.js, express.js, passport.js, and MongoDB"
  },
  {
    id: 2,
    title: "DocChat",
    description: "AI PDF Upload Chatbot",
    image: projImg2,
    url: "https://thepdfchatbot.streamlit.app/",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/markbuckle/ai-pdf-chatbot",
    previewUrl: "https://thepdfchatbot.streamlit.app/",
    techStack: "Built with Python and Streamlit"
  },
  {
    id: 3,
    title: "FeedFlo",
    description: "User Feedback Tool",
    image: projImg1,
    tag: ["All", "Web"],
    gitUrl: "https://github.com/markbuckle/saas-app",
    previewUrl: "https://saasdashboard.vercel.app/",
    techStack: "Built with React, NextJs, Vite, Shadcn-UI, Clerk, Supabase/PostgresSQL, Drizzle and Stripe"
  }
];

// const ProjectTag = ({ name, onClick, isSelected }) => {
//   const buttonStyles = isSelected ? "selected-tag" : "tag"
//   return (
//     <button
//       className={`${buttonStyles} tag-base`}
//       onClick={() => onClick(name)}
//     >
//       {name}
//     </button>
//   );
// };

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, techStack}) => { 
    return ( 
      <div className="project-card-full"> 
        <div className="project-card-image">
          <img className="project-card" src={imgUrl} alt={title} />
          <div className="overlay">
            <div className="overlay-txt">
              <a href={gitUrl} className="icon-button" target="_blank" rel="noopener noreferrer">
                <CodeBracketIcon className="icon" />
              </a>
              <a href={previewUrl} className="icon-button" target="_blank" rel="noopener noreferrer">
                <EyeIcon className="icon" />
              </a>
            </div>
            <div className="overlay-tech-stack">{techStack}</div> 
          </div>
        </div>
        <div className="project-card-content"> 
          <h5 className="project-title">{title}</h5>
          <p className="project-description">{description}</p> 
        </div> 
      </div> 
    );
};

export const Projects = () => {
  const [tag] = useState("All"); // add in setTag next to tag if using tags
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // const handleTagChange = (newTag) => {
  //   setTag(newTag);
  // };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h1 className="projects-title">
        My Projects
      </h1>
      <p className="projects-subtitle">This portfolio was built with React and Animate CSS.</p>
      {/* <div className="tags-container">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div> */}
      <div ref={ref} className="projects-list">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              techStack={project.techStack}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};