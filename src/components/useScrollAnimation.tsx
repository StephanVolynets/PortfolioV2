import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animateOnce?: boolean;
}

/**
 * Custom hook to handle element animations when they come into view
 * 
 * @param options Configuration options
 * @returns A ref to attach to the element and a boolean indicating if the element is in view
 */
export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = "0px",
  animateOnce = true,
}: ScrollAnimationOptions = {}) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create the intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Update state when the target element enters or exits the viewport
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            
            // If we only want to animate once, unobserve after it's been seen
            if (animateOnce && observerRef.current) {
              observerRef.current.unobserve(entry.target);
            }
          } else if (!animateOnce) {
            // If we want to animate every time, toggle the state off when out of view
            setIsInView(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current = observer;

    // Start observing when the element is available
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (currentElement && observerRef.current) {
        observerRef.current.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, animateOnce]);

  return { ref: elementRef, isInView };
}

/**
 * Apply this HOC to attach scroll animation to a component
 */
export function withScrollAnimation<T>(
  Component: React.ComponentType<T & { isInView?: boolean }>,
  options: ScrollAnimationOptions = {}
) {
  return (props: T) => {
    const { ref, isInView } = useScrollAnimation(options);
    
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <Component {...props} isInView={isInView} />
      </div>
    );
  };
}

export default useScrollAnimation; 