import React from 'react';

interface CVProps {
  // Add any props you need
}

export const CV: React.FC<CVProps> = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-primary">Curriculum Vitae</h3>
      
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2 text-secondary">Education</h4>
        <div className="mb-4">
          <p className="font-medium">Cornell University</p>
          <p className="text-sm text-text/80">Bachelor of Science in Computer Science</p>
          <p className="text-sm text-text/80">2020 - 2024</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2 text-secondary">Experience</h4>
        <div className="mb-4">
          <p className="font-medium">Software Engineering Intern</p>
          <p className="text-sm text-text/80">Tech Company Inc.</p>
          <p className="text-sm text-text/80">Summer 2023</p>
          <ul className="list-disc list-inside mt-2 text-sm text-text/80">
            <li>Developed features for the company's main product</li>
            <li>Collaborated with a team of 5 engineers</li>
            <li>Implemented responsive UI components using React</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <p className="font-medium">Research Assistant</p>
          <p className="text-sm text-text/80">Cornell University</p>
          <p className="text-sm text-text/80">2022 - Present</p>
          <ul className="list-disc list-inside mt-2 text-sm text-text/80">
            <li>Conducted research on blockchain scalability solutions</li>
            <li>Published a paper on efficient consensus mechanisms</li>
            <li>Developed prototypes to demonstrate research findings</li>
          </ul>
        </div>
      </div>
      
      <div>
        <h4 className="text-xl font-semibold mb-2 text-secondary">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Blockchain', 'Solidity', 'MongoDB', 'SQL'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};