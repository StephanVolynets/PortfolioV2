import React from 'react';
import { RoughNotation } from 'react-rough-notation';

interface CVProps {
  theme: string;
}

const CV: React.FC<CVProps> = ({ theme }) => {
  return (
    <section id="cv" className={`py-20 ${theme === 'dark' ? 'bg-background' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          <RoughNotation type="underline" color={theme === 'dark' ? "#86C232" : "#4a9d4a"} show={true} strokeWidth={3} animationDuration={2000}>
            My CV
          </RoughNotation>
        </h2>
        <div className="bg-highlight p-6 rounded-lg shadow-md text-text space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-lime-500">EDUCATION</h3>
            <p className="mb-4">
              <span className="font-bold text-xl text-lime-600">Cornell University | College of Arts and Sciences | Ithaca, NY</span><br />
              <span className="font-bold text-xl ">B.A. in Computer & Information Science</span><br />
              <span className="font-bold">Relevant Coursework:</span> Object Oriented Programming, Data Structures & Algorithms, Data Science, Database Management Systems, Functional Programming, Discrete Structures, Systems Programming, Intermediate Design and Programming for the Web, Machine Learning, Natural Language Processing, Blockchain Development, Computer Vision, Operating Systems, Computer Networks, Software Engineering
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-lime-500">TECHNICAL SKILLS</h3>
            <p className="mb-4">
              <span className="font-bold text-lime-600">Programming Languages:</span> Python (Advanced), SQL (Advanced), PHP (Intermediate), Java (Intermediate), JavaScript/TSX (Intermediate), Golang (Beginner)<br />
              <span className="font-bold text-lime-600">Databases:</span> SQL (PostgreSQL/SQLite), NoSQL (MongoDB)<br />
              <span className="font-bold text-lime-600">Web Development:</span> React.js, Next.js, Node.js, Express.js, RESTful API Design, Nest.js, TypeScript, MaterialUI<br />
              <span className="font-bold text-lime-600">Hosting & Tools:</span> Supabase, DigitalOcean (Backend Hosting), Vercel (Frontend Hosting), Postman, PostHog (User KPIs)
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-lime-500">EXPERIENCE</h3>
            <p className="mb-4">
              <span className="font-bold text-lime-600">Consulting Team | Cornell Blockchain | Ithaca, NY</span> Oct 2023 - Present<br />
              ● Conducted in-depth research and testing of subnets for companies exploring tokenization of business sectors, providing valuable insights and recommendations. Improved test times across 3 teams by nearly 400% with enhanced stability.<br />
              ● Delivered DormDAO venture capital pitches, contributing to successful funding rounds and advancements for blockchain apps.
            </p>
            <p className="mb-4">
              <span className="font-bold text-lime-600">Cita Marketplace | Software Engineer Intern | New York, United States | Hybrid</span> Mar 2023 - July 2023<br />
              ● Developed and optimized a dynamic online marketplace connecting buyers and sellers, enhancing front-end responsiveness, back-end stability, and API robustness with Node.js and Express.<br />
              ● Leveraged data analysis on user engagement and transaction metrics to identify performance bottlenecks, guiding strategic improvements in scalability and reliability.<br />
              ● Implemented server-side caching, asynchronous data fetching, and efficient database indexing including block nested loop joins and external sorting to reduce query times by up to 30% through optimized data retrieval and processing.<br />
              ● Collaborated in agile workflows and conducted rigorous code reviews to successfully deliver secure payment gateways and refined checkout workflows, strengthening transaction security and trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV; 
