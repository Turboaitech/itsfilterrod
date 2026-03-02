'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface SlidingDivsOnScrollProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

export function SlidingDivsOnScroll({ leftContent, rightContent }: SlidingDivsOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (leftRef.current) {
              gsap.fromTo(leftRef.current, { x: '-100%' }, { x: '0%', duration: 1, ease: 'power2.out' });
            }
            if (rightRef.current) {
              gsap.fromTo(rightRef.current, { x: '100%' }, { x: '0%', duration: 1, ease: 'power2.out' });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex justify-between items-center px-5 overflow-hidden">
      <div ref={leftRef} className="w-full bg-[#3498db] text-white p-5">
        {leftContent}
      </div>
      <div ref={rightRef} className="w-full bg-[#3498db] text-white p-5">
        {rightContent}
      </div>
    </div>
  );
}
