import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

interface ProjectsProps {
  theme: string;
}

const projects = [
  {
    title: 'Silicore.io',
    description: 'Innovative Crypto Off Ramping Discovery Platform Solution backed by Stellar Network',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['React', 'Nest.js', 'Typescript']
  },
  {
    title: 'Cornell Boxing Club - Event RSVP App',
    description: 'Dynamic content management app that features both a public facing interface for users and a comprehensive admin panel for content management. authentication. For movie enthusiasts to explore top-ranked films across various genres. The system ',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['PHP', 'Secure Authentication', 'SQLlite']
  },
  {
    title: 'Cinematic Showcase - Movie Database',
    description: 'A comprehensive web application for managing and showcasing top-rated films, featuring both user and administrative interfaces.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['React', 'Express.js', 'MongoDB']
  }, 
  {
    title: 'Graphical Image Editing Application',
    description: 'The application allows users to interactively select areas in an image by combining manual point to point selection with automated edge following based on graph theory and shortest path algorithms.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['Java', 'Data Structures', 'GUI']
  }
  // Add more projects as needed
];

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className={`py-20 section-fade ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary">
          <RoughNotation type="underline" color="#86C232" show={true} strokeWidth={3}>
            Projects Showcase
          </RoughNotation>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="border border-accent p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
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