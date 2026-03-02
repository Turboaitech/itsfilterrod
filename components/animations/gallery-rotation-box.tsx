'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryRotationBoxProps {
  images: GalleryImage[];
}

export function GalleryRotationBox({ images }: GalleryRotationBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || itemRefs.current.length === 0) return;

    const validRefs = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    gsap.from(validRefs, {
      x: 200,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      rotation: 360,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 30%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [images]);

  return (
    <div ref={containerRef} className="flex flex-wrap gap-3">
      {images.map((item, index) => (
        <div
          key={index}
          ref={(el) => { itemRefs.current[index] = el; }}
          className="w-full h-[300px] md:w-[calc(50%-9px)] md:h-[600px] lg:w-[calc(25%-9px)] overflow-hidden rounded-3xl"
        >
          <Image src={item.src} alt={item.alt} width={400} height={600} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
