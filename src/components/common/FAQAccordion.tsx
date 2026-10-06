'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-neutral-800 rounded-xl bg-neutral-900 overflow-hidden transition-all shadow-md hover:border-neutral-700"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-white focus:outline-none transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-white shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-2 text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-neutral-800 bg-black">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
