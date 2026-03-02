'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface SlidingToTopDivProps {
  children: ReactNode;
  scrollDistance?: number;
  duration?: number;
  className?: string;
}

export function SlidingToTopDiv({ children, scrollDistance = 100, duration = 2, className }: SlidingToTopDivProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            y: `-=${scrollDistance}px`,
            opacity: 1,
            duration,
            ease: 'power1.out',
          });
          observer.unobserve(el);
        }
      });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollDistance, duration]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
