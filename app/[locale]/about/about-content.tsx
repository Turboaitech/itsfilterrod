'use client';

import { useRawT } from '@/lib/i18n/use-raw-t';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const title = ['PT. Indonesian', 'Tobacco', 'Special', 'Filter', 'Rod'];

export function AboutContent() {
  const t = useRawT();
  const heroRef = useRef<HTMLElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);

  const description =
    'We are a leading provider of high-quality filter rods for the tobacco industry, based in Batam, Indonesia. Our focus is on delivering reliable and innovative solutions tailored to our clients\' specific needs. With a commitment to quality and efficiency, we ensure that our products meet the highest standards in the industry.';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      const aboutEl = aboutTextRef.current;
      const titleBox = titleBoxRef.current;

      if (hero && aboutEl && titleBox) {
        const aboutHeight = aboutEl.scrollHeight;
        const titleBoxHeight = titleBox.scrollHeight;

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: `bottom ${aboutHeight + titleBoxHeight + 5}px`,
          pin: aboutEl,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="page page-about">
      {/* Hero — pinned, title box scrolls up to meet ABOUT text */}
      <section
        ref={heroRef}
        className="h-[calc(100vh-54px)] flex flex-col justify-between items-center p-[10px] lg:p-[30px]"
      >
        <div ref={aboutTextRef} className="text-center">
          <h1 className="text-[60px] md:text-[80px] lg:text-[100px] leading-none uppercase font-bold">
            {t('about')}
          </h1>
        </div>
        <div ref={titleBoxRef} className="text-center">
          {title.map((item, index) => (
            <div
              key={index}
              className="text-[60px] md:text-[80px] lg:text-[100px] leading-none uppercase font-bold"
            >
              {t(item)}
            </div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="w-full p-[10px] lg:p-[30px]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 mt-[200px]">
          <div className="w-full h-full rounded-3xl overflow-hidden">
            <Image
              src="/images/photo3.jpg"
              alt="PT. Indonesian Tobacco Special Filter Rod - Factory and Production Facility"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-full break-words text-[36px]">
            <p>{t(description)}</p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="w-full p-[10px] lg:p-[30px]">
        <h2 className="sr-only">Our Location - Batam, Indonesia</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5641.404040707617!2d104.0722289244047!3d1.1059626384130419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d989faf7b71095%3A0x967ecb3f1fcbfc23!2sTunas%20Batam%20Center%20Industrial%20Estate!5e0!3m2!1sen!2sus!4v1725687864048!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="PT. Indonesian Tobacco Special Filter Rod Location Map"
        />
      </section>
    </div>
  );
}
