import React from "react";
import { motion } from "framer-motion";

export const Resume = () => {
  return (
    <section className="resume-container" id="resume">
      <div className="resume">
      <div className="resume-gradient-top-right"></div>
      <div className="resume-gradient-bottom-left"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="resume-title">Resume</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="resume-buttons">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button view-resume-button"
            >
              View
            </a>
            <a
              href="/resume.pdf"
              download
              className="resume-button download-resume-button"
            >
              Download
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
