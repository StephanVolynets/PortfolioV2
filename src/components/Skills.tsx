import React, { useState, useEffect } from 'react';
import { RoughNotation } from 'react-rough-notation';

interface SkillsProps {
  theme: string;
}

const skillsData = [
  { name: 'currentLocation', value: '"Ithaca, NY"' },
  { name: 'contactInfo', value: '["sv468@cornell.edu", "LinkedIn", "GitHub"]' },
  { name: 'education', value: '"B.A. Computer Science - Cornell University"' },
  { name: 'skills', value: '["Python", "Java (OOP)", "React.js", "SQL", "MongoDB", "JavaScript", "Express.js", "Node.js", "CSS & SASS", "Data Structures & Algorithms"]' },
];

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentSkillIndex < skillsData.length) {
      const timer = setTimeout(() => {
        if (currentText.length < skillsData[currentSkillIndex].name.length) {
          setCurrentText(prev => prev + skillsData[currentSkillIndex].name[currentText.length]);
        } else if (currentText.length === skillsData[currentSkillIndex].name.length) {
          setCurrentText(prev => prev + ': ' + skillsData[currentSkillIndex].value);
        } else {
          setTimeout(() => {
            setCurrentSkillIndex(prev => prev + 1);
            setCurrentText('');
          }, 1000);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentSkillIndex, currentText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="skills" className="py-20 section-fade bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary">
          <RoughNotation type="underline" color={theme === 'dark' ? "#86C232" : "#4a9d4a"} show={true} strokeWidth={3}>
            My Toolkit
          </RoughNotation>
        </h2>
        <div className="bg-highlight p-6 rounded-lg shadow-md font-mono text-sm md:text-base">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-text">
            {skillsData.map((skill, index) => (
              <div key={index} className={index <= currentSkillIndex ? '' : 'hidden'}>
                <span className="text-primary">&gt; Stephan.</span>
                {index === currentSkillIndex ? currentText : skill.name + ': ' + skill.value}
                {index === currentSkillIndex && showCursor && <span className="animate-pulse">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;