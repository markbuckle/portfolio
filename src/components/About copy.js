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
        <li>GetCoding - Web Development & Product Design</li>
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
            active: { width: "calc(100% - 0.1rem)" }
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
                    I transform ideas into interactive digital experiences. With a background in engineering and a passion for healthcare tech, 
                    I bring a unique perspective to full-stack development that bridges technical expertise with user-centered design.
                </p>
                <p className="about-description">
                    Whether building innovative backends or designing intuitive interfaces, I'm passionate about creating 
                    technology that's both powerful and accessible.
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