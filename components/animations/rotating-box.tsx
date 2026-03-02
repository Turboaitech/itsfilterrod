'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface RotatingBoxProps {
  children: ReactNode;
}

export function RotatingBox({ children }: RotatingBoxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { rotation: -45, scale: 0, width: '20vw', height: '20vh', borderRadius: '20vh', x: '-50%', y: '-50%' },
      { duration: 0.5, width: '100vw', height: '100vh', scale: 1, rotation: 0, borderRadius: '5vh', x: '-50%', y: '-50%', ease: 'power1.in', delay: 0.25 }
    );

    gsap.to(el, { borderRadius: '0', duration: 0.5, ease: 'power4.out', delay: 0.5 });
  }, []);

  return (
    <div ref={ref} className="fixed top-1/2 left-1/2 bg-[#3498db]">
      {children}
    </div>
  );
}
