import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ProjectsProps {
  theme: string;
}

// Project data with lorem ipsum
const projects = [
  {
    title: 'Crypto Portfolio Tracker',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
    image: '/projects/crypto-portfolio.webp',
    tags: ['React', 'Next.js', 'TypeScript'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Decentralized Exchange',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
    image: '/projects/dex-platform.webp',
    tags: ['Solana', 'React', 'Web3.js'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'AI Powered Task Manager',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
    image: '/projects/ai-task-manager.webp',
    tags: ['Python', 'React', 'FastAPI'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Blockchain Data Visualizer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
    image: '/projects/blockchain-viz.webp',
    tags: ['D3.js', 'React', 'Web3'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Secure Messaging dApp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
    image: '/projects/secure-messaging.webp',
    tags: ['React Native', 'IPFS', 'Ethereum'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
  },
  {
    title: 'Smart Home Automation Hub',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus.',
    image: '/projects/smart-home.webp',
    tags: ['IoT', 'Node.js', 'MQTT'],
    github: 'https://github.com/StephanVolynets',
    live: '#'
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
