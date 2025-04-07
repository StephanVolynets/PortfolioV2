import React from 'react';
import { Briefcase, School, Award, Calendar, MapPin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface CVProps {
  theme: string;
}

const experienceData = [
  {
    title: 'Software Engineer Intern',
    company: 'Blockchain Technologies Corp',
    location: 'New York, NY',
    period: 'Jun 2023 - Aug 2023',
    description: 'Developed and maintained web applications using React and Node.js. Implemented smart contracts and integrated blockchain solutions for secure data management. Collaborated with the design team to improve user interfaces and experiences.'
  },
  {
    title: 'Research Assistant',
    company: 'Cornell University',
    location: 'Ithaca, NY',
    period: 'Sep 2022 - May 2023',
    description: 'Assisted in blockchain research projects, analyzing data using Python and statistical methods. Contributed to academic papers on distributed systems and blockchain scalability. Created data visualizations to communicate research findings.'
  },
  {
    title: 'Full Stack Developer',
    company: 'Tech4Good',
    location: 'Remote',
    period: 'May 2022 - Aug 2022',
    description: 'Built and deployed responsive web applications for nonprofit organizations. Implemented front-end interfaces using React and managed back-end services with Express. Utilized MongoDB for data storage and retrieval.'
  }
];

const educationData = [
  {
    degree: 'Bachelor of Arts, Computer Science',
    institution: 'Cornell University',
    location: 'Ithaca, NY',
    period: '2020 - 2024',
    details: 'Focus areas: Blockchain Development, Distributed Systems, Machine Learning. GPA: 3.8/4.0. Relevant coursework: Data Structures & Algorithms, Operating Systems, Cryptography, Computer Networks.'
  },
  {
    degree: 'Summer Blockchain Program',
    institution: 'MIT',
    location: 'Cambridge, MA',
    period: 'Summer 2022',
    details: 'Intensive program covering blockchain fundamentals, smart contract development, and decentralized applications. Completed a capstone project developing a decentralized finance application.'
  }
];

const certificationsData = [
  {
    title: 'Certified Blockchain Developer',
    issuer: 'Blockchain Council',
    date: 'Jan 2023'
  },
  {
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: 'Aug 2022'
  },
  {
    title: 'Full Stack Web Development',
    issuer: 'freeCodeCamp',
    date: 'May 2021'
  }
];

const CV: React.FC<CVProps> = ({ theme }) => {
  return (
    <AnimatedSection
      id="cv"
      className={`py-24 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}
      animation="fadeInUp"
      threshold={0.2}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          Professional Experience
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <AnimatedSection className="space-y-8" animation="fadeInLeft" delay={200}>
            <h3 className="text-3xl font-semibold text-primary flex items-center">
              <Briefcase className="mr-3" /> Work Experience
            </h3>
            
            <div className="relative pl-8 border-l-2 border-primary">
              {experienceData.map((job, index) => (
                <AnimatedSection 
                  key={index} 
                  className="mb-10 relative" 
                  animation="fadeInLeft"
                  delay={300 + (index * 100)}
                >
                  <div className="absolute -left-[41px] mt-1.5 w-5 h-5 rounded-full bg-primary"></div>
                  <div className={`p-5 rounded-lg shadow-md ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-50'}`}>
                    <h4 className="text-xl font-semibold text-primary">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 mb-3">
                      <span className="text-secondary font-medium">{job.company}</span>
                      <span className="text-gray-500">|</span>
                      <div className="flex items-center text-text">
                        <MapPin size={14} className="mr-1" /> {job.location}
                      </div>
                      <span className="text-gray-500">|</span>
                      <div className="flex items-center text-text">
                        <Calendar size={14} className="mr-1" /> {job.period}
                      </div>
                    </div>
                    <p className="text-text">{job.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="space-y-8" animation="fadeInRight" delay={200}>
            <h3 className="text-3xl font-semibold text-primary flex items-center">
              <School className="mr-3" /> Education
            </h3>
            
            <div className="relative pl-8 border-l-2 border-primary">
              {educationData.map((edu, index) => (
                <AnimatedSection 
                  key={index} 
                  className="mb-10 relative" 
                  animation="fadeInRight"
                  delay={300 + (index * 100)}
                >
                  <div className="absolute -left-[41px] mt-1.5 w-5 h-5 rounded-full bg-primary"></div>
                  <div className={`p-5 rounded-lg shadow-md ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-50'}`}>
                    <h4 className="text-xl font-semibold text-primary">{edu.degree}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 mb-3">
                      <span className="text-secondary font-medium">{edu.institution}</span>
                      <span className="text-gray-500">|</span>
                      <div className="flex items-center text-text">
                        <MapPin size={14} className="mr-1" /> {edu.location}
                      </div>
                      <span className="text-gray-500">|</span>
                      <div className="flex items-center text-text">
                        <Calendar size={14} className="mr-1" /> {edu.period}
                      </div>
                    </div>
                    <p className="text-text">{edu.details}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            
            <AnimatedSection className="mt-12" animation="fadeInUp" delay={600}>
              <h3 className="text-3xl font-semibold text-primary flex items-center mb-6">
                <Award className="mr-3" /> Certifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {certificationsData.map((cert, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg shadow-md ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-50'}`}
                  >
                    <h4 className="text-lg font-semibold text-primary">{cert.title}</h4>
                    <div className="flex justify-between text-text mt-2">
                      <span>{cert.issuer}</span>
                      <span className="text-sm">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
        
        <AnimatedSection 
          className="mt-16 text-center" 
          animation="fadeInUp" 
          delay={800}
        >
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white py-3 px-8 rounded-full font-semibold transition-transform hover:scale-105 hover:shadow-lg"
          >
            Download Full Resume
          </a>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default CV;