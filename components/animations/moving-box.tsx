'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface MovingBoxProps {
  left: ReactNode;
  right: ReactNode;
}

export function MovingBox({ left, right }: MovingBoxProps) {
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
    <div ref={containerRef} className="flex flex-wrap md:flex-nowrap gap-x-10 justify-between items-center overflow-hidden w-full px-5">
      <div ref={leftRef} className="w-full flex justify-center items-center border border-white p-8 min-h-[200px] rounded-[32px] bg-white text-black">
        {left}
      </div>
      <div ref={rightRef} className="w-full flex justify-center items-center border border-white p-8 min-h-[200px] rounded-[32px]">
        {right}
      </div>
    </div>
  );
}
