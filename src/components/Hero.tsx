import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';


interface HeroProps {
  theme: string;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "Computer & Data Science Student";

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
        this.x = Math.random() * (canvas?.width ?? 0);
        this.y = Math.random() * (canvas?.height ?? 0);
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.1) this.size -= 0.02;
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
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.1) {
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
      <style >{`
        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.4;
          }
        }

        .flicker {
          animation: flicker 0.75s infinite alternate;
        }
      `}</style>
      <canvas ref={canvasRef} className="particle-network"></canvas>
      <div className="max-w-4xl mx-auto z-10">
        <img
          src="https://media.licdn.com/dms/image/v2/C4D03AQH4UZKn7Ny3uQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1662479258603?e=1735171200&v=beta&t=3LrHtCCOQ3mwxBSj7-28eK-OcvYTqhlIxkmQ5NzL4Zk"
          alt="Stephan Volynets"
          className="w-48 h-48 rounded-full border-4 border-primary shadow-lg mb-8 mx-auto"
        />
      <h1 className={`glitch flicker text-6xl md:text-7xl font-bold mb-6 leading-tight ${theme === 'dark' ? 'text-lime-300' : 'text-lime-800'}`}>
        Stephan Volynets
      </h1>
        <p className="typewriter terminal-prompt text-2xl md:text-3xl mb-8 max-w-3xl mx-auto text-lime-500">
          {typedText}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-16 mb-32">
          <a href="#about" className="bg-lime-500 text-background hover:bg-lime-600 text-lg font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Discover My Journey
          </a>
          <a href="#contact" className="bg-transparent border-2 border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-background text-lg font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Let's Connect!
          </a>
        </div>
        <a
          href="#about"
          className="hover-effect animate-bounce inline-block"
          aria-label="Scroll to About section"
        >
          <ArrowDown size={36} className="text-lime-500" />
        </a>
      </div>
    </section>
  );
};

export default Hero;