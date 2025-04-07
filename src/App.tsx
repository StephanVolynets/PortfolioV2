import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import VerticalNav from './components/VerticalNav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { WalletContextProvider } from './components/WalletProvider';
import DonationWidget from './components/DonationWidget';
import { Toaster } from 'sonner';
// import Head from 'next/head';

function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <WalletContextProvider>
      <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <div className="flex">
          <VerticalNav theme={theme} />
          <main className="flex-1 lg:ml-64">
            <section id="hero">
              <Hero theme={theme} />
            </section>
            <section id="about">
              <About theme={theme} />
            </section>
            <section id="skills">
              <Skills theme={theme} />
            </section>
            <section id="projects">
              <Projects theme={theme} />
            </section>
            <section id="contact">
              <Contact theme={theme} />
            </section>
            <section id="donation" className="py-16">
              <DonationWidget 
                recipientAddress="4NicjQQ4rpb6xy1zfuyGNgYzKs5jydvtnEctxpTNMWVX" 
                theme={theme} 
              />
            </section>
          </main>
        </div>
        <Footer theme={theme} />
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary text-background p-3 rounded-full shadow-lg hover:bg-secondary transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        )}
        <Toaster position="bottom-right" />
      </div>
    </WalletContextProvider>
  );
}

export default App;
