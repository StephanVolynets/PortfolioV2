import React, { useEffect, useRef } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

interface AboutProps {
  theme: string;
}

const About: React.FC<AboutProps> = ({ theme }) => {
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

  const underlineColor = theme === "dark" ? "#86C232" : "#4a9d4a";
  const highlightColor = theme === "dark" ? "rgba(134, 194, 50, 0.2)" : "rgba(74, 157, 74, 0.2)";

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-24 fade-in ${theme === "dark" ? "bg-highlight" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          <RoughNotation
            type="underline"
            color={underlineColor}
            show={true}
            strokeWidth={3}
            animationDuration={2000}
          >
            About Me
          </RoughNotation>
        </h2>
        <div className="max-w-4xl mx-auto">
          <RoughNotationGroup show={true}>
            <p className="text-xl mb-8 leading-relaxed">
              As a senior at{" "}
              <RoughNotation
                type="highlight"
                color={highlightColor}
                animationDelay={800}
                animationDuration={500}
                strokeWidth={3}
              >
                Cornell University
              </RoughNotation>{" "}
              pursuing a Bachelor of Arts in{" "}
              <RoughNotation
                type="underline"
                color={underlineColor}
                animationDelay={300}
                animationDuration={2000}
                strokeWidth={3}
                // optional inline-block
                style={{ display: 'inline-block' }}
              >
                Computer
              </RoughNotation>{" "}
              and 
              <RoughNotation
                type="underline"
                color={underlineColor}
                animationDelay={300}
                animationDuration={2000}
                strokeWidth={3}
                style={{ display: 'inline-block' }}
              >
                 Information Sciences
              </RoughNotation>
              , I specialize in blockchain technologies, development, and data driven solutions. My academic and professional experiences have allowed me to apply my expertise in{" "}
              <RoughNotation
                type="highlight"
                color={highlightColor}
                animationDelay={800}
                animationDuration={500}
                strokeWidth={3}
              >
                PHP
              </RoughNotation>
              ,{" "}
              <RoughNotation
                type="highlight"
                color={highlightColor}
                animationDelay={900}
                animationDuration={500}
                strokeWidth={3}
              >
                React.js
              </RoughNotation>
              ,{" "}
              <RoughNotation
                type="highlight"
                color={highlightColor}
                animationDelay={1000}
                animationDuration={500}
                strokeWidth={3}
              >
                TypeScript
              </RoughNotation>
              , and collaborative software development to create impactful, user centric applications.
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              I have actively contributed to the blockchain ecosystem through my role in{" "}
              <RoughNotation
                type="underline"
                color={underlineColor}
                animationDelay={1100}
                animationDuration={2000}
                strokeWidth={3}
              >
                Cornell Blockchain
              </RoughNotation>
              , where I collaborate on innovative projects such as{" "}
              <RoughNotation
                type="underline"
                color={underlineColor}
                animationDelay={1100}
                animationDuration={1900}
                strokeWidth={3}
              >
                Silicore.io
              </RoughNotation>
              , which was showcased at prestigious events like the Meridian Conference. These experiences have honed my ability to translate complex technical concepts into real world applications that empower users.
            </p>
            <p className="text-xl leading-relaxed">
              Fluent in{" "}
              <RoughNotation
                type="underline"
                color={underlineColor}
                animationDelay={1500}
                animationDuration={2000}
                strokeWidth={3}
              >
                English and Russian
              </RoughNotation>
              , I bring a global perspective to problem solving, ensuring inclusivity and impact in every project I undertake. My dedication to technology is matched by a commitment to advancing understanding within{" "}
              <RoughNotation
                type="highlight"
                color={highlightColor}
                animationDelay={1700}
                animationDuration={500}
                strokeWidth={3}
              >
                blockchain
              </RoughNotation>
              ,{" "}
              <RoughNotation
                type="highlight"
                color={highlightColor}
                animationDelay={1800}
                animationDuration={500}
                strokeWidth={3}
              >
                fintech
              </RoughNotation>
              , and beyond.
            </p>
          </RoughNotationGroup>
        </div>
      </div>
    </section>
  );
};

export default About;
