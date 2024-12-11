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
    <section id="skills" className={`py-20 section-fade ${theme === 'dark' ? 'bg-background' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary">
          <RoughNotation type="underline" color={theme === 'dark' ? "#86C232" : "#4a9d4a"} show={true} strokeWidth={3} animationDuration={2000}>
            My Toolkit
          </RoughNotation>
        </h2>
        <div className="bg-highlight p-6 rounded-lg shadow-md font-mono text-sm md:text-base">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-text whitespace-pre-line">
            {skillsData.map((skill, index) => (
              <div key={index}>
                <span className="text-primary">&gt;&gt;&gt; Stephan.{skill.name}</span>
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
