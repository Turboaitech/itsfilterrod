'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface ExpandBoxProps {
  children: ReactNode;
  className?: string;
}

export function ExpandBox({ children, className }: ExpandBoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.out' });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full min-h-[200px] p-8 origin-center border-[10px] border-solid ${className || ''}`}
      style={{
        borderImage: 'linear-gradient(45deg, gold, deeppink) 1',
        clipPath: 'inset(0px round 10px)',
        animation: 'huerotate 6s infinite linear',
        filter: 'hue-rotate(360deg)',
      }}
    >
      {children}
    </div>
  );
}
