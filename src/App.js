import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Banner } from "./components/Banner";
import { Sidebar } from "./components/Sidebar";
import { About } from "./components/About";
import { Skills } from "./components/Skills"; 
import { Projects } from "./components/Projects";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => { 
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <section id="banner">
            <Banner />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="resume">
            <Resume />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
