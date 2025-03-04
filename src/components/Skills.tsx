import React from 'react';
import { RoughNotation } from 'react-rough-notation';

interface SkillsProps {
  theme: string;
}

const skillsData = [
  { name: 'currentLocation', value: '"Ithaca, NY"' },
  { name: 'contactInfo', value: '["svv6@cornell.edu", "linkedin.com/in/stephan-volynets", "github.com/StephanVolynets"]' },
  { name: 'education', value: '"B.A. Computer Science - Cornell University"' },
  { name: 'skills', value: '["Python", "Java", "React", "SQL", "JavaScript", "MongoDB", "Express.js", "Node.js", "CSS & SASS", "Data Structures & Algorithms"]' },
];

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  return (
    <section id="skills" className={`py-24 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}>
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
        <div className={`p-8 rounded-lg shadow-md font-mono text-md md:text-lg ${theme === 'dark' ? 'bg-highlight text-text' : 'bg-gray-100 text-gray-800'}`}>
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </div>
          <div className={`whitespace-pre-line leading-relaxed ${theme === 'dark' ? 'text-text' : 'text-gray-800'}`}>
            {skillsData.map((skill, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <span className="text-primary font-semibold">&gt;&gt;&gt; Stephan.{skill.name}</span>
                {"\n" + skill.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;