import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    // Reload the page and scroll to top
    window.scrollTo(0, 0);
    window.location.reload();
  };

  // Update navItems to include "CV" for display
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'cv', label: 'CV' }, // Keep the ID lowercase
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? (theme === 'dark' ? 'bg-background' : 'bg-gray-100') : 'bg-transparent'} ${theme === 'dark' ? 'text-text' : 'text-gray-900'}`}>
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <button 
          onClick={handleHomeClick}
          className="text-3xl font-bold text-primary focus:outline-none hover:opacity-80"
        >
          SV
        </button>
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)} // Use the lowercase ID for scrolling
              className={`nav-link text-lg font-semibold hover:text-primary capitalize ${theme === 'dark' ? 'text-text' : 'text-gray-800'}`}
            >
              {label} {/* Display the label, which can be "CV" */}
            </button>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className={`md:hidden py-6 ${theme === 'dark' ? 'bg-background' : 'bg-gray-100'}`}>
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)} // Use the lowercase ID for scrolling
              className={`block w-full py-3 px-6 text-left text-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 capitalize ${theme === 'dark' ? 'text-text' : 'text-gray-800'}`}
            >
              {label} {/* Display the label, which can be "CV" */}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
