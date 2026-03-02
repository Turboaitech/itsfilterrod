'use client';

import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';

interface TextFlyInProps {
  text: string;
  lineLength?: number;
  separator?: string;
}

function splitTextIntoLines(text: string, maxLength: number): string[] {
  const regex = new RegExp(`(.{1,${maxLength}})(\\s|$)`, 'g');
  const lines: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    lines.push(match[1].trim());
  }
  return lines;
}

export function TextFlyIn({ text, lineLength = 100, separator }: TextFlyInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lines = useMemo(() => {
    if (separator !== undefined) return text.split(separator);
    return splitTextIntoLines(text, lineLength);
  }, [text, lineLength, separator]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });
            lineRefs.current.forEach((el, index) => {
              if (!el) return;
              tl.to(el, {
                x: index % 2 === 0 ? '100%' : '-100%',
                opacity: 1,
              }, 0);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [lines]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden flex flex-col">
      {lines.map((line, index) => (
        <div
          key={index}
          ref={(el) => { lineRefs.current[index] = el; }}
          className="w-full text-center relative"
          style={{ [index % 2 === 0 ? 'left' : 'right']: '-100%' }}
        >
          <span className="text-[18px] md:text-[24px] lg:text-[32px]">{line}</span>
        </div>
      ))}
    </div>
  );
}
