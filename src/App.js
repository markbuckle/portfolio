import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Banner } from "./components/Banner";
import { About } from "./components/About";
import { Skills } from "./components/Skills"; 
import { Projects } from "./components/Projects";
import { Sidebar } from "./components/Sidebar";
// import { Footer } from "./components/Footer";

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
          <Routes>
            <Route path="/" element={
              <>
                <Banner />

              </>
            } />
            <Route path="/home" element={
              <>
                <Banner />
              </>
            } />
            <Route path="/about" element={
              <>
                <About />
              </>
            } />
            <Route path="/skills" element={
              <>
                <Skills />

              </>
            } />
            <Route path="/projects" element={
              <>
                <Projects />
              </>
            } />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;