import React from 'react';
import { CV } from './CV';

interface AboutProps {
  theme: string;
}

const About: React.FC<AboutProps> = ({ theme }) => {
  return (
    <div className={`py-24 ${theme === "dark" ? "bg-highlight" : "bg-gray-100"}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          About Me
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <p className={`text-lg mb-6 ${theme === "dark" ? "text-text" : "text-gray-800"}`}>
            Hello! I'm Stephan, a passionate <strong className="text-primary">Computer Science</strong> student at Cornell University with a focus on software development and blockchain technology.
          </p>
          
          <p className={`text-lg mb-6 ${theme === "dark" ? "text-text" : "text-gray-800"}`}>
            My journey in programming began when I was 14, tinkering with code to build interactive websites. This early fascination evolved into a deep interest in creating innovative solutions to real-world problems.
          </p>
          
          <div className="bg-code p-6 rounded-lg mb-8 overflow-x-auto">
            <pre className="text-primary">
              <code>
                {`const stephan = {
  education: "Computer Science @ Cornell University",
  interests: ["Web Development", "Blockchain", "AI", "Data Science"],
  technologies: {
    frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "Java"],
    databases: ["MongoDB", "SQL", "Firebase"],
    blockchain: ["Solana", "Ethereum", "Smart Contracts"]
  },
  currentlyLearning: "Advanced Distributed Systems",
  funFact: "I've written over 100,000 lines of code since I started programming!"
};`}
              </code>
            </pre>
          </div>
          
          <p className={`text-lg mb-6 ${theme === "dark" ? "text-text" : "text-gray-800"}`}>
            I'm particularly excited about the intersection of 
            <span className="text-primary"> blockchain technology </span>
            and everyday applications. My goal is to develop solutions that make decentralized systems more accessible and user-friendly.
          </p>
          
          <p className={`text-lg ${theme === "dark" ? "text-text" : "text-gray-800"}`}>
            When I'm not coding, you can find me exploring hiking trails, playing chess, or experimenting with new cooking recipes. I believe in a balanced approach to life and work, which helps me maintain creativity and focus in my projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;