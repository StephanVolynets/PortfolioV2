import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ProjectsProps {
  theme: string;
}

// Project data
const projects = [
  {
    title: 'Silicore.io',
    description: 'Developed as part of the "Build Better on Stellar: Smart Contract Challenge," Silicore is a platform that enables cryptocurrency traders to compare trusted exchanges, secure optimal rates, and trade efficiently. It provides real time data and insights, allowing users to make informed decisions by comparing various exchanges and their rates.',
    image: '/projects/crypto-portfolio.webp',
    tags: ['Blockchain', 'Nest.js', 'Typescript', 'Web Sockets'],
    github: 'https://github.com/StephanVolynets/Silicore-front-end-local',
    live: 'https://www.silicore.io/'
  },
  {
    title: 'Cornell Boxing Club - Event RSVP App',
    description: 'A modern, responsive React application to manage event RSVPs with real time updates, a dynamic grid layout, smooth animations, and mobile friendly design. Seamless RSVP functionality is supported by a modular component architecture and efficient API communication.',
    image: '/projects/dex-platform.webp',
    tags: ['MongoDB', 'Express.js', 'Restful Architecture'],
    github: 'https://github.com/StephanVolynets/EVENT-RSVP-APP-MERN',
    live: 'https://stephanvolynets.github.io/EVENT-RSVP-APP-MERN/'
  },
  {
    title: 'Census Trends Dashboard (Cornell – CS 3300)',
    description: 'Collaborated with a team of four to develop an interactive global visualization using Vanilla JS + D3.js by merging life expectancy data from the World Bank and population data from Our World In Data into a TopoJSON world map. Engineered data processing pipelines to reconcile disparate country names, align multiyear datasets, and compute dynamic color scales.',
    image: '/projects/ai-task-manager.webp',
    tags: ['D3.js', 'Data Processing', 'Interactivity', 'Collaboration'],
    github: 'https://github.com/StephanVolynets/info3300p2',
    live: 'https://stephanvolynets.github.io/info3300p2/'
  },
  {
    title: 'RISC-V CPU Simulation',
    description: 'Developed a simplified single cycle RISC-V CPU simulator in C, complete with fetch, decode, execute, memory, and writeback stages. The simulator reads 32-bit machine instructions from an input file, simulates register and memory operations, and outputs the final state of all registers.',
    image: '/projects/blockchain-viz.webp',
    tags: ['C', 'Hash tables', 'RISC-V', 'Bitwise Instruction Parsing'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    title: 'Huffman Compression Project (Cornell – CS 3410)',
    description: 'Engineered a Huffman compression tool by implementing a custom, generic priority queue using a linked list with tailored comparator functions, enabling efficient insertion and O(1) dequeuing of minimum frequency nodes.',
    image: '/projects/secure-messaging.webp',
    tags: ['BitI/O', 'Abstract Data Types', 'Memory Management'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    title: 'Cinematic Showcase - Movie Database',
    description: 'Dynamic content management app that features both a public facing interface for users to explore top ranked films across various genres, as well as a comprehensive admin panel for content management, secure by user authentication.',
    image: '/projects/smart-home.webp',
    tags: ['PHP', 'SQLlite', 'Session Management', 'Security'],
    github: 'https://github.com/StephanVolynets/MovieAdminPanel',
    live: 'https://example.com'
  }
];

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  return (
    <AnimatedSection 
      id="projects" 
      className={`py-12 sm:py-24 ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}
      animation="fadeInUp"
      threshold={0.1}
    >      
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-primary">
          Featured Projects
        </h2>
        
        <AnimatedSection 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
          animation="fadeInUp"
          stagger={true}
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] ${
                theme === 'dark' ? 'bg-code' : 'bg-white'
              }`}
            >
              <div className="project-image-container h-40 sm:h-48 bg-gray-300 overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 transform hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.image || 'https://via.placeholder.com/400x200?text=Project+Image'})`
                  }}
                ></div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-primary">{project.title}</h3>
                <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${theme === 'dark' ? 'text-text' : 'text-gray-800'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className={`text-xs sm:text-sm font-medium mr-2 mb-2 px-2 py-0.5 rounded ${
                        theme === 'dark' 
                          ? 'bg-accent text-text' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
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
                    className="flex items-center text-primary hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    <Github size={16} className="mr-1 sm:mr-2" /> GitHub
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-secondary transition-colors text-sm sm:text-base"
                  >
                    <ExternalLink size={16} className="mr-1 sm:mr-2" /> Live Demo
                  </a>
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
