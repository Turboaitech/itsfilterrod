'use client';

import { useRef, useEffect, useState } from 'react';
import { useRawT } from '@/lib/i18n/use-raw-t';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextSlideUp } from '@/components/animations/text-slide-up';
import { TextFlyIn } from '@/components/animations/text-fly-in';
import { ContactForm } from '@/components/contact-form';

gsap.registerPlugin(ScrollTrigger);

const title = ['PT. Indonesian', 'Tobacco', 'Special', 'Filter', 'Rod'];

const summary = [
  'We believe imagination beats limitations.',
  'No borders, no hierarchies—just people',
  'creating amazing things together.',
  "At ITSFR, we're reshaping the future of manufacturing.",
  "Join us, and let's build something incredible.",
];

const advantageList = [
  {
    title: 'Distributed Office Model',
    text: "We're breaking down borders with our decentralized management. By hiring globally, we stay agile and expand our market reach. Our democratic workplace offers you the flexibility to balance work and life on your terms. \u{1F30D}\u{1F552}",
  },
  {
    title: 'Collaborative Decision-Making',
    text: "Every voice matters here. Our inclusive approach means you have a say in company decisions. This cultivates innovation, creativity, and transparency, empowering us to pivot quickly and seize new frontiers in the tobacco industry. \u{1F680}",
  },
  {
    title: 'Increased Efficiency',
    text: "Advanced technology + flexible work model = enhanced productivity. We're reducing operational costs and boosting efficiency, all while lowering overhead. It's a smarter way to work. \u{1F4A1}",
  },
  {
    title: 'Open Communication',
    text: "Transparency isn't just a buzzword\u2014it's our culture. Open lines of communication foster collaboration and keep everyone aligned on our goals. With timely interactions, we ensure that you're always in the loop. \u{1F91D}",
  },
  {
    title: "It's Not Just a Job\u2014It's a Community",
    text: "You're joining more than a company; you're becoming part of a community. We support each other, celebrate successes together, and make work feel less like work. \u{1F38A}",
  },
  {
    title: 'Commitment to Continuous Improvement',
    text: "We're all about growth. Through ongoing learning and development, we stay ahead of industry trends. More than a manufacturing factory, we're a culturally rich tech company ready to innovate and adapt in a rapidly evolving market. \u{1F525}",
  },
  {
    title: 'Vision for the Future',
    text: "Looking ahead, we're excited to expand our influence and embrace new technologies that will shape the future of manufacturing. Our goal is a sustainable, adaptable business model that values both employee well-being and operational success. Let's build the future together! \u{1F31F}",
  },
  {
    title: '',
    text: 'Join us , where your ideas shape our journey, and together, we redefine what\'s possible.',
  },
];

export default function JoinUsPage() {
  const t = useRawT();
  const advantageRefs = useRef<(HTMLElement | null)[]>([]);
  const advantageTitleRefs = useRef<(HTMLElement | null)[]>([]);
  const advantageTextRefs = useRef<(HTMLElement | null)[]>([]);
  const [lineLength, setLineLength] = useState(100);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < window.innerHeight) {
      setLineLength(40);
    }
  }, []);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    advantageRefs.current.forEach((box, index) => {
      if (!box) return;
      const titleEl = advantageTitleRefs.current[index];
      const textEl = advantageTextRefs.current[index];

      const isEven = index % 2 === 0;
      const bgColor = isEven ? '#ffffff' : '#000000';
      const txtColor = isEven ? '#000000' : '#ffffff';

      const trigger = ScrollTrigger.create({
        trigger: box,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.to(':root', {
            '--background-color': bgColor,
            '--text-color': txtColor,
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(':root', {
            '--background-color': bgColor,
            '--text-color': txtColor,
            duration: 0.5,
          });
        },
      });

      triggers.push(trigger);

      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: box, start: 'top 80%' },
          }
        );
      }

      if (textEl) {
        gsap.fromTo(
          textEl,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: { trigger: box, start: 'top 80%' },
          }
        );
      }
    });

    return () => {
      triggers.forEach((tr) => tr.kill());
      gsap.killTweensOf(':root');
      document.documentElement.style.setProperty('--background-color', '#000');
      document.documentElement.style.setProperty('--text-color', '#fff');
    };
  }, []);

  const getInTouch =
    "If you're interested in learning more about our products or want to discuss a potential partnership, feel free to contact us. Our team is here to assist you every step of the way.";

  return (
    <div className="page page-home">
      <section className="panel w-full h-screen flex flex-col justify-between p-[10px] lg:p-[30px] mb-[10rem]">
        <h1 className="w-full lg:w-1/2">
          {title.map((item, index) => (
            <TextSlideUp
              key={index}
              classes="text-[45px] md:text-[80px] lg:text-[90px] leading-none uppercase font-bold break-all"
            >
              {t(item)}
            </TextSlideUp>
          ))}
        </h1>
        <div className="flex md:justify-end">
          <div className="mb-[54px] px-[10px] lg:px-0">
            {summary.map((item, index) => (
              <TextSlideUp
                key={index}
                classes="text-[25px] md:text-[30px] lg:text-[40px] leading-none"
              >
                {t(item)}
              </TextSlideUp>
            ))}
          </div>
        </div>
      </section>

      {advantageList.map((item, index) => (
        <section
          key={index}
          ref={(el) => {
            advantageRefs.current[index] = el;
          }}
          className="advantage-box flex flex-col p-[10px] lg:p-[30px]"
        >
          {item.title && (
            <h2
              ref={(el) => {
                advantageTitleRefs.current[index] = el;
              }}
              className="advantage-title text-[2.1875rem] md:text-[60px] lg:text-[6.375rem] leading-none uppercase font-bold break-words max-w-[70%]"
            >
              {t(item.title)}
            </h2>
          )}
          <div
            ref={(el) => {
              advantageTextRefs.current[index] = el;
            }}
            className="text-[1.625rem] md:text-[40px] lg:text-[3.25rem] leading-none font-bold max-w-[80%] mt-[5rem]"
          >
            {t(item.text)}
          </div>
        </section>
      ))}

      <section className="flex flex-col p-[10px] lg:p-[30px]">
        <h2 className="text-center w-full my-20">
          <TextSlideUp classes="text-[32px] md:text-[42px] lg:text-[52px] leading-none uppercase font-bold">
            {t('Get In Touch')}
          </TextSlideUp>
        </h2>
        <div className="w-full flex justify-center relative">
          <TextFlyIn text={t(getInTouch)} lineLength={lineLength} />
        </div>
      </section>

      <section className="flex flex-col p-[10px] lg:p-[30px]">
        <ContactForm />
      </section>
    </div>
  );
}
