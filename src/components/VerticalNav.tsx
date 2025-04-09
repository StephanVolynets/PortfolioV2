import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  User,
  Code,
  FileText,
  Folder,
  Mail,
  BarChart,
  Repeat,
  Coffee,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavSection {
  name: string;
  items: NavItem[];
  icon?: React.ReactNode;
}

interface VerticalNavProps {
  theme: string;
}

const portfolioItems: NavItem[] = [
  { name: 'About', href: '#about', description: 'Learn more about me', icon: <User className="h-4 w-4" /> },
  { name: 'Skills', href: '#skills', description: 'Technical expertise', icon: <Code className="h-4 w-4" /> },
  { name: 'Projects', href: '#projects', description: 'Featured work', icon: <Folder className="h-4 w-4" /> },
];

const navigation: NavSection[] = [
  { name: 'Portfolio', items: portfolioItems, icon: <User className="h-4 w-4" /> },
  { 
    name: 'Blockchain', 
    items: [
      { name: 'Swap', href: '#swap', description: 'Token exchange', icon: <Repeat className="h-4 w-4" /> },
      { name: 'Support', href: '#donation', description: 'Buy me a coffee with SOL', icon: <Coffee className="h-4 w-4" /> }
    ],
    icon: <BarChart className="h-4 w-4" />
  },
  { 
    name: 'Contact', 
    items: [{ name: 'Get in Touch', href: '#contact', description: 'Send me a message', icon: <Mail className="h-4 w-4" /> }],
    icon: <Mail className="h-4 w-4" />
  }
];

const VerticalNav: React.FC<VerticalNavProps> = ({ theme }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Portfolio']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Auto-expand section containing active item
            const section = navigation.find(section => 
              section.items.some(item => item.href.slice(1) === entry.target.id)
            );
            if (section && !expandedSections.includes(section.name)) {
              setExpandedSections(prev => [...prev, section.name]);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0.3
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [expandedSections]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Handle mobile menu toggle button
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle scroll locking when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Handle mobile menu close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button 
        onClick={toggleMobileMenu}
        className="fixed z-50 bottom-6 left-6 lg:hidden p-3 rounded-full bg-primary text-white shadow-lg"
        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Desktop navigation */}
      <nav className={cn(
        "fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r",
        "hidden lg:block backdrop-blur-sm",
        theme === 'dark' 
          ? 'bg-background/95 border-r-accent/20' 
          : 'bg-white/95 border-r-accent/10'
      )}>
        <div className="px-4 py-6">
          {navigation.map((section) => (
            <div key={section.name} className="mb-6">
              <button
                onClick={() => toggleSection(section.name)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-3 text-sm font-semibold rounded-lg",
                  "transition-all duration-200",
                  expandedSections.includes(section.name)
                    ? theme === 'dark'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-lime-100 text-lime-600'
                    : theme === 'dark'
                      ? 'hover:bg-highlight text-text'
                      : 'hover:bg-accent/10 text-foreground'
                )}
              >
                <div className="flex items-center space-x-3">
                  {section.icon}
                  <span className="tracking-wide">{section.name}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections.includes(section.name) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedSections.includes(section.name) ? 'auto' : 0,
                  opacity: expandedSections.includes(section.name) ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 pl-4">
                  {section.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-3 text-sm rounded-md",
                        "transition-all duration-200 font-medium",
                        activeSection === item.href.slice(1)
                          ? "bg-primary/20 text-primary"
                          : theme === 'dark'
                            ? "text-accent hover:text-text hover:bg-highlight"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      )}
                    >
                      {item.icon}
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        {item.description && (
                          <span className="text-xs text-accent line-clamp-1 mt-0.5">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </nav>
      
      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile menu */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "fixed left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto p-6",
                theme === 'dark'
                  ? 'bg-background border-r border-r-accent/20'
                  : 'bg-white border-r border-r-accent/10'
              )}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md hover:bg-accent/10"
                >
                  <X size={24} className="text-accent" />
                </button>
              </div>
              
              {navigation.map((section) => (
                <div key={section.name} className="mb-6">
                  <button
                    onClick={() => toggleSection(section.name)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-3 text-base font-semibold rounded-lg",
                      "transition-all duration-200",
                      expandedSections.includes(section.name)
                        ? theme === 'dark'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-lime-100 text-lime-600'
                        : theme === 'dark'
                          ? 'hover:bg-highlight text-text'
                          : 'hover:bg-accent/10 text-foreground'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <span className="tracking-wide">{section.name}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedSections.includes(section.name) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedSections.includes(section.name) ? 'auto' : 0,
                      opacity: expandedSections.includes(section.name) ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pl-4">
                      {section.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={handleNavClick}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-4 text-base rounded-md",
                            "transition-all duration-200 font-medium",
                            activeSection === item.href.slice(1)
                              ? "bg-primary/20 text-primary"
                              : theme === 'dark'
                                ? "text-accent hover:text-text hover:bg-highlight"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                          )}
                        >
                          {item.icon}
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            {item.description && (
                              <span className="text-xs text-accent line-clamp-1 mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalNav; 