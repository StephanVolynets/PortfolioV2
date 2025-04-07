"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ColorfulTextProps {
  text: string;
  className?: string;
  colors: string[];
  delay?: number;
}

export const ColorfulText: React.FC<ColorfulTextProps> = ({
  text,
  className,
  colors,
  delay = 3000,
}) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, delay);

    return () => clearInterval(interval);
  }, [colors.length, delay]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={currentColorIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(className)}
        style={{ color: colors[currentColorIndex] }}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}; 