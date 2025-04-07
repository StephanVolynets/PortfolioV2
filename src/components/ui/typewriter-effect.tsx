"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  delay?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className,
  cursorClassName,
  delay = 100,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        timeout = setTimeout(type, delay / 2);
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        timeout = setTimeout(type, delay);
      }

      if (!isDeleting && currentText === currentWord) {
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        timeout = setTimeout(type, delay);
      }
    };

    timeout = setTimeout(type, delay);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, delay]);

  return (
    <div className={cn("flex items-center", className)}>
      <span>{currentText}</span>
      <motion.span
        className={cn("inline-block w-[2px] h-5 ml-1", cursorClassName)}
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
