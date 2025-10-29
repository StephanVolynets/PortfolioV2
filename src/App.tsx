import React, { useEffect, useState, lazy, Suspense } from 'react';
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
import { Toaster } from 'sonner';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load heavy components
const DonationWidget = lazy(() => import('./components/DonationWidget'));
const SwapInterface = lazy(() => import('./components/Swap/SwapInterface').then(module => ({ default: module.SwapInterface })));

function App() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
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
    <ThemeProvider>
      <WalletContextProvider>
        <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <div className="flex flex-col lg:flex-row">
            <VerticalNav theme={theme} />
            <main className="flex-1 lg:ml-64 pt-14">
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
              <section id="swap" className="py-16 bg-background">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-primary">
                    Swap Tokens
                  </h2>
                  <p className="text-center text-text max-w-2xl mx-auto mb-10">
                    Try out a decentralized exchange interface powered by 0x Protocol. Connect your wallet to trade tokens on Base network with the best rates from multiple liquidity sources.
                  </p>
                  <div className="flex justify-center">
                    <Suspense fallback={<div>Loading swap interface...</div>}>
                      <SwapInterface />
                    </Suspense>
                  </div>
                </div>
              </section>
              <section id="donation" className="py-8 sm:py-16">
                <div className="px-4 sm:px-6 max-w-md mx-auto">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-primary">
                    Support My Work
                  </h2>
                  <Suspense fallback={<div>Loading donation widget...</div>}>
                    <DonationWidget 
                      recipientAddress="4NicjQQ4rpb6xy1zfuyGNgYzKs5jydvtnEctxpTNMWVX" 
                      theme={theme} 
                    />
                  </Suspense>
                </div>
              </section>
              <section id="contact">
                <Contact theme={theme} />
              </section>
            </main>
          </div>
          <Footer theme={theme} />
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 bg-primary text-background p-2 sm:p-3 rounded-full shadow-lg hover:bg-secondary transition-colors duration-300 z-30"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="sm:w-5 sm:h-5" />
            </button>
          )}
          <Toaster position="bottom-right" />
        </div>
      </WalletContextProvider>
    </ThemeProvider>
  );
}

export default App;