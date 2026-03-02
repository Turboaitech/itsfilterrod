'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface TextSlideUpProps {
  children: ReactNode;
  className?: string;
  classes?: string;
}

export function TextSlideUp({ children, className, classes }: TextSlideUpProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              el,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`overflow-hidden ${className || classes || ''}`}>
      <span ref={textRef} className="inline-block opacity-0">
        {children}
      </span>
    </div>
  );
}
