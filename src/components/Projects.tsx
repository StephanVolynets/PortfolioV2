import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

interface ProjectsProps {
  theme: string;
}

const projects = [
  {
    title: 'Silicore.io',
    description: 'Developed as part of the "Build Better on Stellar: Smart Contract Challenge," Silicore is a platform that enables cryptocurrency traders to compare trusted exchanges, secure optimal rates, and trade efficiently. It provides real time data and insights, allowing users to make informed decisions by comparing various exchanges and their rates.',
    github: 'https://github.com/StephanVolynets/Silicore-front-end-local',
    live: 'https://www.silicore.io/',
    tags: ['Blockchain', 'Nest.js', 'Typescript', 'Web Sockets']
  },
  {
    title: 'Cornell Boxing Club - Event RSVP App',
    description: 'A modern, responsive React application to manage event RSVPs with real time updates, a dynamic grid layout, smooth animations, and mobile friendly design. Seamless RSVP functionality is supported by a modular component architecture and efficient API communication.',
    github: 'https://github.com/StephanVolynets/EVENT-RSVP-APP-MERN',
    live: 'https://stephanvolynets.github.io/EVENT-RSVP-APP-MERN/',
    tags: ['MongoDB', 'Express.js', 'Restful Architecture']
  },	
  {
    title: 'Census Trends Dashboard (Cornell – CS 3300)',
    description: 'Collaborated with a team of four to develop an interactive global visualization using Vanilla JS + D3.js by merging life expectancy data from the World Bank and population data from Our World In Data into a TopoJSON world map. Engineered data processing pipelines to reconcile disparate country names, align multiyear datasets, and compute dynamic color scales using a linear scale for life expectancy and a logarithmic scale for population.',
    github: 'https://github.com/StephanVolynets/info3300p2',
    live: 'https://stephanvolynets.github.io/info3300p2/',
    tags: ['D3.js', 'Data Processing', 'Interactivity', 'Collaboration']
  },
  {
    title: 'RISC-V CPU Simulation',
    description: 'Developed a simplified single cycle RISC-V CPU simulator in C, complete with fetch, decode, execute, memory, and writeback stages. The simulator reads 32-bit machine instructions from an input file, simulates register and memory operations, and outputs the final state of all registers.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['C', 'Hash tables', 'RISC-V', 'Endianness', 'Bitwise Instruction Parsing']
  },
  {
    title: 'Huffman Compression Project (Cornell – CS 3410)',
    description: 'Engineered a Huffman compression tool by implementing a custom, generic priority queue using a linked list with tailored comparator functions, enabling efficient insertion and O(1) dequeuing of minimum frequency nodes.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['BitI/O', 'Abstract Data Types', 'Memory Management', 'Algorithmic Rigor']
  },
  {
    title: 'Cinematic Showcase - Movie Database',
    description: 'Dynamic content management app that features both a public facing interface for users to explore top ranked films across various genres, as well as a comprehensive admin panel for content management, secure by user authentication.',
    github: 'hthttps://github.com/StephanVolynets/MovieAdminPanel',
    live: 'https://example.com',
    tags: ['PHP', 'SQLlite', 'Session Management', 'Security']
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
    <section id="projects" className={`py-20 ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
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
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          <RoughNotation type="underline" color={theme === 'dark' ? "#86C232" : "#4a9d4a"} show={true} strokeWidth={3}>
            Projects Showcase
          </RoughNotation>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`project-card relative overflow-hidden rounded-lg shadow-lg ${
                theme === 'dark' ? 'bg-background' : 'bg-white'
              }`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                if (project.title === 'Silicore.io') {
                  window.open('https://www.silicore.io', '_blank');
                } else if (project.title === 'Census Trends Dashboard') {
                  window.open('https://stephanvolynets.github.io/info3300p2/', '_blank');
                }
              }}
              style={{
                transform: hoveredProject === index 
                  ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
                  : 'none'
              }}
            >
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
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  opacity: hoveredProject === index ? 0.5 : 0
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
