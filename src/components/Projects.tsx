import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

interface ProjectsProps {
  theme: string;
}

const projects = [
  {
    title: 'Cornell Blockchain Project',
    description: 'Innovative blockchain solution developed as part of the Cornell Blockchain consulting team.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['Blockchain', 'React', 'Solidity']
  },
  {
    title: 'Data Science Research',
    description: 'Academic research project focusing on machine learning applications in data science.',
    github: 'https://github.com',
    live: 'https://example.com',
    tags: ['Machine Learning', 'Python', 'Data Analysis']
  },
  // Add more projects as needed
];

const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 section-fade bg-highlight">
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