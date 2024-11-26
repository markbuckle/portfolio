import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
// import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills"; 
import { Projects } from "./components/Projects";
import { Sidebar } from "./components/Sidebar";
// import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // By using the useEffect Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we'll refer to it as our “effect”), and call it later after performing the DOM updates.
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
    <div className="App">
      {/* <NavBar /> */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Banner />
        <Skills />
        <Projects />
        {/* <Contact /> */}
        <Footer />
      </main>
    </div>
  );
}

// -- Contact form only function --
// const App = () => {
//   return (
//     <div className="container">
//       <div className="left-column">
//         <div className="content">
//           <img src="/astronaut.png" alt="your-image-description-here" />
//         </div>
//       </div>
//       <div className="right-column">
//         <ContactForm />
//       </div>
//     </div>
//   );
// };

export default App;

//---- For CloudFare: ----//
// Default Task
// exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

// Build Task
// exports.build = series(scssTask, jsTask);

