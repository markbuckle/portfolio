import React from "react";
// import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export const Resume = () => {
  return (
    <section id="resume">
          <h1 className="resume-title">Resume
          </h1>
          {/* <p className="hero-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptuous.
          </p> */}
          <div>
            <a 
                href="/resume.pdf" 
                target="_blank" // specifies to open in a new window
                rel="noopener noreferrer" // noopener - prevents new page from accessing the window.opener (safety from phishing). noreferrer - prevents browser from sending the referer header.
                className="resume-button view-resume-button" > 
                View 
            </a> 
            <a 
                href="/resume.pdf" 
                download 
                className="resume-button download-resume-button" > 
                Download
            </a>
          </div>
    </section>
  );
};
