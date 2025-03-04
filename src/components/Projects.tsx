import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

interface ProjectsProps {
  theme: string;
}

const projects = [
  {
    title: 'Silicore.io',
    description: 'Developed as part of the "Build Better on Stellar: Smart Contract Challenge," Silicore is a platform that enables cryptocurrency traders to compare trusted exchanges, secure optimal rates, and trade efficiently. It provides real time data and insights, allowing users to make informed decisions by comparing various exchanges and their rates.'
,
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['Blockchain', 'Nest.js', 'Typescript', 'Web Sockets']
  },
  {
    title: 'Cornell Boxing Club - Event RSVP App',
    description: 'A modern, responsive React application to manage event RSVPs with real time updates, a dynamic grid layout, smooth animations, and mobile friendly design. Seamless RSVP functionality is supported by a modular component architecture and efficient API communication.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['MongoDB', 'Express.js', 'Restful Architecture']
  },	
  {
    title: 'Census Trends Dashboard (Cornell – CS 3300)',
    description: 'Collaborated with a team of four to develop an interactive global visualization using Vanilla JS + D3.js by merging life expectancy data from the World Bank and population data from Our World In Data into a TopoJSON world map. Engineered data processing pipelines to reconcile disparate country names, align multiyear datasets, and compute dynamic color scales using a linear scale for life expectancy and a logarithmic scale for population. Implemented intuitive features such as a year slider with play/stop controls, tooltips on hover, and zoom/pan functionality, enabling users to explore six decades of global demographic trends.',
    github: 'https://github.com',
    live: 'https://stephanvolynets.github.io/info3300p2/',
    tags: ['D3.js', 'Data Processing', 'Interactivity', 'Collaboration']
  }, 
  {
    title: 'RISC-V CPU Simulation',
    description: 'Developed a simplified single cycle RISC-V CPU simulator in C, complete with fetch, decode, execute, memory, and writeback stages. The simulator reads 32-bit machine instructions from an input file, simulates register and memory operations, and outputs the final state of all registers. This project demonstrates a solid understanding of computer architecture fundamentals, including instruction parsing, ALU operations, and memory handling.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['C', 'Hash tables', 'RISC-V', 'Endianness', 'Bitwise Instruction Parsing' ]
  },
  {
    title: 'Huffman Compression Project (Cornell – CS 3410)',
    description: 'Engineered a Huffman compression tool by implementing a custom, generic priority queue using a linked list with tailored comparator functions, enabling efficient insertion and O(1) dequeuing of minimum frequency nodes. Developed a frequency analysis module to tally character occurrences, forming the basis for constructing an optimal Huffman tree via iterative node merging and recursive post‑order traversal. Created a custom BitWriter module for bit‑level I/O to generate compressed data and a binary coding table. This project showcases proficiency in data structures, memory management, and recursion while delivering a leak‑free, performance‑optimized solution.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['BitI/O', 'Abstract Data Types', 'Memory Management', 'Algorithmic Rigor']
  },
  {
    title: 'Cinematic Showcase - Movie Database',
    description: 'Dynamic content management app that features both a public facing interface for users to explore top ranked films across various genres, as well as a comprehensive admin panel for content management, secure by user authentication.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['PHP', 'SQLlite', 'Session Management', 'Security']
  }
];

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className={`py-20 section-fade ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          <RoughNotation type="underline" color="#86C232" show={true} strokeWidth={3}>
            Projects Showcase
          </RoughNotation>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="relative border border-accent p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              // style={project.title === 'Census Trends Dashboard'} ? { cursor: 'pointer'} : {}
              onClick={() => {
                if (project.title === 'Silicore.io') {
                  window.open('https://www.silicore.io', '_blank');
                }
                else if (project.title === 'Census Trends Dashboard') {
                  window.open('https://stephanvolynets.github.io/info3300p2/', '_blank')
                }
                else if (project.title === 'Cornell Boxing Club - Event RSVP App') {
                  window.open('https://stephanvolynets.github.io/EVENT-RSVP-APP-MERN/', '_blank')
                }
                else if (project.title === 'Cinematic Showcase - Movie Database') {
                  window.open('https://github.com/StephanVolynets/MovieAdminPanel', '_blank')
                }
              }}
              style={project.title === 'Silicore.io'  ? { cursor: 'pointer' } : {}}
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary">{project.title}</h3>
              <p className="text-text mb-6">{project.description}</p>
              <div className="flex flex-wrap mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-accent text-text text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-secondary transition-colors">
                  <Github size={20} className="mr-2" /> GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-secondary transition-colors">
                  <ExternalLink size={20} className="mr-2" /> Live Demo
                </a>
              </div>
              {hoveredProject === index && (
                <div className="absolute inset-0 bg-primary bg-opacity-90 flex items-center justify-center rounded-lg transition-opacity duration-300">
                  <p className="text-background text-center px-4">Click to view details</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
