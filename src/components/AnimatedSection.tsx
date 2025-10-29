import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'slideIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'fadeIn':
        return 'animate-fadeIn';
      case 'fadeInUp':
        return 'animate-fadeInUp';
      case 'fadeInDown':
        return 'animate-fadeInDown';
      case 'fadeInLeft':
        return 'animate-fadeInLeft';
      case 'fadeInRight':
        return 'animate-fadeInRight';
      case 'zoomIn':
        return 'animate-zoomIn';
      case 'slideIn':
        return 'animate-slideIn';
      default:
        return 'animate-fadeIn';
    }
  };

  const style = {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
  };

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`${className} ${getAnimationClass()}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;