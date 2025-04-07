import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  User,
  Code,
  FileText,
  Folder,
  Mail,
  BarChart,
  Repeat,
  Coffee
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
  { name: 'CV', href: '#cv', description: 'Professional experience', icon: <FileText className="h-4 w-4" /> },
  { name: 'Projects', href: '#projects', description: 'Featured work', icon: <Folder className="h-4 w-4" /> },
];

const navigation: NavSection[] = [
  { name: 'Portfolio', items: portfolioItems, icon: <User className="h-4 w-4" /> },
  { 
    name: 'Contact', 
    items: [{ name: 'Get in Touch', href: '#contact', description: 'Send me a message', icon: <Mail className="h-4 w-4" /> }],
    icon: <Mail className="h-4 w-4" />
  },
  { 
    name: 'Blockchain', 
    items: [
      { name: 'Analytics', href: '#analytics', description: 'Blockchain metrics', icon: <BarChart className="h-4 w-4" /> },
      { name: 'Swap', href: '#swap', description: 'Token exchange', icon: <Repeat className="h-4 w-4" /> },
      { name: 'Support', href: '#donation', description: 'Buy me a coffee with SOL', icon: <Coffee className="h-4 w-4" /> }
    ],
    icon: <BarChart className="h-4 w-4" />
  }
];

const VerticalNav: React.FC<VerticalNavProps> = ({ theme }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['Portfolio']);

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

  return (
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
  );
};

export default VerticalNav; 