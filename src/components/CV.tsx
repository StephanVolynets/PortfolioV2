import React, { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";

interface CVProps {
  theme: string;
}

const CV: React.FC<CVProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="cv"
      ref={sectionRef}
      className={`py-20 fade-in ${
        theme === "dark" ? "bg-background" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          <RoughNotation
            type="underline"
            color={theme === "dark" ? "#86C232" : "#4a9d4a"}
            show={true}
            strokeWidth={3}
            animationDuration={2000}
          >
            My CV
          </RoughNotation>
        </h2>
        <div className="bg-highlight p-6 rounded-lg shadow-md text-text space-y-8">
          {/* EDUCATION */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-lime-500">
              EDUCATION
            </h3>
            <p className="mb-4">
              <span className="font-bold text-xl text-lime-600">
                Cornell University | College of Arts and Sciences | Ithaca, NY
              </span>
              <br />
              <span className="font-bold text-xl">
                B.A. in Computer & Information Science
              </span>
              <br />
              <span className="font-bold">Relevant Coursework:</span>{" "}
              OOP, Data Structures & Algorithms, Database Management Systems,
              Functional Programming, Computer System Organization, Discrete
              Structures, Operating Systems, Networks, Natural Language
              Processing, Data Science, Computer Vision, Advanced Design and
              Programming for the Web
            </p>
          </div>

          {/* TECHNICAL SKILLS */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-lime-500">
              TECHNICAL SKILLS
            </h3>
            <p className="mb-4">
              <span className="font-bold text-lime-600">
                Programming Languages:
              </span>{" "}
              Python, SQL, Java, C, JavaScript/TSX, Rust (Beginner), Golang, PHP,
              RISC-V
              <br />
              <span className="font-bold text-lime-600">Databases:</span>{" "}
              Relational (PostgreSQL, SQLite), NoSQL (MongoDB)
              <br />
              <span className="font-bold text-lime-600">Web Development:</span>{" "}
              React.js, Next.js, Node.js, Express.js, Supabase, DigitalOcean,
              Vercel, Postman, PostHog
              <br />
              <span className="font-bold text-lime-600">Data Science:</span>{" "}
              Statistical Programming, Pandas, NumPy, Sci-kit Learn, TensorFlow
            </p>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-lime-500">
              EXPERIENCE
            </h3>
            <p className="mb-4">
              <span className="font-bold text-lime-600">
                Blockchain Consulting Team | Cornell Blockchain | Ithaca, NY
              </span>
              <br />
              <span className="italic">Oct 2023 - Present</span>
              <br />
              ● Conducted in-depth research and testing of subnets for tokenization,
              improving test times across 3 teams by nearly 400%.
              <br />
              ● Developed and delivered a web app using Next.js and Node.js for
              Stellar Blockchain (designed for 5M+ users).
              <br />
              ● Delivered DormDAO venture capital pitches, contributing to
              successful funding rounds.
            </p>
            <p className="mb-4">
              <span className="font-bold text-lime-600">
                Cite Marketplace | Software Engineer Intern | New York, United States | Hybrid
              </span>
              <br />
              <span className="italic">Mar 2023 - July 2023</span>
              <br />
              ● Developed and optimized a dynamic online marketplace connecting
              buyers and sellers, enhancing front-end responsiveness and
              back-end stability with Node.js and Express.js.
              <br />
              ● Leveraged data analysis on user engagement to guide scalability
              improvements.
              <br />
              ● Implemented server-side caching, asynchronous data fetching, and
              efficient database indexing to reduce query times by up to 30%.
              <br />
              ● Collaborated in agile workflows and rigorous code reviews to
              deliver secure payment gateways and refined checkout workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
