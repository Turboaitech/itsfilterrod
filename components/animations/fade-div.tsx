'use client';

import { useRef, useCallback, useImperativeHandle, forwardRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface FadeDivProps {
  children: ReactNode;
  className?: string;
}

export interface FadeDivHandle {
  toggle: () => void;
}

export const FadeDiv = forwardRef<FadeDivHandle, FadeDivProps>(
  function FadeDiv({ children, className }, ref) {
    const divRef = useRef<HTMLDivElement>(null);
    const isVisible = useRef(true);

    const toggle = useCallback(() => {
      if (!divRef.current) return;
      if (isVisible.current) {
        gsap.to(divRef.current, { opacity: 0, duration: 0.1, onComplete: () => { isVisible.current = false; } });
      } else {
        gsap.to(divRef.current, { opacity: 1, duration: 0.1, onComplete: () => { isVisible.current = true; } });
      }
    }, []);

    useImperativeHandle(ref, () => ({ toggle }), [toggle]);

    return (
      <div ref={divRef} className={className} style={{ opacity: 1, transition: 'opacity 1s' }}>
        {children}
      </div>
    );
  }
);
