import React from 'react';
import { Terminal, Code2, Brain, Database } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

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
  return (
    <AnimatedSection
      id="skills"
      className={`py-24 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}
      animation="fadeInUp"
      threshold={0.2}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          Technical Expertise
        </h2>
        
        <AnimatedSection 
          className="max-w-5xl mx-auto"
          animation="fadeInUp" 
          stagger={true}
        >
          <div className="mb-12 bg-terminal rounded-lg shadow-lg p-4 overflow-hidden">
            <div className="flex mb-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="font-mono text-text overflow-x-auto">
              <div className="console-line mb-2 flex">
                <span className="text-primary mr-2">$</span>
                <span>skillset.display()</span>
              </div>
              
              {skillsData.map((skill, index) => (
                <div key={index} className="console-line mb-4 ml-4">
                  <div className="flex items-center mb-1">
                    <skill.icon size={18} className="mr-2" style={{ color: skill.color }} />
                    <span className="text-primary">{skill.name}:</span>
                  </div>
                  <div className="ml-6 text-text whitespace-pre-wrap break-words">{skill.value}</div>
                </div>
              ))}
              
              <div className="console-line mb-2 animate-blink">
                <span className="text-primary mr-2">$</span>
                <span className="blink">█</span>
              </div>
            </div>
          </div>
          
          <AnimatedSection animation="zoomIn" delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
                <h3 className="text-xl font-bold mb-3 text-primary">Front-End Development</h3>
                <ul className="space-y-2 text-text">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    React & Next.js
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    TypeScript/JavaScript
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Tailwind CSS & SASS
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    UI/UX Design
                  </li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
                <h3 className="text-xl font-bold mb-3 text-primary">Back-End Development</h3>
                <ul className="space-y-2 text-text">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Node.js & Express
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Python & Django
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    MongoDB & SQL
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    RESTful APIs
                  </li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
                <h3 className="text-xl font-bold mb-3 text-primary">Blockchain Development</h3>
                <ul className="space-y-2 text-text">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Solana & Web3
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Smart Contracts
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    DeFi Applications
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                    Distributed Systems
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
