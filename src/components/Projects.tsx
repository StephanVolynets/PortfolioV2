import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ProjectsProps {
  theme: string;
}

// Project data
const projects = [
  {
    title: 'Crypto Portfolio Tracker',
    description: 'A full-stack application for tracking cryptocurrency investments with real-time data, portfolio analytics, and transaction history.',
    image: '/projects/crypto-portfolio.webp',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Decentralized Exchange',
    description: 'A decentralized exchange platform built on Solana, featuring token swaps, liquidity pools, and yield farming capabilities.',
    image: '/projects/dex-platform.webp',
    tags: ['Solana', 'Rust', 'React', 'Web3.js', 'Anchor', 'TypeScript'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'AI Powered Task Manager',
    description: 'Smart task management application that uses machine learning to prioritize and categorize tasks based on user behavior patterns.',
    image: '/projects/ai-task-manager.webp',
    tags: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Blockchain Data Visualizer',
    description: 'Interactive dashboard for visualizing on-chain data, transaction flows, and network metrics across multiple blockchains.',
    image: '/projects/blockchain-viz.webp',
    tags: ['D3.js', 'React', 'GraphQL', 'Node.js', 'Express', 'Web3'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Secure Messaging dApp',
    description: 'End-to-end encrypted messaging application with blockchain-based identity verification and decentralized storage.',
    image: '/projects/secure-messaging.webp',
    tags: ['React Native', 'Solidity', 'IPFS', 'Ethereum', 'TypeScript', 'Redux'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Smart Home Automation Hub',
    description: 'IoT platform for managing smart home devices with voice control, automation rules, and energy usage optimization.',
    image: '/projects/smart-home.webp',
    tags: ['IoT', 'Node.js', 'MongoDB', 'MQTT', 'React', 'Express'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  }
];

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;

    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <AnimatedSection 
      id="projects" 
      className={`py-24 ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}
      animation="fadeInUp"
      threshold={0.1}
    >
      <style>{`
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .project-card:hover {
          transform: scale(1.02);
        }

        .project-card.active {
          transition: transform 0.1s ease;
        }

        .tag-animation {
          animation: tagFloat 2s ease-in-out infinite;
        }

        @keyframes tagFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .card-content {
          transition: transform 0.1s ease;
          transform-style: preserve-3d;
        }
      `}</style>
      
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          Featured Projects
        </h2>
        
        <AnimatedSection 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          animation="fadeInUp"
          stagger={true}
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`project-card rounded-xl overflow-hidden shadow-lg ${
                theme === 'dark' ? 'bg-code' : 'bg-white'
              } ${hoveredProject === index ? 'active' : ''}`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => {
                setHoveredProject(null);
                handleMouseLeave();
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              <div
                className="card-content"
                style={{
                  transform: hoveredProject === index
                    ? `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
                    : 'rotateX(0) rotateY(0)'
                }}
              >
                <div className="project-image-container h-48 bg-gray-300 overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 transform hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.image || 'https://via.placeholder.com/400x200?text=Project+Image'})`
                    }}
                  ></div>
                </div>
                
                <div className="card-content p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">{project.title}</h3>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-text' : 'text-gray-800'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`tag-animation text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded ${
                          theme === 'dark' 
                            ? 'bg-accent text-text' 
                            : 'bg-gray-200 text-gray-800'
                        }`}
                        style={{
                          animationDelay: `${tagIndex * 0.1}s`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-secondary transition-colors transform hover:scale-110"
                    >
                      <Github size={20} className="mr-2" /> GitHub
                    </a>
                    <a 
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-secondary transition-colors transform hover:scale-110"
                    >
                      <ExternalLink size={20} className="mr-2" /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default Projects;
