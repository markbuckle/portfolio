import React, { useState } from "react";
import { motion } from "framer-motion";
import headshot2 from '../assets/img/headshot2.jpg'

const TAB_DATA = [
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="about-list">
        <li>Memorial University of Newfoundland<br></br>B.Eng</li>
        <li>University of Calgary<br></br>Precision Health <br></br>Post-Graduate Program</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="about-list">
        <li>GetCoding - Intro to Web Development</li>
      </ul>
    ),
  },
];

const TabButton = ({ active, selectTab, children }) => {
    return (
      <button 
        onClick={selectTab} 
        className={`about-tab-button ${active ? 'active' : ''}`}
      >
        {children}
        <motion.div
          animate={active ? "active" : "default"}
          variants={{
            default: { width: 0 },
            active: { width: "calc(100% - 0.75rem)" }
          }}
          className="about-tab-underline"
        ></motion.div>
      </button>
    );
  };

export const About = () => {
  const [tab, setTab] = useState("education");

  const handleTabChange = (id) => {
      setTab(id);
  };

  return (
    <section id="about" className="about-section">
    <div className="about-container">
      <h1>About Me</h1>
      <div className="about-content">
            <div className="about-text-container">
                <p className="about-description">
                    I am a full stack web developer with a passion for creating
                    interactive and responsive web applications. Please check out my background, skills and favourite projects below.
                </p>

                <div className="about-tabs">
                    <TabButton
                    selectTab={() => handleTabChange("education")}
                    active={tab === "education"}
                    >
                    Education
                    </TabButton>
                    <TabButton
                    selectTab={() => handleTabChange("certifications")}
                    active={tab === "certifications"}
                    >
                    Certifications
                    </TabButton>
                </div>
            
                <div className="about-tab-content">
                    {TAB_DATA.find((t) => t.id === tab).content}
                </div>
            </div>
            <div className="about-image-container">
                    <img 
                        src={headshot2}
                        alt="Mark Buckle Headshot" 
                        className="about-headshot"
                    />
                 </div>
        </div>
    </div>
  </section>
);
};