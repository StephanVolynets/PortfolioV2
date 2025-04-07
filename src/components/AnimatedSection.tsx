import React, { ReactNode, useRef, useEffect, useState } from 'react';
import useScrollAnimation from './useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn';
  delay?: number;
  threshold?: number;
  stagger?: boolean;
}

/**
 * A component that animates its children when scrolled into view
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  id,
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  stagger = false,
}) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  // Calculate delay class based on delay prop
  const getDelayClass = () => {
    if (delay <= 0) return '';
    const delayStep = 100;
    const delayClass = `delay-${Math.min(Math.round(delay / delayStep) * delayStep, 800)}`;
    return delayClass;
  };

  // Determine animation classes
  const animationClass = `animate-${animation}`;
  const delayClass = getDelayClass();
  const staggerClass = stagger ? 'stagger-children' : '';
  
  // Combine all classes
  const containerClasses = cn(
    className,
    staggerClass,
    isInView ? 'revealed' : 'animate-hidden',
  );
  
  // Apply animation classes to the section if not using stagger
  const sectionClasses = !stagger && isInView 
    ? cn(containerClasses, animationClass, delayClass) 
    : containerClasses;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={sectionClasses}
      id={id}
    >
      {children}
    </section>
  );
};

export default AnimatedSection; 