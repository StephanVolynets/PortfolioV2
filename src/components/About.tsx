import React from 'react';

interface AboutProps {
  theme?: 'light' | 'dark' | string;
}

const About: React.FC<AboutProps> = ({ theme = 'light' }) => {
  return (
    <section
      id="about-section"
      className={`w-full bg-background text-text transition-colors duration-300 ${theme}`}
    >
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center mb-6 sm:mb-8">
          About Me
        </h2>
        <p className="max-w-3xl mx-auto text-center leading-relaxed text-sm sm:text-base md:text-lg">
          I’m a developer focused on building unique, stylish, and interactive experiences. This
          section is a placeholder to resolve a missing import and will be enhanced with animations,
          timelines, and visuals. If you already planned specific content for About, replace this
          component or extend it.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="rounded-xl border border-[color:var(--border,#3a3f44)]/40 bg-[color:var(--card,#2b2f33)]/40 p-4 sm:p-6 shadow-md backdrop-blur-sm w-full max-w-3xl">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
              <li className="p-3 rounded-lg bg-[color:var(--popover,#24282b)]/40">• Passion for delightful UI</li>
              <li className="p-3 rounded-lg bg-[color:var(--popover,#24282b)]/40">• Modern animations & motion</li>
              <li className="p-3 rounded-lg bg-[color:var(--popover,#24282b)]/40">• Performance-minded</li>
              <li className="p-3 rounded-lg bg-[color:var(--popover,#24282b)]/40">• Accessibility aware</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
