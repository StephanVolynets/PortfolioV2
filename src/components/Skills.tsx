import React, { useEffect, useRef } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { Terminal, Code2, Database, Brain } from 'lucide-react';

interface SkillsProps {
  theme: string;
}

const skillsData = [
  {
    name: 'currentLocation',
    value: '"Ithaca, NY"',
    icon: Terminal,
    color: '#86C232'
  },
  {
    name: 'contactInfo',
    value: '["svv6@cornell.edu", "linkedin.com/in/stephan-volynets", "github.com/StephanVolynets"]',
    icon: Code2,
    color: '#61892F'
  },
  {
    name: 'education',
    value: '"B.A. Computer Science - Cornell University"',
    icon: Brain,
    color: '#6B6E70'
  },
  {
    name: 'skills',
    value: '["Python", "Java", "React", "SQL", "JavaScript", "MongoDB", "Express.js", "Node.js", "CSS & SASS", "Data Structures & Algorithms"]',
    icon: Database,
    color: '#86C232'
  }
];

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-terminal');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={`py-24 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}>
      <style>{`
        .terminal-window {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transform: perspective(1000px) rotateX(0deg);
          transition: transform 0.3s ease;
        }

        .terminal-window:hover {
          transform: perspective(1000px) rotateX(5deg);
        }

        .terminal-header {
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .window-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .close { background-color: #ff5f56; }
        .minimize { background-color: #ffbd2e; }
        .maximize { background-color: #27c93f; }

        .animate-terminal .skill-item {
          opacity: 0;
          transform: translateY(20px);
          animation: slideIn 0.5s ease forwards;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .skill-item {
          opacity: 0;
          transform: translateY(20px);
        }

        .animate-terminal .skill-item:nth-child(1) { animation-delay: 0.2s; }
        .animate-terminal .skill-item:nth-child(2) { animation-delay: 0.4s; }
        .animate-terminal .skill-item:nth-child(3) { animation-delay: 0.6s; }
        .animate-terminal .skill-item:nth-child(4) { animation-delay: 0.8s; }

        .skill-icon {
          transition: transform 0.3s ease;
        }

        .skill-item:hover .skill-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .terminal-cursor {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        .skill-value {
          position: relative;
          overflow: hidden;
        }

        .skill-value::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background-color: var(--color-primary);
          animation: cursor 0.6s step-end infinite;
        }

        @keyframes cursor {
          50% { opacity: 0; }
        }
      `}</style>
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16 text-center text-primary">
          <RoughNotation 
            type="underline" 
            color={theme === 'dark' ? "#86C232" : "#4a9d4a"} 
            show={true} 
            strokeWidth={3} 
            animationDuration={2000}
          >
            My Data
          </RoughNotation>
        </h2>
        <div 
          ref={terminalRef}
          className={`terminal-window ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}
        >
          <div className={`terminal-header ${theme === 'dark' ? 'bg-accent' : 'bg-gray-200'}`}>
            <div className="window-button close"></div>
            <div className="window-button minimize"></div>
            <div className="window-button maximize"></div>
            <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-text' : 'text-gray-700'}`}>
              developer@stephan-portfolio ~ 
            </span>
          </div>
          <div className="p-8 font-mono text-md md:text-lg space-y-6">
            {skillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div 
                  key={index} 
                  className={`skill-item flex items-start gap-4 ${
                    theme === 'dark' ? 'text-text' : 'text-gray-800'
                  }`}
                >
                  <div 
                    className="skill-icon p-2 rounded-lg"
                    style={{ 
                      backgroundColor: theme === 'dark' 
                        ? 'rgba(134, 194, 50, 0.1)' 
                        : 'rgba(74, 157, 74, 0.1)',
                      color: skill.color
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <span className="text-primary font-semibold">
                      &gt; Stephan.{skill.name}
                    </span>
                    <div className="skill-value mt-2 pl-4 border-l-2 border-primary">
                      {skill.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
