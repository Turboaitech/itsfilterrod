'use client';

import { useState } from 'react';
import { useRawT } from '@/lib/i18n/use-raw-t';
import { ChevronRight } from 'lucide-react';

const faqItems = [
  {
    label: 'What are the main functions and features of your special filter sticks?',
    content:
      'Our filter sticks can include different flavored capsules based on customer requirements to enhance aroma, reduce throat irritation, and improve the smoking-replacement experience. The structure is a round cotton rod that improves the overall taste.',
  },
  {
    label: 'For which types of tobacco products or usage scenarios are these capsule filter tips suitable?',
    content:
      'Our capsule essence extraction technology is suitable for all types of tobacco products and compatible with various cigarette and flavor-enhancement scenarios.',
  },
  {
    label: 'What sizes or specifications do your products have? Can the length or capsule flavor be customized?',
    content:
      'Filter length ranges from 80–150 mm, diameter 5.0–8.0 mm. We can customize length, diameter, and capsule flavors based on customer needs.',
  },
  {
    label: 'What is the minimum order quantity (MOQ)? What is the general delivery time?',
    content: 'MOQ: 20-foot container: shipped in 3 days; 40-foot container: shipped in 8 days.',
  },
  {
    label: 'How many capsule flavors do you offer?',
    content:
      'We offer various flavors such as strawberry and banana, and can expand based on customer needs.',
  },
  {
    label: 'Can capsule flavors or aromas be customized?',
    content:
      'Yes, capsule flavors and aromas can be fully customized, including mint and fruit types.',
  },
  {
    label: 'What quality standards or certifications does your production follow?',
    content: 'International standards.',
  },
  {
    label: 'Do you provide sample testing or prototyping services?',
    content:
      'If a contract is signed and payment completed, we offer free samples. If not, customers must pay for samples and shipping.',
  },
];

export function FaqContent() {
  const t = useRawT();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="page page-faq">
      <section className="flex flex-col justify-between items-center p-[10px] lg:p-[30px]">
        <div className="text-center">
          <h1 className="text-[60px] md:text-[80px] lg:text-[100px] leading-none uppercase font-bold">
            {t('FAQ')}
          </h1>
        </div>
      </section>

      <section className="w-full p-[10px] lg:p-[30px]">
        <div className="w-full flex flex-col" itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border-b border-gray-700"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-3 group hover:bg-white transition-all text-left"
              >
                <span 
                  className="truncate text-xl font-bold text-[var(--text-color)] group-hover:text-black transition-all"
                  itemProp="name"
                >
                  {index + 1}. {t(item.label)}
                </span>
                <ChevronRight
                  className={`w-5 h-5 shrink-0 ml-auto text-[var(--text-color)] group-hover:text-black transition-transform duration-200 ${
                    openIndex === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <div 
                className={`${openIndex === index ? 'block' : 'hidden'} p-3`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-[var(--text-color)] text-lg" itemProp="text">
                  {t(item.content)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
