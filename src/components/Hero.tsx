import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

interface HeroProps {
  theme: string;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "Computer Science & Data Science Student at Cornell University";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = theme === 'dark' ? '#86C232' : '#4a9d4a';
        ctx.strokeStyle = theme === 'dark' ? '#86C232' : '#4a9d4a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <section className={`min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden ${theme === 'dark' ? 'bg-background' : 'bg-gray-100'}`}>
      <canvas ref={canvasRef} className="particle-network"></canvas>
      <div className="max-w-4xl mx-auto z-10">
        <img
          src="https://example.com/path-to-your-image.jpg"
          alt="Stephan Volynets"
          className="w-48 h-48 rounded-full border-4 border-primary shadow-lg mb-8 mx-auto"
        />
        <h1 className={`glitch text-6xl md:text-7xl font-bold mb-6 leading-tight ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
          Stephan Volynets
        </h1>
        <p className="typewriter terminal-prompt text-2xl md:text-3xl mb-16 max-w-3xl mx-auto text-accent">
          {typedText}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#about" className="bg-primary text-background hover:bg-secondary text-lg font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Discover My Journey
          </a>
          <a href="#contact" className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background text-lg font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Let's Connect!
          </a>
        </div>
        <a
          href="#about"
          className="hover-effect animate-bounce inline-block"
          aria-label="Scroll to About section"
        >
          <ArrowDown size={36} className="text-primary" />
        </a>
      </div>
    </section>
  );
};

export default Hero;