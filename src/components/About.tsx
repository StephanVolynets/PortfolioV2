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

  return (
    <section id="about" ref={sectionRef} className={`py-24 fade-in ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          <RoughNotation
            type="underline"
            color={theme === "dark" ? "#86C232" : "#4a9d4a"}
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
              As a{" "}
              <RoughNotation
                type="highlight"
                color={
                  theme === "dark"
                    ? "rgba(134, 194, 50, 0.2)"
                    : "rgba(74, 157, 74, 0.2)"
                }
                animationDelay={300}
                animationDuration={2000}
                strokeWidth={3}
              >
                Bachelor of Arts candidate
              </RoughNotation>{" "}
              at Cornell University specializing in Computer and Information
              Sciences, I'm currently applying my expertise in{" "}
              <RoughNotation
                type="highlight"
                color={
                  theme === "dark"
                    ? "rgba(134, 194, 50, 0.2)"
                    : "rgba(74, 157, 74, 0.2)"
                }
                animationDelay={600}
                animationDuration={2000}
                strokeWidth={3}
              >
                Python and front-end development
              </RoughNotation>{" "}
              at the Cornell Blockchain consulting team. My academic journey has
              been complemented by practical experience, where I've honed my
              skills in{" "}
              <RoughNotation
                type="highlight"
                color={
                  theme === "dark"
                    ? "rgba(134, 194, 50, 0.2)"
                    : "rgba(74, 157, 74, 0.2)"
                }
                animationDelay={900}
                animationDuration={2000}
                strokeWidth={3}
              >
                React.js and collaborative software development
              </RoughNotation>
              .
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              At Cornell Blockchain, our team strives to{" "}
              <RoughNotation
                type="highlight"
                color={
                  theme === "dark"
                    ? "rgba(134, 194, 50, 0.2)"
                    : "rgba(74, 157, 74, 0.2)"
                }
                animationDelay={1200}
                animationDuration={2000}
                strokeWidth={3}
              >
                innovate within the blockchain ecosystem
              </RoughNotation>
              , translating academic excellence into real-world applications. My
              dedication to the field is matched by a commitment to foster
              technology that empowers and advances our collective
              understanding.
            </p>
            <p className="text-xl leading-relaxed">
              Fluent in{" "}
              <RoughNotation
                type="underline"
                color={theme === "dark" ? "#86C232" : "#4a9d4a"}
                animationDelay={1500}
                animationDuration={2000}
                strokeWidth={3}
              >
                English and Russian
              </RoughNotation>
              , I bring a global perspective to our endeavors, ensuring our
              solutions are inclusive and impactful.
            </p>
          </RoughNotationGroup>
        </div>
      </div>
    </section>
  );
};

export default About;
