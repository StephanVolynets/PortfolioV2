import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import CV from './CV';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Hero theme={''} />
      <About theme={''} />
      <Skills theme={''} />
      <CV theme={''} />
      <Projects theme={''} />
      <Contact theme={''} />
      <Footer theme={''} />
    </ThemeProvider>
  );
};

export default App; 